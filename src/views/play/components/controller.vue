<template>
  <div class="tem">
      <van-slider v-model="value"/>
      <div class="temple">
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span>D</span>
          <span>E</span>
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

<style lang="less" scoped>
.tem{
    width: 100%;
    height: 15vh;
    background-color: rgb(80, 153, 80);
}
.temple{
    display: flex;
    justify-content: space-around;
}
</style>