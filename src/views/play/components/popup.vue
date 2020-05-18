<template>
    <van-popup v-model="show" position="bottom" round :style="{height:'40%'}">
        <div class="menu-main">
            <div class="menu-head">
                <div class="left" @click="switchMode">
                    <i class="iconfont" :class="{'icon-icon-5': mode==0,'icon-icon-4': mode==1,'icon-icon-6': mode==2}"
                    ></i>
                    <span>{{message}}</span>
                </div>
                <van-icon name="delete" @click="deleteAll"/>
            </div>
            <div class="menu-bd">
                <div class="menu-item ripple" v-for="(item,index) in audioList" :key="index" @click.stop="play(index)">
                    <div class="lt van-ellipsis">
                        <span>{{item.name}}</span>-<span>{{ item.artists
                        ? item.artists[0].name
                        : item.ar
                        ? item.ar[0].name
                        : ''}}</span>
                    </div>
                    <div class="rt">
                        <van-icon name="cross" @click.stop="_deleteOne(index)"/>
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script>
import Bus from "@/util/Bus.js";
import { mapState, mapMutations, mapGetters,mapActions } from "vuex";
export default {
    data() {
        return {
            show: false
        };
    },
    computed: {
        ...mapState(["audioList", "mode"]),
        ...mapGetters(["AUDIO_CURRENT_INDEX"]),
        message() {
            switch (this.mode) {
                case 0:
                    return "列表循环";
                case 1:
                    return "单曲循环";
                case 2:
                    return "随机播放";
            }
        }
    },
    mounted() {
        Bus.$on("menuListShow", this.toShow);
    },
    methods: {
        ...mapMutations([ "MODE_TOGGLE"]),
        ...mapActions(['_deleteOne']),
        toShow() {
            this.show = true;
        },
        switchMode() {
            switch (this.mode) {
                case 0:
                    this.MODE_TOGGLE(1);
                    break;
                case 1:
                    this.MODE_TOGGLE(2);
                    break;
                case 2:
                    this.MODE_TOGGLE(0);
                    break;
            }
        },
        play(index){
            this.$emit('play',index)
        },
        deleteAll(){
            this.$emit('deleteAll')
            this.show = false
        }
    }
};
</script>
<style lang="less">
.menu-main {
    padding: 10px 10px 0;
    color: #333;
    i {
        font-size: 30px;
    }
    .menu-head,.menu-bd .menu-item{  
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .menu-bd .menu-item .lt{
        width: 240px;
        text-align: left;
        span:last-child{
            font-size: 12px;
            color: hsla(0, 0%, 0%, 0.6);
        }
    }
    .van-icon{
        z-index: 10;
    }
}

</style>
