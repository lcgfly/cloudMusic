<template>
    <div class="find">
        <banner :list="list"></banner>
        <category :list="category"></category>
        <recommend :list="recList"></recommend>
    </div>
</template>
<script>
import api from "@/api";
import banner from "./components/banner";
import category from "@/components/category";
import recommend from "./components/recommend";
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
                    path:'playlist',
                    icon:'music-o',
                    color:'#fff'
                },
                {
                    name:'排行榜',
                    path:'toplist',
                    icon:'chart-trending-o',
                    color:'#fff'
                },
                {
                    name:'歌手',
                    path:'artist',
                    icon:'user-circle-o',
                    color:'#fff'
                }
            ],
            list:[],
            recList:[]
        };
    },
    components:{
        banner,
        category,
        recommend
    },
    created() {
        this.init();
    },
    activated(){
        if(this.login&&this.recList.length==0){
            this.getRecommendList();
        }
    },
    computed:{
        login(){
            return this.$store.state.LOGIN_STATE
        }
    },
    methods: {
        init(){
            api.getBanner().then(res=>{
                this.list = res.data.banners;
            })
        },
        getRecommendList(){
            api.getPlaylistRecommend().then((res=>{
                var res = res.data;
                if(res.code == 200){
                    this.recList = res.recommend
                }
            }))
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
