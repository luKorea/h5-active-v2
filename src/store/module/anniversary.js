/*
 * @Author: korealu
 * @Date: 2022-03-03 15:30:26
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-04 09:50:48
 * @Description: file content
 * @FilePath: /h5-active-v2/src/store/module/anniversary.js
 */
import { userLogin } from "@/api/common";
import { checkUserState } from "@/api/anniversary";
import localCache from "@/utils/cache";

export default {
  state: {
    userInfo: {},
    token: null,
    uid: "",
    checkPage: "A1",
  },
  mutations: {
    SET_CHECKPAGE(state, payload) {
      state.checkPage = payload;
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
            const data = res.data;
            checkUserState({
              uid: data?.uid,
            }).then((result) => {
              if (result.code === 200) {
                localCache.setCache("userInfo", data);
                localCache.setCache("uid", data?.uid);
                localCache.setCache("token", data?.loginKey);
                localCache.setCache("checkPage", result.data.webpage);
                commit("SET_USERINFO", data);
                commit("SET_UID", data?.uid);
                commit("SET_TOKEN", data?.loginKey);
                commit("SET_CHECKPAGE", result.data.webpage);
                resolve(result.data.webpage);
              } else reject(res.msg);
            });
          } else {
            reject(res.msg);
          }
        });
      });
    },
    logoutAction({ commit }) {
      commit("SET_LOGOUT");
    },
  },
  getters: {},
  namespaced: true,
};
