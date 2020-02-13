<template>
    <div class="navbar">
        <van-icon name="arrow-left" size="0.4rem" color="#fff" @click="back" />
        <div class="info-brief">
            <p>歌曲名</p>
            <p>歌手</p>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex";
export default {
    data(){
        return{}
    },
    computed:{
    },
    methods:{
        ...mapMutations(['FULLSCREEN_TOGGLE']),
        back(){
            this.FULLSCREEN_TOGGLE();
        }
    }
};
</script>

<style lang="less" scoped>
.navbar {
    width: 100%;
    height: 5vh;
    text-align: left;
    background-color: hotpink;
    .info-brief {
        display: inline-block;
        p:first-child {
            font-size: 13px;
        }
        p:last-child {
            margin-top: 5px;
            font-size: 6px;
        }
    }
}
</style>