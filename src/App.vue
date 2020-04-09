<template>
    <div id="app">
        <nav-header v-if="control"></nav-header>
        <keep-alive>
            <swiper v-if="control"></swiper>
        </keep-alive>
        <transition name="slider">
        <keep-alive :max="10">
            <router-view v-if="!control"></router-view>
        </keep-alive>
        </transition>
        <!-- 播放组件 -->
            <player v-show="!AUDIOLIST_EMPTY"></player>
    </div>
</template>
<script>
import navHeader from "./components/navHeader";
import swiper from "./components/swiper";
import player from "@/views/play";
import { mapState, mapGetters } from "vuex";
export default {
    data() {
        return {};
    },
    components: {
        navHeader,
        swiper,
        player
    },
    computed: {
        control() {
            return /(^\/my$)|(^\/find$)|(^\/village$)|(^\/vlog$)/.test(
                this.$route.path
            );
        },
        ...mapGetters(["AUDIOLIST_EMPTY"])
    }
};
</script>
<style lang="less">


#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
