<template>
  <div id="app">
    <nav-header></nav-header>
        <swiper></swiper>
        <!-- <router-view v-show="false"></router-view> -->
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
