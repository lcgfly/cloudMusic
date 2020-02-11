<template>
    <div class="lyric-wrapper" ref="listwrap">
        <ul class="lyric-scroll" ref="list" @touchstart="touchStart" @touchmove="touchHandler" @touchend="touchEnd">
            <li
                v-for="(item,index) in lyricArray"
                :key="index"
                :class="{'active':index==lyricIndex}"
            >{{item.lyric}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
          spaceY:0,
          isTouch:false,
          startY:0,
          timer:null
        };
    },
    props: {
        lyricArray: Array,
        lyricIndex: Number
    },
    watch:{
      lyricIndex:'listScroll'
    },
    methods:{
      listScroll(val,oldVal){
        if(val>0){
          var element = this.$refs.list.children[val-1]
          var height = element.offsetHeight
          this.spaceY += height 
          if(this.isTouch) return false
          this.$refs.list.style.transform = `translateY(-${this.spaceY}px)`
        }
      },
      touchStart(e){
        this.startY = e.touches[0].clientY
        this.isTouch =true
      },
      touchHandler(e){
        //下滑
        if(e.touches[0].clientY-this.startY>0){
          this.$refs.list.style.transform = `translateY(-${this.spaceY - e.touches[0].clientY}px)`
        }
        //上滑
        else{
          this.$refs.list.style.transform = `translateY(-${this.spaceY + e.touches[0].clientY}px)`
        }
      },
      touchEnd(e){
        this.isTouch = false
        //通过一个简单的防抖函数，在用户停止滑动1秒后，返回到当前歌词处
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.listwrap.scrollTop = 0
        }, 1000);
      }
    }
};
</script>

<style lang="less" scoped>
.lyric-wrapper {
    width: 100%;
    height: 80vh;
    background-color: #ccc;
    overflow: scroll;
    // &::-webkit-scrollbar{
    //   display: none;
    // }
    .lyric-scroll {
        margin-top: 80%;
        transition: transform 0.5s linear;
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
</style>