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
import one from "./one";
import two from "./two";
import three from "./three";
import four from "./four";
export default {
    data() {
        return {
            swiperOption: {
                initialSlide: this.$route.path=='/my'?0:this.$route.path=='/find'?1:this.$route.path=='/village'?
                2:this.$route.path=='/video'?3:0,
                speed: 500,
                on: {
                    slideChange: () => {
                        Bus.$emit(
                            "slideChange",
                            this.$refs.mySwiper.swiper.activeIndex
                        );
                    }
                }
            },
            list: [
                { component: one },
                { component: two },
                { component: three },
                { component: four }
            ]
        };
    },
    components: {
        one,
        two,
        three,
        four
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
