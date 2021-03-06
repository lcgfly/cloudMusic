import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Router from 'vue-router'
import {Playcount} from "./util/Playcount";
import {ripple} from "./util/Ripple";

//解决控制台报错:Uncatch Promise （vue-router3.0以后采用了Promise）
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false;

ripple()

//全局filter
Vue.filter('Playcount',Playcount);

//全局样式
import "./assets/css/deviceAdapter/index.less";
import "./assets/css/reset.less";
// import "vant/lib/index.css";
import "swiper/dist/css/swiper.css";
import "./assets/css/myAnimation.less";
import "./assets/css/ripple.less";

//Swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
//vant组件
import { Icon, Popup, Swipe, SwipeItem, Button, Field, List, Divider, Slider,Toast,Tab,Tabs,Loading,Search} from "vant";

Vue.use(VueAwesomeSwiper);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Button);
Vue.use(Field);
Vue.use(List).use(Divider);
Vue.use(Slider);
Vue.use(Toast);
Vue.use(Tab).use(Tabs);
Vue.use(Loading);
Vue.use(Search);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
