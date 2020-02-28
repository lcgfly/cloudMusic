<template>
    <div class="song-list-wrap">
        <div class="song-list-back">
            <van-icon name="arrow-left" size="0.4rem" color="#fff" @click="back" />
        </div>
        <div
            class="song-list-bg"
            :style="{height:height,backgroundImage:`url(${bgUrl})`}"
            :class="{'vague':hasAlbum}"
        ></div>
        <!-- 只在歌单详情页显示 -->
        <div class="album-wrapper" v-if="hasAlbum">
            <div class="left">
                <div class="album-cover">
                    <img :src="bgUrl" alt />
                    <span>{{playCount|Playcount}}</span>
                </div>
            </div>
            <div class="right">
                <div class="album-title">{{albumTitle}}</div>
                <div class="album-creator">
                    <img :src="creatorAvatar" alt />
                    <span>{{creatorName}}</span>
                </div>
                <p class="album-desc">{{description}}</p>
            </div>
        </div>
        <!-- 播放列表 -->
        <div class="song-list" :class="{fixed:fixed}">
            <div ref="playall" class="song-list-playall">
                <van-icon name="play-circle-o" size="0.4rem" />
                <span @click="playAll">播放全部</span>
            </div>
            <!-- 用来显示每一行歌曲信息 -->
            <slot></slot>
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
        },
        playCount: {
            type: Number
        },
        description: {
            type: String
        },
        albumTitle: {
            type: String
        },
        creatorAvatar: {
            type: String
        },
        creatorName: {
            type: String
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
            this.$emit("playAll");
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
        position: relative;
        z-index: -1;
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
.album-wrapper {
    display: flex;
    position: absolute;
    top: 120px;
    transform: translateY(-50%);
    padding: 0 15px;
    .left {
        min-width: 108px;
        .album-cover {
            position: relative;
            img {
                width: 100%;
                max-width: 108px;
                border-radius: 10px;
            }
            span {
                position: absolute;
                top: 5px;
                right: 5px;
                color: #fff;
            }
        }
    }
    .right {
        margin-left: 15px;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        .album-title {
            font-size: 18px;
            color: #fff;
        }
        .album-creator {
            color: hsla(0, 0%, 100%, 0.6);
            img {
                width: 35px;
                height: 35px;
                border-radius: 50%;
            }
        }
        .album-desc {
            color: hsla(0, 0%, 100%, 0.6);
            font-size: 12px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
}
.vague {
    filter: blur(40px);
    transform: scale(1.75);
}
</style>