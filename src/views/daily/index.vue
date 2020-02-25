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
            ></song-item>
        </song-list>
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
export default {
    data() {
        return {
            list: []
        };
    },
    components: {
        songList,
        songItem,
        requireLogin: () => import("@/components/requireLogin")
    },
    computed: {
        isLogin() {
            return (
                this.$store.state.LOGIN_STATE ||
                localStorage.getItem("loginState")
            );
        }
    },
    mounted() {
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
        ...mapActions(["_playAll"]),
        playAll(index) {
            if (index) {
                return this._playAll({
                    list: this.list,
                    index: index
                });
            }
            this._playAll({ list: this.list });
        }
    }
};
</script>

<style>
</style>