<!--分类入口组件-->
<template>
    <div>
        <div class="category">
            <div v-for="(item,index) in list" :key="index">
                <router-link :to="item.path">
                    <van-icon :name="item.icon" size="0.5rem" :color="item.color"/>
                    <span>{{item.name}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props:{
        list:{
            type:Array,
            required:true
        }
    }
};
</script>
<style lang="less">
 .category{
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    i{
        padding: 15px;
        border-radius: 50%;
        // background-color: #F63515;
        // filter: drop-shadow(4px 6px 8px #333);
}
    span{
        display: block;
        margin-top: 10px;
        font-size: 24px;
    }
}
</style>