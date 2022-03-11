/*
 * @Author: your name
 * @Date: 2022-01-18 14:46:55
 * @LastEditTime: 2022-03-11 11:58:59
 * @LastEditors: korealu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/main.js
 */
import Vue from "vue";
import "lib-flexible/flexible";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import globalRegister from "@/global";
import Vconsole from "vconsole";
import VueClipboard from "vue-clipboard2";
import { Dialog } from "vant";
import smoothscroll from "smoothscroll-polyfill";
Vue.use(VueClipboard);
smoothscroll.polyfill();
new Vconsole();

Vue.use(Dialog);
Vue.config.productionTip = false;

import "normalize.css";
import "animate.css";
import "@/style/index.less";

store.dispatch("getLocalStorageInit").then((r) => console.log(r));
store
  .dispatch("anniversaryModule/getLocalStorageInit")
  .then((r) => console.log(r));
Vue.use(globalRegister);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
