<template>
    <div>
        <default-nav title="歌单广场"></default-nav>
        <van-tabs v-model="active" @click="tabChange">
            <van-tab :title="item" v-for="(item,index) in list" :key="index"></van-tab>
        </van-tabs>
        <swiper-cat :list="list"></swiper-cat>
    </div>
</template>

<script>
import api from "@/api";
import Bus from "@/util/Bus";
import defaultNav from "@/components/defaultNav";
import swiperCat from "./components/swiperCat";
export default {
    data() {
        return {
            list: ['精品'],
            active: 0
        };
    },
    components: {
        defaultNav,
        swiperCat
    },
    created() {
        this.getPlaylistHot();
    },
    mounted() {
      Bus.$on('slide',this.slideChange)
    },
    methods: {
        getPlaylistHot() {
            api.getPlaylistHot().then(res => {
                var res = res.data;
                if (res.code == 200) {
                    for (var i in res.tags) {
                        this.list.push(res.tags[i].name);
                    }
                }
            });
        },
        tabChange() {
           Bus.$emit("tab", this.active);
        },
        slideChange(index){
          this.active = index
        }
    }
};
</script>

<style lang="less">
</style>