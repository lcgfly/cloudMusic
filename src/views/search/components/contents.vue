<template>
    <div>
        <van-tabs v-model="active" swipeable animated>
            <van-tab v-for="(item,index) in tab" :key="index" :title="item">
            </van-tab>       
        </van-tabs>
        <component :is="views[active]" :obj="obj"></component>
    </div>
</template>

<script>
import Bus from "@/util/Bus.js";
import api from "@/api";
import song from "./song";
import artist from "./artist";
export default {
    data() {
        return {
            active: 0,
            tab: ["单曲", "歌手"],
            views:['song','artist'],    //控制动态组件显示某个组件
            type:[1,100],               //根据当前导航栏决定请求类型
            keywords:'',                //父组件传过来的关键词
            obj:{}  
        };
    },
    components:{
        song,
        artist
    },
    created(){
        Bus.$on('_search',this.eventHandler)
    },
    watch:{
        keywords:function(val,oldVal){
            this.searching()
        },
        active:function(val,oldVal){
            this.searching()
        }
    },
    methods:{
        eventHandler(keywords){
            this.keywords = keywords
        },
        searching(){    //根据当前导航栏请求数据
            let type = this.type[this.active]
            let keywords = this.keywords
            api.getSearch(keywords,type).then((res)=>{
                res = res.data
                if(res.code == 200){
                    this.obj = res.result
                }
           })
        }
    }
};
</script>

<style>
</style>