<template>
    <div class="s-wrapper">
        <div class="s-block" @click="toDetail">
            <div>我喜欢的音乐</div>
        </div>
        <div class="s-block">
            <div>私人FM</div>
        </div>
        <div class="s-block">
            <div>播放记录</div>
        </div>
    </div>
</template>

<script>
import { mapState} from "vuex";
export default {
    props:{
        id:Number
    },
    computed:{
        ...mapState(['LOGIN_STATE'])
    },
    methods:{
        check(){
            if(!this.LOGIN_STATE){
                this.$toast('请登录')
                return false
            }
            return true
        },
        toDetail(){    
            if(this.check()){
                this.$router.push({name:'detailPage',params:{id:this.id}});
            }
            
        }
    }
};
</script>

<style lang="less">
.s-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .s-block {
        flex: 0 1 48%;
        position: relative;
        height: 70px;
        margin-bottom: 10px;
        color: #fff;
        border-radius: 5px;
         background: linear-gradient(to right, #fd746c, #ff9068);
        div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
        }
    }
}
</style>