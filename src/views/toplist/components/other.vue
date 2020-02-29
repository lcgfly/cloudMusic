<template>
  <div>
      <div class="tt-wrapper">
          <div class="title">所有榜单</div>
      <div class="tt-item" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
          <div class="tt-cover">
              <img :src="item.coverImgUrl" alt="">
              <span>{{item.updateFrequency}}</span>
          </div>
          <p class="tt-description">{{item.name}}</p>
      </div>
  </div>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:{
        list:Array
    },
    methods:{
        toDetail(id){
            this.$router.push({name:'detailPage',params:{id:id}})
        }
    }
}
</script>

<style lang="less">
.tt-wrapper{
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .title{
        display: block;
        width: 100%;
        text-align: left;
    }
    .tt-item{
        flex: 0 1 25%;
        margin: 10px 5px 0;
        .tt-cover{
            position: relative;
            img{
                width: 108px;
                max-width: 108px;
                border-radius: 10px;
            }
            span{
                position: absolute;
                left: 5px;
                bottom: 5px;
                color: #fff;
            }
        }
        .tt-description{
            margin-top: 5px;
            font-size: 14px;
        }
    }
}
</style>