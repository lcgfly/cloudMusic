<template>
  <div class="arUnit" @click="toDetail">
      <div class="avatal">
          <img :src="imgUrl" alt="">
      </div>
      <span>{{name}}</span>
  </div>
</template>

<script>
export default {
    props:{
        imgUrl:String,
        name:String
    },
    methods:{
        toDetail(){
           this.$emit('toDetail')
        }
    }
}
</script>

<style lang="less">
.arUnit{
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 10px;
    .avatal{
        width: 70px;
        height: 70px;
        img{
            width: 100%;
            border-radius: 50%;
        }
    }
    &>span{
        font-size: 16px;
        margin-left: 5px;
    }
}
</style>