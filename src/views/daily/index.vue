<template>
    <div>
        <song-list v-if="isLogin" :songLists="list"></song-list>
        <require-login v-if="!isLogin">
            <template>
                <p>即刻登录，立享你的专属推荐</p>
            </template>
        </require-login>
    </div>
</template>

<script>
import api from "@/api";
import songList from "@/views/daily/components/songList";

export default {
    data() {
        return {
            list: []
        };
    },
    components: {
        songList,
        requireLogin: () => import("@/components/requireLogin")
    },
    computed: {
        isLogin() {
            return localStorage.getItem("loginState");
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
        }
    }
};
</script>

<style>
</style>