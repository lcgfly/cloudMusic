import Vue from "vue"
import VueRouter from "vue-router"
import welcome from "@/components/Welcome.vue"
import find from "@/views/find"
import my from "@/views/my"
import village from "@/views/village"
import vlog from "@/views/vlog"

const login = () => import('@/views/login')
const daily = () => import('@/views/daily')
const playlist = () => import('@/views/playlist')
const detailPage = ()=> import('@/views/detailPage')
const toplist = ()=> import('@/views/toplist')

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
    path: "/daily",
    component: daily
  },
  {
    path: '/playlist',
    component: playlist
  },
  {
    name:'detailPage',
    path:'/detailPage',
    component:detailPage
  },
  {
    path:'/toplist',
    component:toplist
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
export default router;
