/*
 * @Author: korealu
 * @Date: 2022-03-03 15:30:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-24 09:25:59
 * @Description: file content
 * @FilePath: /h5-active-v2/src/store/module/anniversary.js
 */
import { userLogin } from "@/api/common";
import { getUserAccount } from "@/api/anniversary";
import localCache from "@/utils/cache";

export default {
  state: {
    userInfo: {},
    token: null,
    uid: "",
  },
  mutations: {
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
    getLocalStorageInit({ commit }) {
      const token = localCache.getCache("token");
      const userInfo = localCache.getCache("userInfo");
      const uid = localCache.getCache("uid");
      token && commit("SET_TOKEN", token);
      userInfo && commit("SET_USERINFO", userInfo);
      uid && commit("SET_UID", uid);
    },
    getUserAccountAction({ commit, state }, payload) {
      getUserAccount({
        uid: payload?.uid,
        loginKey: payload?.loginKey,
      }).then((res) => {
        if (res.code === 200) {
          const data = {
            ...state.userInfo,
            ...res.data,
          };

          commit("SET_USERINFO", data);
        }
      });
    },
    loginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        userLogin(payload).then((res) => {
          if (res.code === 200) {
            const data = res.data;
            commit("SET_USERINFO", data);
            commit("SET_UID", data?.uid);
            commit("SET_TOKEN", data?.loginKey);
            localCache.setCache("userInfo", data);
            localCache.setCache("uid", data?.uid);
            localCache.setCache("token", data?.loginKey);
            resolve();
            // checkUserState({
            //   uid: data?.uid,
            //   loginKey: data?.loginKey,
            // }).then((result) => {
            //   if (result.code === 200) {
            //     localCache.setCache("userInfo", data);
            //     localCache.setCache("uid", data?.uid);
            //     localCache.setCache("token", data?.loginKey);
            //     commit("SET_UID", data?.uid);
            //     commit("SET_TOKEN", data?.loginKey);
            //     resolve();
            //   } else reject(result.msg);
            // });
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
