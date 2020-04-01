<template>
    <div class="my-wrapper">
        <user-info :login="this.LOGIN_STATE==1" :avatarUrl="avatarUrl" :nickname="nickname"></user-info>
        <block :id="favId"></block>
        <div class="title">
            <span @click="currentView = 'createdPlaylist'">创建歌单</span>
            <span @click="currentView = 'subPlaylist'">收藏歌单</span>
        </div>
        <component
            :is="currentView"
            :createdPlayls="createdPlayls"
            :subPlayls="subPlayls"
            v-if="LOGIN_STATE"
        ></component>
    </div>
</template>
<script>
import api from "@/api";
import { mapState, mapGetters, mapMutations } from "vuex";
import userInfo from "./components/userInfo";
import block from "./components/block";
import createdPlaylist from "./components/createdPlaylist";
import subPlaylist from "./components/subPlaylist";
export default {
    data() {
        return {
            avatarUrl: localStorage.getItem("avatarUrl"),
            nickname: localStorage.getItem("nickname"),
            loaded: false,
            favId: 0, //用户喜爱歌曲的id
            createdPlayls: [], //用户创建的歌单
            subPlayls: [], //用户订阅的歌单
            currentView: "createdPlaylist"
        };
    },
    components: {
        userInfo,
        block,
        createdPlaylist,
        subPlaylist
    },
    computed: {
        ...mapState(["LOGIN_STATE"])
    },
    watch: {
        LOGIN_STATE: function(val, oldVal) {
            if (val == 1 && !this.loaded) {
                let uid = localStorage.getItem("mscUid");
                this.getUserPlaylist(uid);
            }
        }
    },
    created() {
        if (this.LOGIN_STATE == 1) {
            let uid = localStorage.getItem("mscUid");
            this.getUserPlaylist(uid);
        }
    },
    mounted() {},
    methods: {
        getUserPlaylist(uid) {
            api.getUserPlaylist(uid).then(res => {
                this.loaded = true;
                res = res.data;
                if (res.code == 200) {
                    let list = res.playlist;
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].specialType == 5) {
                            this.favId = list[i].id;
                            continue;
                        }
                        if (!list[i].subscribed) {
                            this.createdPlayls.push(list[i]);
                        } else {
                            this.subPlayls = list.slice(i);
                            break;
                        }
                    }
                }
            });
        }
    }
};
</script>
<style lang="less">
.my-wrapper {
    padding: 0 10px;
    .title {
        text-align: left;
        span {
            margin-right: 5px;
        }
    }
}
</style>