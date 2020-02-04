<template>
  <div id="app">
    <nav-header v-if="control"></nav-header>
        <swiper v-if="control"></swiper>
        <router-view v-if="!control"></router-view>
  </div>
</template>
<script>
import navHeader from "./components/navHeader";
import swiper from "./components/swiper";
export default {
    data() {
        return {};
    },
    components:{
        navHeader,
        swiper
    },
    computed:{
      control(){
        return /(^\/my$)|(^\/find$)|(^\/village$)|(^\/vlog$)/.test(this.$route.path);
      }
    }
}
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
