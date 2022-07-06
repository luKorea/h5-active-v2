/*
 * @Author: your name
 * @Date: 2022-01-18 14:46:55
 * @LastEditTime: 2022-07-06 10:37:21
 * @LastEditors: korealu 643949593@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/store/index.js
 */
import Vue from "vue";
import Vuex from "vuex";
import localCache from "@/utils/cache";
import { getGroupConfig, userLogin } from "@/api";

import anniversaryModule from "./module/anniversary";
import voteModule from "./module/vote";
import activeModule from "./module/active";
import summaryModule from "./module/summary";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    anniversaryModule,
    voteModule,
    activeModule,
    summaryModule,
  },
  state: {
    token: "",
    userInfo: {},
    uid: null,
    payConfig: {},
  },
  mutations: {
    SET_PAY_CONFIG(state, payload) {
      state.payConfig = payload;
    },
    SET_UID(state, payload) {
      state.uid = payload;
    },
    SET_USERINFO(state, payload) {
      state.userInfo = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_LOGOUT(state) {
      state.token = null;
      state.userInfo = {};
      state.uid = null;
      localCache.cleanCache();
    },
  },
  actions: {
    loginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        userLogin(payload).then((res) => {
          if (res.code === 200) {
            localCache.setCache("userInfo", res.data);
            localCache.setCache("uid", res.data?.uid);
            localCache.setCache("token", res.data?.loginKey);
            commit("SET_USERINFO", res.data);
            commit("SET_UID", res.data?.uid);
            commit("SET_TOKEN", res.data?.loginKey);
            resolve(res.data);
          } else {
            reject(res.msg);
          }
        });
      });
    },
    logoutAction({ commit }) {
      commit("SET_LOGOUT");
    },
    getLocalStorageInit({ commit }) {
      const token = localCache.getCache("token"),
        userInfo = localCache.getCache("userInfo"),
        uid = localCache.getCache("uid");
      token && commit("SET_TOKEN", token);
      userInfo && commit("SET_USERINFO", userInfo);
      uid && commit("SET_UID", uid);
    },
    // 获取组队活动配置
    async getGroupConfigAction({ commit }) {
      const result = await getGroupConfig();
      let payload = {};
      if (result.code === 200) {
        if (result.data && result.data.length > 0) {
          payload = {
            fuliOneEid: result.data[0].id,
            fuliOneSnId: result.data[0].snId,
            fuliOnePrice: result.data[0].price,
            fuliTwoEid: result.data[1].id,
            fuliTwoSnId: result.data[1].snId,
            fuliTwoPrice: result.data[1].price,
          };
        } else {
          payload = {};
        }
      }
      commit("SET_PAY_CONFIG", payload);
    },
  },
});
