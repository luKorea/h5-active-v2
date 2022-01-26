/*
 * @Author: korealu
 * @Date: 2022-01-13 17:43:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-01-26 11:46:35
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
