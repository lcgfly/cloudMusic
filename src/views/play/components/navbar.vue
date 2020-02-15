<template>
    <div class="navbar">
        <van-icon name="arrow-left" size="0.4rem" color="#fff" @click="back" />
        <div class="info-brief">
            <p>{{name}}</p>
            <p>{{artistsFn}}</p>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex";
export default {
    data(){
        return{}
    },
    props:{
        name:String,
        artists:Array
    },
    computed:{
        artistsFn(){
            if(this.artists.length<=0) return 
            if(this.artists.length==1) return this.artists[0].name
            var list =this.artists[0].name
            for(var i =1;i<this.artists.length-1;i++){
                list+='/'+this.artists[i].name
            }
            return list
        }
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
    display: flex;
    align-items: center;
    padding: 0 5px;
    //background-color: hotpink;
    .info-brief {
        display: inline-block;
        margin-left: 5px;
        p:first-child {
            font-size: 16px;
        }
        p:last-child {
            margin-top: 5px;
            font-size: 10px;
        }
    }
}
</style>