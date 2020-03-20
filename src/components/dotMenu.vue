<template>
  <div>
      <van-popup v-model="show" position="bottom" round :style="{height:'50%'}">
      <div  class="song-block dot-menu">
                <img :src="imgUrl" alt />
                <div class="song-brief-info">
                    <p>歌曲: {{name}} {{alias}}</p>
                    <p>{{artist}}</p>
                </div>
            </div>
           <div class="dot-line" @click="insert">
            <van-icon name="certificate" /> 
            <div class="insert">下一首播放</div>
            </div> 
      </van-popup>
  </div>
</template>

<script>
import Bus from "@/util/Bus.js";
export default {
    data(){
        return{
            show:false,
            key:0
        }
    },
    props:{
        imgUrl:String,
        name:String,
        alias:String,
        artist:String
    },
    mounted(){
        //解决$off该事件后第一次监听不到的问题
        Bus.$on('dotMenu_call',this.toShow)
    },
    activated(){
        Bus.$on('dotMenu_call',this.toShow)
    },
    methods:{
        toShow(){
        this.show = true
    },
    insert(){
        this.$emit('insert')
        this.show = false
    }
    }
    
}
</script>

<style lang="less">

</style>