import Vue from "vue";
import VueRouter from "vue-router";
import welcome from "../components/Welcome.vue"
import find from "../views/find/find.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component:welcome
  },
  {
    path:"/my",
    component:find
  },
  {
    path:"/find",      //默认首页
    component:find
  },
  {
    path:"/village",
    component:find
  },
  {
    path:"/video",
    component:find
  }
];

const router = new VueRouter({
  routes
});

export default router;
