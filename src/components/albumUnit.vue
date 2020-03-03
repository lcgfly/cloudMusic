<template>
      <div class="al-unit" @click="toDetailPage()">
          <div class="unit-cover">
              <img :src="imgUrl" alt="">
              <span>{{playCount|Playcount}}</span>
          </div>
          <p class="unit-description">{{name}}</p>
      </div>
</template>

<script>
export default {
    props:{
        id:Number,
        imgUrl:String,
        playCount:Number,
        name:String
    },
    methods:{
        toDetailPage(){
            this.$router.push({name:'detailPage',params:{id:this.id}})
        }
    }
}
</script>

<style lang="less">
.al-unit{
        .unit-cover{
            position: relative;
            img{
                width: 108px;
                max-width: 108px;
                border-radius: 10px;
            }
            span{
                position: absolute;
                top: 5px;
                right: 5px;
                color: #fff;
            }
        }
        .unit-description{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-top: 5px;
            font-size: 14px;
            max-width: 108px;
        }
    }
</style>