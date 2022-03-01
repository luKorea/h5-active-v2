/*
 * @Author: korealu
 * @Date: 2022-01-13 17:43:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 17:38:33
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
  {
    path: "/login",
    name: "advertisementLogin",
    component: () => import("@/views/anniversary/login/login.vue"),
  },
  {
    path: "/poseRecommend",
    name: "advertisementPoseRecommend",
    component: () => import("@/views/anniversary/pose-recommend/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
