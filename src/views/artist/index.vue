<template>
    <div>
        <default-nav title="热门歌手"></default-nav>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="已经到底啦"
            :immediate-check="false"
            offset="0"
            @load="loadMore"
        >
            <ar-unit
                v-for="(item,index) in list"
                :key="index"
                :imgUrl="item.img1v1Url"
                :name="item.name"
                @toDetail="toDetail(item.id)"
            ></ar-unit>
            <template v-slot:loading>
                <van-loading size="36" color="#42b983">正在呼叫歌手</van-loading>
            </template>
        </van-list>
    </div>
</template>

<script>
import api from "@/api";
import defaultNav from "@/components/defaultNav";
import arUnit from "./components/arUnit";
export default {
    data() {
        return {
            offset: 0,
            list: [],
            loading: false,
            finished: false
        };
    },
    components: {
        defaultNav,
        arUnit
    },
    created() {
        this.$toast.loading({
            duration: 0,
            message: "玩命加载中"
        });
        this.getData();
    },
    methods: {
        getData(offset, limit) {
            api.getArtistHot(offset, limit).then(res => {
                res = res.data;
                if (res.code == 200) {
                    if (!res.more) this.finished = true;
                    this.list =
                        this.list.length == 0
                            ? res.artists
                            : this.list.concat(res.artists);
                    this.$toast.clear();
                }
            });
        },
        loadMore() {
            this.offset += 1;
            this.getData(this.offset, 15);
            this.loading = false;
        },
        toDetail(id){
            this.$router.push({name:'arDetail',params:{id:id}})
        }
    }
};
</script>

<style>
</style>