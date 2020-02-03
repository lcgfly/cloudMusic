<template>
    <div class="find">
        2
        <banner></banner>
        <div class="category">
            <div v-for="(item,index) in category" :key="index">
                <router-link :to="item.path">
                    <van-icon :name="item.icon" size="0.5rem" color="#fff"/>
                    <span>{{item.name}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import banner from "./components/banner"

export default {
    data() {
        return {
            category:[
                {
                    name:'每日推荐',
                    path:'today',
                    icon:'notes-o'
                },
                {
                    name:'歌单',
                    path:'songsheet',
                    icon:'music-o'
                },
                {
                    name:'排行榜',
                    path:'top',
                    icon:'chart-trending-o'
                },
                {
                    name:'电台',
                    path:'radio',
                    icon:'service-o'
                }
            ]
        };
    },
    components:{
        banner
    }
};
</script>
<style lang="less" scoped>
.find .category{
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    i{
        padding: 15px;
        border-radius: 50%;
        background-color: #F63515;
        filter: drop-shadow(0px 6px 10px black);
}
    span{
        display: block;
        margin-top: 10px;
    }
}
</style>