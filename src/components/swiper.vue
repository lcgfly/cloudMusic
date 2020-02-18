<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item, index) in list" :key="index">
                <keep-alive>
                    <component :is="item.component"></component>
                </keep-alive>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
import Bus from "../util/Bus";

export default {
    data() {
        return {
            swiperOption: {
                initialSlide: this.$route.path=='/my'?0:this.$route.path=='/find'?1:this.$route.path=='/village'?
                2:this.$route.path=='/vlog'?3:1,
                speed: 500,
                on: {
                    slideChange: () => {
                        Bus.$emit(
                            "slideChange",
                            this.swiper.activeIndex
                        );
                    }
                }
            },
            list: [
                { component: "my"},
                { component: "find" },
                { component: "village" },
                { component: "vlog" }
            ]
        };
    },
    components: {   //组件懒加载
<<<<<<< Updated upstream
        my:()=>import ("../views/my"),
        find:()=>import ("../views/find"),
        village:()=>import ("../views/village"),
        vlog:()=>import ("../views/vlog")
=======
        my:()=>import ("../views/my/d"),
        find:()=>import ("../views/find/d"),
        village:()=>import ("../views/village/d"),
        vlog:()=>import ("../views/vlog/d")
>>>>>>> Stashed changes
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        Bus.$on("tabChange", this.tabChange);
    },
    methods: {
        tabChange(index) {
            this.swiper.slideTo(index, 500);
        }
    }
};
</script>
