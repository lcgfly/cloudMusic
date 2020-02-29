<template>
    <div>
        <div class="col-tt-wrapper">
            <div>官方榜</div>
            <div class="col-tt-item" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
                <div class="left">
                    <img :src="item.coverImgUrl" alt />
                    <span>{{item.updateFrequency}}</span>
                </div>
                <div class="right">
                    <p v-for="(val,idx) in item.tracks" :key="idx">
                        {{idx+1}}.{{val.first}} - {{val.second}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        list: Array
    },
    methods:{
        toDetail(id){
            this.$router.push({name:'detailPage',params:{id:id}})
        }
    }
};
</script>

<style lang="less">
.col-tt-wrapper{
    text-align: left;
    padding: 10px;
    .col-tt-item{
        display: flex;
        margin-top: 20px;
        .left{
            position: relative;
            margin-right: 10px;
            img{
                width: 108px;
            }
            span{
                position: absolute;
                left: 5px;
                bottom: 5px;
                color:#fff;
                font-size: 12px;
            }
        }
        .right{
                display: flex;
                flex-wrap: wrap;
                align-items: center;
            p{
                width: 100%;
                font-size: 12px;
            }
        }
    }
}
</style>