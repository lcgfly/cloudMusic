<template>
    <div>
        <ar-unit
            v-for="(item,index) in obj.artists"
            :key="index"
            :imgUrl="item.img1v1Url"
            :name="item.name"
            @toDetail="toDetail(item.id)"
        ></ar-unit>
    </div>
</template>

<script>
import arUnit from "@/views/artist/components/arUnit";
export default {
    props: {
        obj: Object
    },
    components: {
        arUnit
    },
    methods:{
      toDetail(id){
            this.$router.push({name:'arDetail',params:{id:id}})
        }
    }
};
</script>

<style>
</style>