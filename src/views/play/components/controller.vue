<template>
    <div class="controller">
        <span class="now">{{now|nowTimeFn}}</span>
        <span class="total">{{duration|durationFn}}</span>
        <van-slider
            class="slider"
            v-model="value"
            button-size="12px"
            @drag-start="dragStart"
            @drag-end="dragEnd"
            @input="input"
            @change="change"
        />
        <div class="panel">
            <i
                class="iconfont"
                :class="{'icon-icon-5': mode==0,'icon-icon-4': mode==1,'icon-icon-6': mode==2}"
                @click="switchMode"
            ></i>
            <i class="iconfont icon-icon-2" @click.stop="prev"></i>
            <i
                class="iconfont"
                :class="{'icon-icon-3':playing,'icon-icon-7':!playing}"
                @click="toggle"
            ></i>
            <i class="iconfont icon-icon-1" @click.stop="next"></i>
            <i class="iconfont icon-icon-8" @click.stop="menuList"></i>
        </div>
    </div>
</template>

<script>
import Bus from "@/util/Bus.js";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
    data() {
        return {
            now: 0,
            value: 0,
            drag: false
        };
    },
    props: {
        nowTime: Number, //当前进度，秒
        duration: Number //总时间，毫秒
    },
    computed: {
        ...mapState(["playing", "audioList", "mode"]),
        ...mapGetters(["AUDIO_CURRENT_INDEX"])
    },
    watch: {
        nowTime(val) {
            if (this.drag) return;
            this.now = val;
            val = Math.floor(val);
            this.value = Number(
                ((val / (this.duration / 1000)) * 100).toFixed(1)
            );
        }
    },
    methods: {
        dragStart() {
            this.drag = true;
        },
        dragEnd() {
            this.drag = false;
        },
        input(value) {
            this.now = Math.floor((value / 100) * (this.duration / 1000));
        },
        change(value) {
            this.$emit("dragChange", value);
        },
        ...mapMutations(["PLAYING_TOGGLE", "SET_AUDIO_INDEX", "MODE_TOGGLE"]),
        toggle() {
            //控制播放/暂停
            this.PLAYING_TOGGLE();
            this.$emit("toggle");
        },
        prev() {
            //上一首歌
            if (!this.playing) this.PLAYING_TOGGLE();
            var length = this.audioList.length;
            var index = this.AUDIO_CURRENT_INDEX;
            if (index - 1 < 0) {
                this.SET_AUDIO_INDEX(length - 1);
                return;
            }
            this.SET_AUDIO_INDEX(--index);
        },
        next() {
            //下一首歌
            if (!this.playing) this.PLAYING_TOGGLE();
            var length = this.audioList.length;
            var index = this.AUDIO_CURRENT_INDEX;
            if (index + 1 >= length) {
                this.SET_AUDIO_INDEX(0);
                return;
            }
            this.SET_AUDIO_INDEX(++index);
        },
        switchMode() {
            var message = "";
            switch (this.mode) {
                case 0:
                    this.MODE_TOGGLE(1);
                    message = "单曲循环";
                    break;
                case 1:
                    this.MODE_TOGGLE(2);
                    message = "随机播放";
                    break;
                case 2:
                    this.MODE_TOGGLE(0);
                    message = "列表循环";
                    break;
            }
            this.$toast({
                message: message,
                position: "bottom"
            });
        },
        menuList(){
            Bus.$emit('menuListShow')
        }
    },
    filters: {
        nowTimeFn(value) {
            if (value == 0) return "00:00";
            value = Math.floor(value);
            var min = parseInt(value / 60);
            var sec = parseInt(value % 60);
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            return `${min}:${sec}`;
        },
        durationFn(value) {
            if (value == 0) return "00:00";
            var min = parseInt(value / 1000 / 60);
            var sec = parseInt((value / 1000) % 60);
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            return `${min}:${sec}`;
        }
    }
};
</script>

<style lang="less">
@import url("//at.alicdn.com/t/font_1641081_msftgvihz6t.css");

.controller {
    width: 100%;
    height: 15vh;
    position: relative;
    //padding-top: 20px;
    .now,
    .total {
        position: absolute;
        top: 0;
        transform: translateY(-50%);
        font-size: 12px;
    }
    .now {
        left: 10px;
    }
    .total {
        right: 10px;
    }
    .slider {
        width: 76%;
        margin: 0 auto;
    }
    .panel {
        width: 100%;
        height: 100%;
        color: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        i {
            font-size: 46px;
        }
    }
}
</style>