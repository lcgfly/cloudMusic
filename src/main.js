import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Router from 'vue-router'

//解决控制台报错:Uncatch Promise （vue-router3.0以后采用了Promise）
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false;

//全局样式
import "./assets/css/deviceAdapter/index.less";
import "./assets/css/reset.less";
import "vant/lib/index.css";
import "swiper/dist/css/swiper.css";

//Swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
//vant组件
import { Icon,Popup,Swipe,SwipeItem,Button} from "vant";

Vue.use(VueAwesomeSwiper);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
