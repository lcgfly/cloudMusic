<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item, index) in list" :key="index">
                <keep-alive>
                    <component :is="name" :tag="item" :initialIndex="index" :nowIndex="nowIndex"></component>
                </keep-alive>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import api from "@/api";
import Bus from "@/util/Bus";
import block from "./block";
export default {
    data() {
        return {
            name: "block",
            nowIndex:0,
            swiperOption:{
                on: {
                    slideChange: () => {
                        this.slideChange()
                    }
                }
            }
        };
    },
    props:{
        list:Array
    },
    components: {
        block
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted(){
        Bus.$on('tab',this.tabChange)
    },
    methods:{
        tabChange(index){
            this.nowIndex = index
            this.swiper.slideTo(index,500)
        },
        slideChange(){
            this.nowIndex = this.swiper.activeIndex
            Bus.$emit('slide',this.swiper.activeIndex)
        }
    }
};
</script>
