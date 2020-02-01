import Vue from "vue";
import VueRouter from "vue-router";
import welcome from "../components/Welcome.vue"
import find from "../views/find";
import my from "../views/my";
import village from "../views/village";
import vlog from "../views/vlog";
import song from "@/components/song"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component:welcome
  },
  {
    path:"/my",
    component:my
  },
  {
    path:"/find",      //默认首页
    component:find
  },
  {
    path:"/village",
    component:village
  },
  {
    path:"/vlog",
    component:vlog
  },
  {
    path:"/song",
    component:song
  }
];

const router = new VueRouter({
  routes
});

export default router;
