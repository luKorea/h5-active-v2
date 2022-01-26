/*
 * @Author: korealu
 * @Date: 2022-01-13 17:43:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-01-26 10:56:52
 * @Description: file content
 * @FilePath: /h5-active-v2/src/router/index.js
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/group",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

export default router;
