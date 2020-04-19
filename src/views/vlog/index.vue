<template>
    <div>
        <p>敬请期待...</p>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="less" scoped>
 div{
     position: relative;
     width: 100vw;
     height: 100vh;
     p{
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%,-50%);
         font-size: 24px;
     }
 }
</style>