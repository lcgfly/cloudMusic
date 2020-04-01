<template>
    <div @touchstart.stop>
        <default-nav title="搜索"></default-nav>
        <div class="search-gr">
            <van-search
                v-model="value"
                shape="round"
                placeholder="请输入搜索关键词"
                @input="onInput"
                @clear="onClear"
                @search="onSearch"
                :show-action="true"
            >
                <template v-slot:action>
                    <div @click="onSearch">搜索</div>
                </template>
            </van-search>
            <suggest v-if="suggestShow" :list="suggestInfo" @toSearch="onSearch"></suggest>
        </div>
        <contents v-if="contentShow"></contents>
    </div>
</template>

<script>
import api from "@/api";
import Bus from "@/util/Bus.js";
import defaultNav from "@/components/defaultNav";
import suggest from "./components/suggest";
import contents from "./components/contents";
import { setTimeout } from 'timers';
export default {
    name: "Search",
    data() {
        return {
            value: "",
            timer: null,
            suggestInfo: [],    
            suggestShow:false,  //控制搜索建议是否展示
            contentShow:false   //控制搜索结果是否展示
        };
    },
    components: {
        defaultNav,
        suggest,
        contents
    },
    watch:{
        value:function(val,oldVal){
            // if(val.length > 0){
            //     this.suggestShow = true
            // }
               if(val.length <= 0){
                   this.suggestShow = false
                   this.contentShow = false
                   this.onClear()
               }
                
        }
    },
    deactivated(){
        // this.value = ''
        // this.contentShow = false
        this.suggestShow = false
    },
    methods: {
        //防抖
        onInput(value) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if(this.value!=''){
                    this.searchSuggest()
                }
            }, 300);
        },
        onClear(){
            this.suggestInfo = []   //解决出现新提示时会有前一次提示的一闪而过的问题
        },
        searchSuggest(){
            api.getSearchSuggest(this.value).then((res)=>{
                res =res.data
                if(res.code == 200){
                    this.suggestInfo = res.result.allMatch?res.result.allMatch:[]
                    this.suggestShow = true
                }
            })
        },
        onSearch(keywords) {
            //点击搜索时的处理函数。同时通知子组件更新keywords
            this.value = keywords
            this.contentShow = true
            this.suggestShow = false
            let timer = setTimeout(()=>{
                 Bus.$emit('_search',keywords)
                 clearTimeout(timer)
             },20)
           
        }
    }
};
</script>

<style lang="less">
.search-gr {
    position: relative;
}
.search-sug {
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    padding: 0 15px;
    text-align: left;
    line-height: 1.5;
    z-index: 5;
    ul {
        background-color: #f7f8fa;
    }
}
</style>