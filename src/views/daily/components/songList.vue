<template>
    <div class="song-list-bg">
        <div class="song-list-back">
            <van-icon name="arrow-left" size="0.4rem" color="#fff" @click="back" />
        </div>
        <div class="song-list" :class="{fixed:fixed}">
            <div ref="playall" class="song-list-playall">
                <van-icon name="play-circle-o" size="0.4rem" />
                <span @click="playAll">播放全部</span>
            </div>
            <van-list ref="list" :finished="true" finished-text="真的一首也没有了😜">
                <div
                    class="song-block"
                    v-for="(item,index) in songLists"
                    :key="index"
                    @click="play()"
                >
                    <img :src="item.album.picUrl" alt />
                    <div class="song-brief-info">
                        <p class="van-ellipsis">{{item.name}} {{item.alias?item.alias[0]:''}}</p>
                        <p class="van-ellipsis">{{item.artists[0].name}} - {{item.album.name}}</p>
                    </div>
                    <van-divider />
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            fixed: false,
            space: 0,
            listSpace: 0
        };
    },
    props: {
        songLists: {
            type: Array,
            required: true
        }
    },
    computed: {},
    mounted() {
        this.space = this.$refs.playall.getBoundingClientRect().top;
        window.addEventListener("scroll", this.fix);
    },
    destroyed() {
        window.removeEventListener("scroll", this.fix);
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        fix() {
            if (document.documentElement.scrollTop >= this.space) {
                this.fixed = true;
            } else {
                this.fixed = false;
            }
        },
        ...mapMutations([
            "AUDIOLIST_REPLACE",
            "SET_AUDIO_INDEX",
            "AUDIOLIST_CLEAR",
            "FULLSCREEN_TOGGLE"
        ]),
        playAll() {
            //点击播放全部按钮的策略是每点击一次，就更新播放队列一次
            this.AUDIOLIST_CLEAR();
            //this.SET_AUDIO_INDEX(-1);
            //替换当前播放队列
            this.AUDIOLIST_REPLACE(this.songLists);
            //开始播放队列第一首歌
            this.SET_AUDIO_INDEX(0);
            //切换到全屏
            this.FULLSCREEN_TOGGLE();
        }
    }
};
</script>

<style lang="less">
.song-list-bg {
    position: relative;
    background: url(../../../assets/images/gouge.jpg) no-repeat;
    background-size: contain;
    background-attachment: fixed;
    overflow: hidden;
    .song-list-back {
        width: 100%;
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        justify-content: flex-start;
        line-height: 1.5;
    }
    .song-list {
        position: relative;
        margin-top: 20vh;
        background-color: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .song-list-playall {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            padding-left: 10px;
            margin-bottom: 10px;
            line-height: 1.5;
            border: 1px solid #ebedf0;
            border-radius: 10px;
            box-shadow: 0 2px 2px #ccc;
            background-color: #fff;
            &:active {
                background-color: #ebedf0;
            }
        }
        .song-block {
            text-align: left;
            padding-left: 10px;
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
            display: inline-block;
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
    .song-list.fixed {
        padding-top: 32px;
        .song-list-playall {
            position: fixed;
            top: 0;
        }
    }
}
</style>