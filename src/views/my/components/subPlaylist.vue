<template>
<div>
<list :list="subPlayls"></list>
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
        subPlayls:Array
    },
    components:{
        list
    }
}
</script>

<style>

</style>