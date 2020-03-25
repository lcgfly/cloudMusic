<template>
    <div class="list-wrapper">
        <div
            class="list-item"
            v-for="(item,index) in list"
            :key="index"
            @click="toDetail(item.id)"
        >
            <img :src="item.coverImgUrl" alt />
            <div class="info">
                <p>{{item.name}}</p>
                <span>{{item.trackCount}}首</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array
    },
    methods:{
        toDetail(id){
            this.$router.push({name:'detailPage',params:{id:id}});
        }
    }
};
</script>

<style lang="less">
.list-wrapper {
    display: flex;
    flex-wrap: wrap;
    .list-item {
        flex: 0 1 50%;
        display: flex;
        margin-top: 10px;
        & > img {
            width: 76px;
            height: 76px;
            min-width: 76px;
            border-radius: 5px;
        }
        .info {
            padding: 5px 0 0 5px;
            text-align: left;
            font-size: 13px;
            p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            span {
                font-size: 12px;
                color: #ccc;
            }
        }
    }
}
</style>