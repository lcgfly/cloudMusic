<template>
    <div>
        
            <div v-if="imgUrl" class="song-block" @click="playAll">
                <img :src="imgUrl" alt />
                <div class="song-brief-info">
                    <p class="van-ellipsis">{{name}} {{alias}}</p>
                    <p class="van-ellipsis">{{artist}} - {{albumName}}</p>
                </div>
            </div>
        
    </div>
</template>

<script>
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
        }
    },
    methods:{
        playAll(){
            this.$emit('playAll')
        }
    }
};
</script>

<style lang="less">
.song-block {
    display: flex;
    padding-left: 10px;
    margin-bottom: 20px;
    &:active {
        background-color: #ebedf0;
    }
}
.song-block > img {
    width: 35px;
    height: 35px;
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
</style>