/*
 * @Author: korealu
 * @Date: 2022-01-13 17:43:39
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-28 10:01:24
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
    path: "/Ann2022",
    name: "advertisementLogin",
    // component: () => import("@/views/endPage/index.vue"),
    // component: () => import("@/views/anniversary/login/login.vue"),
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
  {
    path: "/end",
    name: "endPage",
    component: () => import("@/views/endPage/index.vue"),
  },
  {
    path: "/mayday22",
    name: "votePage",
    // component: () => import("@/views/endPage/index.vue"),
    component: () => import("@/views/vote/index/index.vue"),
  },
  // 618活动
  {
    path: "/active",
    name: "activePage",
    // component: () => import("@/views/endPage/index.vue"),
    component: () => import("@/views/active/index/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
  scrollBehavior: () => ({
    y: 0,
  }),
});

export default router;
