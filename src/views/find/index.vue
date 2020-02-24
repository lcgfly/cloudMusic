<template>
    <div class="find">
        2
        <banner :list="list"></banner>
        <category :list="category"></category>
    </div>
</template>
<script>
import api from "@/api";
import banner from "./components/banner";
import category from "@/components/category";
export default {
    data() {
        return {
            category:[
                {
                    name:'每日推荐',
                    path:'daily',
                    icon:'notes-o',
                    color:'#fff'
                },
                {
                    name:'歌单',
                    path:'songsheet',
                    icon:'music-o',
                    color:'#fff'
                },
                {
                    name:'排行榜',
                    path:'top',
                    icon:'chart-trending-o',
                    color:'#fff'
                },
                {
                    name:'电台',
                    path:'radio',
                    icon:'service-o',
                    color:'#fff'
                }
            ],
            list:[]
        };
    },
    components:{
        banner,
        category
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            api.getBanner().then(res=>{
                this.list = res.data.banners;
            })
        }
    }
};
</script>
<style lang="less">
.find .category i{
        background-color: #F63515;
        filter: drop-shadow(2px 3px 4px #333)
}
</style>
