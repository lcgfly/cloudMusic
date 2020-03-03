<template>
  <div class="rec-block">
    <div class="title">推荐歌单</div>
    <div class="desc">
        <span>为你精挑细选</span>
        <router-link to="/playlist"><span>查看更多</span></router-link>
    </div>
    <swiper :options="swiperOption" ref="mySwiper" v-if="list.length">
            <swiper-slide v-for="(item, index) in list" :key="index">
                <album-unit :id="item.id" :imgUrl="item.picUrl" :playCount="item.playcount" :name="item.name"></album-unit>
            </swiper-slide>
        </swiper>
        <van-button type="default" round color="#f10215" v-if="!list.length" to="/login">您还没登录</van-button>
  </div>
</template>

<script>
import api from "@/api";
import albumUnit from "@/components/albumUnit"
export default {
    data(){
        return{
            swiperOption:{
                // spaceBetween:10,
                slidesPerView:3,
                freeMode:true
            }
        }
    },
    props:{
        list:Array
    },
    components:{
        albumUnit
    }
}
</script>

<style lang="less">
.rec-block{
    margin: 30px 10px;
    .title{
        text-align: left;
        color: #ccc;
    }
    .desc{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        span:first-child{
            font-size: 16px;
            font-weight: bolder;
        }
        span:last-child{
            font-size: 12px;
            border:1px solid #ccc;
            border-radius: 15px;
            padding: 5px;
        }
    }
}
</style>