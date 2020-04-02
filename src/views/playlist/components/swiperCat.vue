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
            console.log(11)
            if(!this.flag) return
            this.flag = false
            console.log('ing')
            let scrollHeight = document.getElementsByClassName('pt-wrapper')[this.nowIndex].scrollHeight
            let scrollTop = document.getElementsByClassName('swiper-slide-active')[0].scrollTop
            let clientHeight = document.documentElement.clientHeight
            if(Math.ceil(clientHeight + scrollTop)+300 >= scrollHeight){
                this.isBottom = true
            }
            setTimeout(() => {
                this.flag = true
            }, 500);
        }
    }
};
</script>
