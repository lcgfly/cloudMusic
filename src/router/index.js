import Vue from "vue"
import VueRouter from "vue-router"
import welcome from "@/components/Welcome.vue"
import find from "@/views/find"
import my from "@/views/my"
import village from "@/views/village"
import vlog from "@/views/vlog"

const login = () => import('@/views/login')
const daily = () => import('@/views/daily')
const play = () => import('@/views/play')

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: welcome
  },
  {
    path: "/my",
    component: my
  },
  {
    path: "/find",      //默认首页
    component: find,
  },
  {
    path: "/village",
    component: village
  },
  {
    path: "/vlog",
    component: vlog
  },
  {
    path: "/login",
    component: login
  },
  {
    name:'daily',
    path: "/daily",
    component: daily
  }
  // {
  //   name:'play',
  //   path: '/play/:id',
  //   component: play
  // }
];

const router = new VueRouter({
  routes
});
export default router;
