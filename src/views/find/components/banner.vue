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
export default {
    data() {
        return {
        };
    },
    props:{
        list:Array
    }
};
</script>
<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  padding: 0 10px;
  img{
      width: 100%;
      border-radius: 8px;
  }
}
</style>
