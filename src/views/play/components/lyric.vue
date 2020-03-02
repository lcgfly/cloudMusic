<template>
    <div class="lyric-wrapper" ref="listwrap">
        <div class="record" :class="{'stop':!playing}" v-show="showAlbum">
          <img :src="picUrl" alt="" @click="change">
        </div>
        <ul
            class="lyric-scroll"
            ref="list"
            v-show="!showAlbum"
            :style="{transform:`translateY(${spaceY}rem)`}"
            @touchstart.passive="touchStart"
            @touchmove.passive="touchHandler"
            @touchend="touchEnd"
            @click="change"
        >
            <li
                v-for="(item,index) in lyricArray"
                :key="index"
                :class="{'active':index==lyricIndex}"
            >{{item.lyric}}</li>
        </ul>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    data() {
        return {
            spaceY: 0,
            isTouch: false,
            startY: 0,
            offset: 0,
            htmlFontSize: 0,
            showAlbum:true
        };
    },
    props: {
        lyricArray: Array,
        lyricIndex: Number,
        picUrl: String
    },
    computed:{
        ...mapState(["playing"])
    },
    watch: {
        lyricIndex: "listScroll"
    },
    mounted() {
        //拿到html的font-size
        this.htmlFontSize = Number(
            window
                .getComputedStyle(document.querySelector("html"))
                .fontSize.replace(/\D/g, "")
        );
    },
    methods: {
        listScroll(val, oldVal) {
            if (val > 0) {
                if (this.isTouch) return;
                this.spaceY = -(val * 0.96); //0.96:根节点字体大小/行高
            } else {
                this.spaceY = 0;
            }
        },
        touchStart(e) {
            this.startY = e.touches[0].clientY;
            this.isTouch = true;
        },
        touchHandler(e) {
            this.offset = e.touches[0].clientY - this.startY;
            //下滑
            if (this.offset > 0) {
                //边界值判定
                if (this.spaceY + this.offset / this.htmlFontSize > 0) {
                    this.spaceY = 0;
                    return;
                }
                this.spaceY = this.spaceY + this.offset / this.htmlFontSize;
            }
            //上滑
            else {
                //边界值判定
                if (
                    Math.abs(this.spaceY + this.offset / this.htmlFontSize) >
                    (this.lyricArray.length - 1) * 0.96
                ) {
                    this.spaceY = -((this.lyricArray.length - 1) * 0.96);
                    return;
                }
                this.spaceY = this.spaceY + this.offset / this.htmlFontSize;
            }
        },
        touchEnd(e) {
            this.isTouch = false;
        },
        change(){
          this.showAlbum = !this.showAlbum;
        }
    }
};
</script>

<style lang="less">
.lyric-wrapper {
    width: 100%;
    height: 80vh;
    position: relative;
    overflow: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
    .lyric-scroll {
        margin-top: 80%;
        transition: transform 0.3s linear;
        li {
            font-size: 16px;
            padding: 15px 0;
            transition: font-size 0.2s linear;
            &.active {
                color: #fff;
                font-size: 18px;
            }
        }
    }
}
.record {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: repeating-radial-gradient(
        #2a2928,
        #2a2928 1%,
        rgba(42, 41, 40, 0.85) 2%
    );
    animation: zhuan 20s linear infinite;
    img{
      width: 80%;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
}
// .record:after {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     margin: -35px;
//     border: solid 1px #fff;
//     width: 68px;
//     height: 68px;
//     border-radius: 50%;
//     box-shadow: 0 0 0 4px #42b983, inset 0 0 0 27px #42b983;
//     background: #fff;
//     content: "";
// }
.stop{
    animation-play-state: paused;
}
@keyframes zhuan {
  from{
    transform: translate(-50%,-50%) rotate(0deg);
  }
    to {
        transform:translate(-50%,-50%) rotate(360deg);
    }
}
</style>