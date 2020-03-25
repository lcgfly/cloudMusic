<template>
<div>
    <list :list="createdPlayls"></list>
</div>
</template>

<script>
import list from "./list";
export default {
    data(){
        return{

        }
    },
    props:{
        createdPlayls:Array
    },
    components:{
        list
    }
}
</script>

<style>

</style>