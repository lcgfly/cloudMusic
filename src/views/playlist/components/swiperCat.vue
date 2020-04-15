<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item, index) in list" :key="index">
                <keep-alive>
                    <component :is="name" :tag="item" :initialIndex="index" :nowIndex="nowIndex" :isBottom="isBottom" @loadover="isBottom=false"></component>
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
                // autoHeight:true,
                on: {
                    slideChange: () => {
                        this.slideChange()
                    }
                }
            },
            isBottom:false,
            flag:true
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
        window.addEventListener('scroll',this.onLoad)
    },
    methods:{
        tabChange(index){
            this.nowIndex = index
            this.swiper.slideTo(index,500)
        },
        slideChange(){
            this.nowIndex = this.swiper.activeIndex
            Bus.$emit('slide',this.swiper.activeIndex)
        },
        onLoad(){
            if(!this.flag) return
            this.flag = false
            setTimeout(() => {
            let scrollHeight = document.documentElement.scrollHeight
            let scrollTop = document.documentElement.scrollTop
            let clientHeight = document.documentElement.clientHeight
            if(Math.ceil(clientHeight + scrollTop) >= scrollHeight){
                this.isBottom = true
            }
                this.flag = true
            }, 500);
        }
    }
};
</script>
