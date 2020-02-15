<template>
    <div class="lyric-wrapper" ref="listwrap">
        <ul class="lyric-scroll" ref="list" :style="{transform:`translateY(${spaceY}rem)`}" @touchstart.passive="touchStart" @touchmove.passive="touchHandler" @touchend="touchEnd">
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
          offset:0,
          htmlFontSize:0
        };
    },
    props: {
        lyricArray: Array,
        lyricIndex: Number
    },
    watch:{
      lyricIndex:'listScroll'
    },
    mounted(){
      //拿到html的font-size
      this.htmlFontSize = Number(window.getComputedStyle(document.querySelector('html')).fontSize.replace(/\D/g,''))
    },
    methods:{
      listScroll(val,oldVal){
        if(val>0){
          if(this.isTouch) return
          this.spaceY = -(val*0.96)  //0.96:根节点字体大小/行高
        }
        else{
          this.spaceY = 0;
        }
      },
      touchStart(e){
        this.startY = e.touches[0].clientY
        this.isTouch =true
      },
      touchHandler(e){
        this.offset = e.touches[0].clientY - this.startY
        //下滑
        if(this.offset>0){
            //边界值判定
            if((this.spaceY+this.offset/this.htmlFontSize)>0){
              this.spaceY = 0
              return
            }
          this.spaceY=(this.spaceY+(this.offset/this.htmlFontSize))
        }
        //上滑
        else{
            //边界值判定
           if(Math.abs(this.spaceY+this.offset/this.htmlFontSize)>(this.lyricArray.length-1)*0.96){ 
             this.spaceY = -((this.lyricArray.length-1)*0.96)
             return
           } 
           this.spaceY=(this.spaceY+(this.offset/this.htmlFontSize))
        }
      },
      touchEnd(e){
        this.isTouch = false
      }
    }
};
</script>

<style lang="less">
.lyric-wrapper {
    width: 100%;
    height: 80vh;
    //background-color: #ccc;
    overflow: hidden;
    &::-webkit-scrollbar{
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
</style>