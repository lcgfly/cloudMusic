<template>
    <div>
        
            <div  class="song-block ripple" @click="playAll">
                <img :src="imgUrl" alt  v-if="!num"/>
                <span v-if="num">{{num}}</span>
                <div class="song-brief-info">
                    <p class="van-ellipsis">{{name}} {{alias}}</p>
                    <p class="van-ellipsis">{{artist}} - {{albumName}}</p>
                </div>
                <van-icon name="weapp-nav" class="Dot-more" @touchstart.prevent="dotMenu_call"/>
            </div>
        
    </div>
</template>

<script>
import Bus from "@/util/Bus.js";
export default {
    data(){
        return{}
    },
    props:{
        imgUrl:{
            type:String,
        },
        name:{
            type:String
        },
        alias:{
            type:String,
            default:''
        },
        artist:{
            type:String
        },
        albumName:{
            type:String
        },
        num:{
            type:Number
        }
    },
    methods:{
        playAll(){
            this.$emit('playAll')
        },
        dotMenu_call(){
            //向父组件传index
            this.$emit('dotMenu')
            //控制dotMenu组件显示
            Bus.$emit('dotMenu_call')
        }
    }
};
</script>

<style lang="less">
.song-block {
    display: flex;
    padding-left: 10px;
    margin-bottom: 20px;
    &>img,&>span {
    width: 35px;
    height: 35px;
    line-height: 35px;
    border-radius: 5px;

}
.song-brief-info {
    text-align: left;
    vertical-align: middle;
    margin-left: 10px;
    p:first-child {
        width: 210px;
        line-height: 1.3;
        font-size: 13px;
    }
    p:last-child {
        width: 220px;
        margin-top: 5px;
        font-size: 6px;
    }
}
}
.song-block.dot-menu{
    align-items: center;
    padding: 10px 10px;
    border-bottom: 0.5px solid #ebedf0;
    margin-bottom: 0;
    &>img{
        width: 50px;
        height: auto;
    }
}
.dot-line{
    display: flex;
    font-size: 16px;
    padding: 10px;
    i{
        font-size: 30px;
    }
    &>div{
        width: 100%;
        line-height: 1.5;
        text-align: left;
        margin-left: 20px;
        border-bottom: 0.5px solid #ebedf0;
    }
}
.Dot-more{
    flex:1;
    color:hsla(0, 0%, 0%, 0.6);
}
</style>