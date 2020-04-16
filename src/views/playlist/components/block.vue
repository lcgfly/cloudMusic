<template>
<div>
  <van-loading size="36px" color="#42b983" vertical v-show="show">加载中...</van-loading>
  <div class="pt-wrapper">
      <div class="pt-item" v-for="(item,index) in list" :key="index" @click="toDetailPage(item.id)">
          <div class="pt-cover">
              <img :src="item.coverImgUrl" alt="">
              <span>{{item.playCount|Playcount}}</span>
          </div>
          <p class="pt-description">{{item.name}}</p>
      </div>
  </div>
  <van-loading size="36px" color="#42b983" vertical v-show="!show">玩命加载中...</van-loading>
</div>
</template>

<script>
import api from "@/api";
export default {
    data(){
        return{
            loaded:false,
            show:true,
            list:[],
            limit:30
        }
    },
    props:{
        tag:String,
        nowIndex:Number,
        initialIndex:Number,
        isBottom:Boolean
    },
    watch:{
        nowIndex:{
            handler:function(val,oldVal){
                 document.documentElement.scrollTop = 0
                if(this.nowIndex==this.initialIndex&&!this.loaded){
                    if(this.tag=='精品'){
                        this.reqDataEx()
                        return
                    }
                    this.reqData()
            }
            },
            immediate:true
        },
        isBottom:function(val,oldVal){
            if(val && this.nowIndex==this.initialIndex && this.tag == '精品'){
                this.reqDataEx_offset()
                this.$emit('loadover')
                return
            }
            if(val && this.nowIndex==this.initialIndex){
                console.log(this.tag+'加载中')
                this.limit+=12
                this.reqData()
                this.$emit('loadover')
            }
        }
    },
    deactivated(){
    },
    methods:{
        reqData(){
            api.getPlaylistTop(this.tag,this.limit).then((res)=>{
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
        },
        reqDataEx_offset(){
            let updateTime = this.list[this.list.length-1].updateTime
            let limit = 9
             api.playlist_highquality(updateTime,limit).then(res=>{
                 res = res.data
                 if(res.code == 200){
                    this.list = this.list.concat(res.playlists)
                    this.show = false
                    this.loaded = true
                }
             })
        },
        toDetailPage(id){
            this.$router.push({name:'detailPage',params:{id:id}})
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
        flex: 0 1 25%;
        margin: 10px 5px 0;
        .pt-cover{
            position: relative;
            img{
                width: 108px;
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