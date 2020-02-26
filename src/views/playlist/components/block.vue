<template>
<div>
  <van-loading size="24px" color="#42b983" vertical v-show="show">加载中...</van-loading>
  <div class="pt-wrapper">
      <div class="pt-item" v-for="(item,index) in list" :key="index">
          <div class="pt-cover">
              <img :src="item.coverImgUrl" alt="">
              <span>{{item.playCount|transfer}}</span>
          </div>
          <p class="pt-description">{{item.description}}</p>
      </div>
  </div>
</div>
</template>

<script>
import api from "@/api";
export default {
    data(){
        return{
            loaded:false,
            show:true,
            list:[]
        }
    },
    props:{
        tag:String,
        nowIndex:Number,
        initialIndex:Number
    },
    watch:{
        nowIndex:{
            handler:function(val,oldVal){
                if(this.nowIndex==this.initialIndex&&!this.loaded){
                    if(this.tag=='精品'){
                        this.reqDataEx()
                        return
                    }
                    this.reqData()
            }
            },
            immediate:true
        }
    },
    mounted(){},
    methods:{
        reqData(){
            api.getPlaylistTop(this.tag).then((res)=>{
                var res = res.data
                if(res.code == 200){
                    this.list = res.playlists
                    this.show = false
                    this.loaded = true
                }
            })
        },
        reqDataEx(){
            api.playlist_highquality().then((res)=>{
                var res = res.data
                if(res.code == 200){
                    this.list = res.playlists
                    this.show = false
                    this.loaded = true
                }
            })
        }
    },
    filters:{
        transfer(val){
            if(val<10000) return
            return Math.floor(val/10000)+'万'
        }
    }
}
</script>

<style lang="less">
.pt-wrapper{
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .pt-item{
        flex: 1 1 25%;
        margin: 10px 5px 0;
        .pt-cover{
            position: relative;
            img{
                width: 100%;
                max-width: 108px;
                border-radius: 10px;
            }
            span{
                position: absolute;
                top: 5px;
                right: 5px;
                color: #fff;
            }
        }
        .pt-description{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-top: 5px;
            font-size: 14px;
            max-width: 108px;
        }
    }
}
</style>