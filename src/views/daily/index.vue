<template>
    <div>
        <song-list v-if="isLogin" @playAll="playAll">
            <song-item
                v-for="(item,index) in list"
                :key="index"
                :imgUrl="item.album.picUrl"
                :name="item.name"
                :alias="item.alias[0]"
                :artist="item.artists[0].name"
                :albumName="item.album.name"
                @playAll="playAll(index)"
                @dotMenu="dotMenu(index)"
            ></song-item>
        </song-list>
        <dot-menu
            :imgUrl="list.length>0?list[idx].album.picUrl:''"
            :name="list.length>0?list[idx].name:''"
            :alias="list.length>0?list[idx].alias[0]:''"
            :artist="list.length>0?list[idx].artists[0].name:''"
            @insert="insert"
        ></dot-menu>
        <require-login v-if="!isLogin">
            <template>
                <p>即刻登录，立享你的专属推荐</p>
            </template>
        </require-login>
    </div>
</template>

<script>
import api from "@/api";
import { mapActions } from "vuex";
import songList from "@/components/songList";
import songItem from "@/components/songItem";
import dotMenu from "@/components/dotMenu";
export default {
    data() {
        return {
            list: [],
            idx: 0
        };
    },
    components: {
        songList,
        songItem,
        requireLogin: () => import("@/components/requireLogin"),
        dotMenu
    },
    computed: {
        isLogin() {
            return (
                this.$store.state.LOGIN_STATE ||
                localStorage.getItem("loginState")
            );
        }
    },
    created() {
        if (this.isLogin) {
            this.getDailySongs();
        }
    },
    methods: {
        getDailySongs() {
            api.DailyRecommendSongs().then(res => {
                var res = res.data;
                if (res.code == 200) {
                    this.list = res.recommend;
                }
            });
        },
        ...mapActions(["_playAll","_insert"]),
        playAll(index) {
            this._playAll({
                list: this.list,
                index: index
            });
        },
        dotMenu(index) {
            this.idx = index;
        },
        insert(){
            let source = this.list[this.idx]
            this._insert(source)
        }
    }
};
</script>

<style>
</style>