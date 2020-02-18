<<<<<<< Updated upstream
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

=======
import Vue from "vue";
import VueRouter from "vue-router";
import welcome from "../components/Welcome.vue"
import find from "../views/find";
import my from "../views/my";
import village from "../views/village";
import vlog from "../views/vlog";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    path: "/find",      //默认首页
    component: find,
=======
    path:"/my",
    component:my
>>>>>>> Stashed changes
  },
  {
    path: "/village",
    component: village
  },
  {
<<<<<<< Updated upstream
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
=======
    path:"/village",
    component:village
  },
  {
    path:"/vlog",
    component:vlog
>>>>>>> Stashed changes
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
