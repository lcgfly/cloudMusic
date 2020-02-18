<template>
    <div class="audio-page">
        <div class="bg" v-show="fullScreen" :style="{backgroundImage:`url(${picUrl})`}"></div>
        <div class="full" v-show="fullScreen">
            <navbar :name="name" :artists="artists"></navbar>
            <lyric-view :lyricArray="lyricArray" :lyricIndex="lyricIndex"></lyric-view>
            <controller :nowTime="nowTime" :duration="duration" @dragChange="dragChange" @toggle="toggle"></controller>
        </div>
        <mini v-show="!fullScreen" :name="name" :artists="artists" :picUrl="picUrl" @toggle="toggle"></mini>
        <audio ref="audio" :src="audioSrc" autoplay muted @ended="ended"></audio>
    </div>
</template>

<script>
import api from "@/api";
import { mapState, mapGetters, mapMutations } from "vuex";
import navbar from "./components/navbar";
import controller from "./components/controller";
import lyric from "./components/lyric";
import mini from "./components/mini";
export default {
    data() {
        return {
            audioSrc: "",
            lyricArray: [], //[{second:xxx,lyric:xxx}...]
            lyricIndex: -1, //歌词索引
            artists: [],
            name: "",
            picUrl: "",
            duration:0, 
            nowTime:0
        };
    },
    components: {
        navbar,
        controller,
        lyricView: lyric,
        mini
    },
    created() {},
    mounted() {},
    computed: {
        ...mapState(["fullScreen",'playing']),
        ...mapGetters({
            AUDIO_PLAY_ING: "AUDIO_PLAY_ING",
            currentIndex: "AUDIO_CURRENT_INDEX",
            AUDIO_LIST_LENGTH:"AUDIO_LIST_LENGTH"
        })
    },
    watch: {
        AUDIO_PLAY_ING: {
            deep: true,
            handler: function(val, oldVal) {
                this.lyricIndex = -1;
                this.lyricArray = [];
                this.audioSrc = "";
                if (JSON.stringify(val) == "{}") return;
                if (val.id) {
                    //获取当前歌曲的歌词
                    this.getLyric(val.id);
                    //获取当前歌曲的播放Url
                    this.getSongUrl(val.id);
                    this.artists = val.artists
                        ? val.artists
                        : val.ar
                        ? val.ar
                        : [];
                    this.name = val.name;
                    this.picUrl = val.album
                        ? val.album.picUrl
                        : val.al
                        ? val.al.picUrl
                        : "";
                    this.duration = val.duration?val.duration:val.dt?val.dt:0 
                }
            }
        }
    },
    methods: {
        ...mapMutations([
            "SET_AUDIO_INDEX"
            ]),
        getLyric(id) {
            api.getLyric(id).then(res => {
                var lyric = res.data.lrc.lyric; //[mm:ss.ms]xxxx 格式的字符串
                this.lyricToObj(lyric);
            });
        },
        lyricToObj(val) {
            const array = val.split("\n");

            for (var i in array) {
                if (array[i] == "") return false;
                //截选出每一行的歌词
                const lyric = array[i].substr(array[i].indexOf("]") + 1);
                const time = array[i].substring(
                    array[i].indexOf("[") + 1,
                    array[i].indexOf("]")
                );
                //拆分时间，全部换算成秒
                var second = this.timeHandler(time);
                this.lyricArray.push({
                    second: second,
                    lyric: lyric
                });
            }
        },
        timeHandler(val) {
            var time = val.split(":");
            var second = (
                parseFloat(time[0] * 60) + parseFloat(time[1])
            ).toFixed(3);
            return second;
        },
        //获取音乐url
        getSongUrl(id) {
            api.getSongUrl(id).then(res => {
                res = res.data;
                if (res.code == 200) {
                    this.audioSrc = res.data[0].url;
                    this.timeupdateListener();
                }
            });
        },
        timeupdateListener() {
            this.$refs.audio.addEventListener(
                "timeupdate",
                this.timeupdateHandler
            );
        },
        timeupdateHandler() {
            var audio = this.$refs.audio;
            var currentSecond = audio.currentTime ? audio.currentTime : 0;
            this.nowTime = currentSecond
            this.lyricIndex = this.getCurrentIndex(
                currentSecond,
                this.lyricArray
            );

        },
        getCurrentIndex(currentSecond, lyricArray) {
            for (let i = lyricArray.length - 1; i >= 0; i--) {
                var second = lyricArray[i].second;
                if (currentSecond > second) {
                    return i;
                }
            }
        },
        playNext() {
            //当前播放结束时，自动播放下一首歌曲
            var index = this.currentIndex;
            if(index==this.AUDIO_LIST_LENGTH-1){
                this.SET_AUDIO_INDEX(0)
                return
            }
            this.SET_AUDIO_INDEX(++index);
        },
        ended() {
            //播放结束时
            this.playNext();
        },
        dragChange(value){
            //拖动进度条时
            var now = Math.floor(value/100*(this.duration/1000))
            this.$refs.audio.currentTime = now
        },
        toggle(){
            //控制播放/暂停
            if(this.playing){
                this.$refs.audio.play()
            }
            else{
                this.$refs.audio.pause()
            }
        }
    }
};
</script>

<style lang="less">
.audio-page {
    position: fixed;
    top: 0;
    z-index: 999;
    color:hsla(0,0%,100%,.6); 
    .bg {
        width: 100vw;
        height: 100vh;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        filter: blur(40px);
        transform: scale(1.75);
        &::before {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
    .full {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>