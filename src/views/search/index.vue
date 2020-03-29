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
                :show-action="true"
            >
                <template v-slot:action>
                    <div>搜索</div>
                </template>
            </van-search>
            <suggest v-if="!search_empty" :list="suggestInfo"></suggest>
        </div>
    </div>
</template>

<script>
import api from "@/api";
import defaultNav from "@/components/defaultNav";
import suggest from "./components/suggest";
export default {
    name: "Search",
    data() {
        return {
            value: "",
            timer: null,
            suggestInfo: []
        };
    },
    components: {
        defaultNav,
        suggest
    },
    computed: {
        search_empty() {
            return this.value.length == 0;
        }
    },
    methods: {
        onInput(value) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if(this.value!=''){
                    this.searchSuggest()
                }
            }, 500);
        },
        onSearch() {},
        onClear(){
            this.suggestInfo = []
        },
        searchSuggest(){
            api.getSearchSuggest(this.value).then((res)=>{
                res =res.data
                if(res.code == 200){
                    this.suggestInfo = res.result.allMatch?res.result.allMatch:[]
                }
            })
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
    ul {
        background-color: #f7f8fa;
    }
}
</style>