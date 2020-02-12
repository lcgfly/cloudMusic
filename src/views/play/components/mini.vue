<template>
  <div class="mini-page" @click="toFullScreen">
      <div>
          <p>歌曲名</p>
          <p>歌手</p>
      </div>
  </div>
</template>

<script>
export default {
data(){
    return{

    }
},
methods:{
    toFullScreen(){
        this.$emit('toFullScreen')
    }
}
}
</script>

<style lang="less">
.mini-page{
    position: fixed;
    width: 100vw;
    height: 10vh;
    bottom: 0;
    background-color: #dd001b;
}
</style>