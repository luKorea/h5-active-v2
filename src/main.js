import Vue from "vue";
import "lib-flexible/flexible";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import globalRegister from "@/global";
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

Vue.config.productionTip = false;

import "normalize.css";
import "animate.css";
import "@/style/index.less";

store.dispatch("getLocalStorageInit").then((r) => console.log(r));
Vue.use(globalRegister);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
