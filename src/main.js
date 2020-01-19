import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

//全局样式
import "./assets/css/deviceAdapter/index.less";
import "./assets/css/reset.less";
import "vant/lib/index.css";
import "swiper/dist/css/swiper.css";

//Swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
//vant组件
import { Tab, Tabs, Button } from "vant";

Vue.use(VueAwesomeSwiper);
Vue.use(Button);
Vue.use(Tab).use(Tabs);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
