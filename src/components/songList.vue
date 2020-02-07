<template>
    <div class="song-list">
        <van-list :finished="true" finished-text='真的一首也没有了😜'>
            <div class="song-block" v-for="(item,index) in songLists" :key="index">
                <img :src="item.album.picUrl" alt="">
                <div class="song-brief-info">
                     <p class="van-ellipsis">{{item.name}} {{item.alias?item.alias[0]:''}}</p>
                     <p>{{item.artists[0].name}} - {{item.album.name}}</p>
                </div>
                <van-divider />
            </div>
        </van-list>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        songLists: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="less">
.song-list{
    position: relative;
    .song-block{
        text-align: left;
        padding-left: 10px;
    }
    .song-block>img{
        width: 35px;
        height: 35px;
        border-radius: 5px;
    }
    .song-brief-info{
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        p:first-child{
            width: 210px;
            line-height: 1.3;
            font-size: 13px;
        }
        p:last-child{
            margin-top: 5px;
            font-size: 6px;
        }
    }
}
</style>