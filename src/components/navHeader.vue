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
        <van-popup v-model="show" position="left" :style="{width:'70vw',height:'100vh'}" round>
            <div class="login-tip" v-if="!isLogin"> 
                <p class="login-slogan">立即登录，尽享海量高品质音乐</p>
                <van-button round type="info" color="#dd001b" to="/login">登录GoGoGo!</van-button>
            </div>
            <div class="login-user" v-if="isLogin">
                <img :src="avatarUrl" alt="" class="avatar-user">
                <span class="nickname">{{nickname}}</span>
            </div>
            <category :list="category"></category>
            <van-button class="logout-btn" round type="default" size="large" v-if="isLogin" @click="logout">退出登录</van-button>
        </van-popup>
    </div>
</template>
<script>
import Bus from "../util/Bus";
import category from "@/components/category";
import api from "@/api";
import { format } from 'url';

export default {
    data() {
        return {
            navList: ["我的", "发现", "云村", "视频"],
            currentIndex: 1,
            show:false,
            category:[
                {
                    name:'我的消息',
                    path:'mymessage',
                    icon:'smile-comment-o',
                    color:'#F63515'
                },
                {
                    name:'我的好友',
                    path:'mypartner',
                    icon:'friends-o',
                    color:'#F63515'
                },
                {
                    name:'个人主页',
                    path:'zone',
                    icon:'wap-home-o',
                    color:'#F63515'
                },
                {
                    name:'换肤',
                    path:'skin',
                    icon:'brush-o',
                    color:'#F63515'
                }
            ],
            nickname:localStorage.getItem('nickname'),
            avatarUrl:localStorage.getItem('avatarUrl')

        };
    },
    components:{
        category
    },
    computed:{
        isLogin(){  //防止页面刷新后vuex登录状态丢失
            if(localStorage.getItem('loginState')==1){
                this.$store.commit('CHECK_LOGIN',1)
            }
            return this.$store.state.LOGIN_STATE;
        }
    },
    mounted() {
        this.init();
        Bus.$on("slideChange", this.deliverSlideIndex);


    },
    methods: {
        deliverTabIndex(index) {  //点击对应导航栏时，更新轮播图(内容区)对应index
            this.currentIndex = index;
            Bus.$emit("tabChange", index);
        },
        deliverSlideIndex(index) {  //滑动时更新导航栏、路由
            this.currentIndex = index;
            var path = index==0?'/my':index==1?'/find':index==2?'village':index==3?'/vlog':0;
            this.$router.push(path);
        },
        init(){ //页面刷新时更新导航栏高亮位置
        this.$nextTick(()=>{})
            this.currentIndex=this.$route.path=='/my'?0:this.$route.path=='/find'?1:this.$route.path=='/village'?
            2:this.$route.path=='/vlog'?3:0
        },
        showPopup(){
            this.show = true;
        },
        logout(){   //退出登录
            api.logout().then((res)=>{
                if(res.status==200){
                    this.$store.commit('CHECK_LOGIN',0)
                    localStorage.removeItem('loginState')
                   // this.$router.go(0)
                }
            })
            
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
            height: 24px;
            line-height: 24px;
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
        left: 15px;
        transform: translate(0,-50%);
    }
}
.login-tip{
    overflow: hidden;
}
.login-slogan{
    font-size: 0.2em;
    margin: 15px;
}
.login-user{
    margin: 15px;
    text-align: left
}
.avatar-user{
    width: 70px;
    height: 70px;
    border-radius: 50%;
}
.nickname{
    margin-left: 8px;
}
.logout-btn{
    position: absolute;
    left: 0;
    bottom: 5px;
}
</style>