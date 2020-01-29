<template>
    <div>
        <nav class="navheader">
            <van-icon name="wap-nav" class="menu-nav" size="0.4rem" @click="showPopup"/>
            <ul class="list">
                <li
                    v-for="(item,index) in navList"
                    :key="index"
                    :class="{'active':currentIndex==index}"
                    @click="deliverTabIndex(index)"
                >{{item}}</li>
            </ul>
        </nav>
        <van-popup v-model="show" position="left" :style="{width:'70vw',height:'100vh'}">内容</van-popup>
    </div>
</template>
<script>
import Bus from "../util/Bus";

export default {
    data() {
        return {
            navList: ["我的", "发现", "云村", "视频"],
            currentIndex: 1,
            show:false
        };
    },
    components: {},
    mounted() {
        this.$nextTick(this.init);
        Bus.$on("slideChange", this.deliverSlideIndex);

    },
    methods: {
        deliverTabIndex(index) {  //点击对应导航栏时，更新轮播图(内容区)对应index
            this.currentIndex = index;
            Bus.$emit("tabChange", index);
        },
        deliverSlideIndex(index) {  //滑动时更新导航栏、路由
            this.currentIndex = index;
            var path = index==0?'/my':index==1?'/find':index==2?'village':index==3?'/video':0;
            this.$router.push(path);
        },
        init(){ //页面刷新时更新导航栏高亮位置
            this.currentIndex=this.$route.path=='/my'?0:this.$route.path=='/find'?1:this.$route.path=='/village'?
            2:this.$route.path=='/video'?3:0
        },
        showPopup(){
            this.show = true;
        }
    }
};
</script>
<style lang="less" scoped>
nav.navheader{
    position: relative;
    padding: 0 10%;
    .list {
        width: 100%;
        overflow: hidden;
        li {
            width: 20%;
            display: inline-block;
            text-align: center;
            height: 48px;
            line-height: 48px;
            transition: all 0.15s linear;
            &.active {
                font-weight: bold;
                transform: scale(1.25);
            }
        }
    }
    .menu-nav{
        position: absolute;
        top: 50%;
        left: 30px;
        transform: translate(0,-50%);
    }
}
</style>