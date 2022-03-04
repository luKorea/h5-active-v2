/*
 * @Author: korealu
 * @Date: 2022-01-13 17:43:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-04 15:50:36
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
  // 周年庆模块
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
  {
    path: "/ordinaryRecommend",
    name: "advertisementOrdinaryRecommend",
    component: () => import("@/views/anniversary/ordinary-recommend/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
  scrollBehavior: () => ({ y: 0 }),
});

export default router;
