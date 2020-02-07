<template>
    <div>
        <song-list :songLists="list"></song-list>
    </div>
</template>

<script>
import api from "@/api";
import songList from "@/components/songList";

export default {
    data() {
        return {
            isLogin: false,
            list:[]
        };
    },
    components:{
        songList
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (localStorage.getItem("loginState")) {
                vm.isLogin = true;
            }
        });
    },
    mounted(){
        this.getDailySongs()
    },
    methods:{
        getDailySongs(){
            api.DailyRecommendSongs().then((res)=>{
                var res = res.data
                console.log(res)
                if(res.code == 200){
                    this.list = res.recommend 
                }
            })
        }
    }
};
</script>

<style>
</style>