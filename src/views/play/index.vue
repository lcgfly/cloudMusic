<template>
    <div class="audioPage">
        <div class="bg">
            <navbar></navbar>
            <lyric-view :lyricArray="lyricArray" :lyricIndex="lyricIndex"></lyric-view>
            <controller></controller>
        </div>
        <audio ref="audio" :src="audioSrc" autoplay muted="muted"></audio>
    </div>
</template>

<script>
import api from "@/api";
import navbar from "./components/navbar";
import controller from "./components/controller";
import lyric from "./components/lyric";
export default {
    data() {
        return {
            audioSrc: "",
            lyricArray: [],
            lyricIndex: -1,
            id: ""
        };
    },
    components: {
        navbar,
        controller,
        lyricView: lyric
    },
    created() {
        this.id = this.$route.params.id;
    },
    mounted() {
        this.getLyric();
        this.getSongUrl(this.id);
    },
    methods: {
        getLyric() {
            var id = this.id;
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
                    this.audioTimeupdate();
                }
            });
        },
        audioTimeupdate() {
            this.$refs.audio.addEventListener(
                "timeupdate",
                this.timeupdateHandler
            );
        },
        timeupdateHandler() {
            var audio = this.$refs.audio;
            var currentSecond = audio.currentTime;
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
        }
    }
};
</script>

<style lang="less">
div.bg {
    width: 100vw;
    height: 100vh;
}
</style>