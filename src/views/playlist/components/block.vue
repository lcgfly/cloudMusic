<template>
<div>
  <div>I'am{{tag}}</div>
  <van-loading size="24px" color="#42b983" vertical v-show="show">加载中...</van-loading>
  <p v-show="!show">我是数据</p>
</div>
</template>

<script>
export default {
    data(){
        return{
            loaded:false,
            show:true
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
                this.show=false
            }
            },
            immediate:true
        }
    },
    mounted(){
        if(this.loaded){
        this.load()
        }
    },
    load(){
        console.log('发送请求')
    }
}
</script>

<style>

</style>