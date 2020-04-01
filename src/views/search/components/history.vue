<template>
    <div class="search-history">
        <span v-for="(item,index) in list" :key="index" :style="{backgroundColor:randomBG()}" @click="toSearch(item)">
            {{item}}
        </span>
        <button class="clear" v-if="list.length>0" @click="clearHistory">清空记录</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    props:{
        list:Array
    },
    methods:{
        randomBG(){
            return `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
        },
        toSearch(keywords){
            this.$emit('toSearch',keywords)
        },
        clearHistory(){
            this.$emit('_clearHistory')
        }
    }
};
</script>

