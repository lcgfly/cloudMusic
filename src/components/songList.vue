<template>
    <div class="song-list-wrap">
        <div class="song-list-back">
            <van-icon name="arrow-left" size="0.4rem" color="#fff" @click="back" />
        </div>
        <div class="song-list-bg" :style="{height:height,backgroundImage:`url(${bgUrl})`}"></div>
        <div class="song-list" :class="{fixed:fixed}">
            <div ref="playall" class="song-list-playall">
                <van-icon name="play-circle-o" size="0.4rem" />
                <span @click="playAll">播放全部</span>
            </div>
            <!-- 显示每一行歌曲信息 -->
            <slot></slot>
            <!-- <van-list ref="list" :finished="true" finished-text="真的一首也没有了😜">
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
            </van-list>-->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fixed: false,
            space: 0
        };
    },
    props: {
        //区分歌单详情页是否有相框，比如歌单和每日推荐等
        hasAlbum: {
            type: Boolean,
            default: false
        },
        bgUrl: {
            type: String,
            default: require("../assets/images/gouge.jpg")
        },
        height: {
            type: String,
            default: "210px"
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
        playAll() {
            this.$emit('playAll')
        }
    }
};
</script>

<style lang="less">
.song-list-wrap {
    position: relative;
    overflow: hidden;
    .song-list-bg {
        width: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-attachment: fixed;
    }
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
        margin-top: -20px;
        background-color: #fff;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        .song-list-playall {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            padding-left: 10px;
            margin-bottom: 10px;
            line-height: 1.5;
            //border: 1px solid #ebedf0;
            border-radius: 20px;
            //box-shadow: 0 2px 2px #ccc;
            background-color: #fff;
            &:active {
                background-color: #ebedf0;
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