<template>
  <div class="default-nav">
        <van-icon name="arrow-left" size="0.4rem" color="#333" @click="back" />
        <div class="info-brief">
            <p>{{title}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:String
    },
    methods:{
        back(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less">
.default-nav {
    width: 100%;
    height: 5vh;
    text-align: left;
    display: flex;
    align-items: center;
    padding: 0 5px;
    background-color: #fff;
    .info-brief {
        display: inline-block;
        margin-left: 5px;
        p:first-child {
            font-size: 18px;
        }
    }
}
</style>