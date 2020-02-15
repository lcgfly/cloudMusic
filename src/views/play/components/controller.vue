<template>
  <div class="controller">
      <van-slider v-model="value"/>
      <div class="panel">
          <i class="iconfont icon-icon-5"></i >
          <i class="iconfont icon-icon-2"></i >
          <i class="iconfont icon-icon-3"></i >
          <i class="iconfont icon-icon-1"></i >
          <i class="iconfont icon-icon-8"></i >
      </div>
  </div>
</template>

<script>
export default {
data(){
    return{
        value:50
    }
}
}
</script>

<style lang="less">
@import url('//at.alicdn.com/t/font_1641081_msftgvihz6t.css');

.controller{
    width: 100%;
    height: 15vh;
    //background-color: rgb(80, 153, 80);
}
.panel{
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    i{
        font-size: 46px;
    }
}
</style>