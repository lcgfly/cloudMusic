<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in list" :key="index">
                <img :src="item.pic" :alt="item.typeTitle" :data-song-id="item.song?item.song.id:0">
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
import api from "@/api";
export default {
    data() {
        return {
            list:[]
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            api.getBanner().then(res=>{
                console.log(res.data)
                this.list = res.data.banners;
            })
        }
    }
};
</script>
<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  img{
      width: 100%;
  }
}
</style>
