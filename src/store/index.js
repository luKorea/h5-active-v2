import Vue from "vue";
import Vuex from "vuex";
import localCache from "@/utils/cache";
import { userLogin, userRegister } from "@/api";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: "",
    userInfo: {},
    uid: null,
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
    async registerAction({ commit }, payload) {
      const loginInfo = await userRegister(payload);
      localCache.setCache("userInfo", loginInfo);
      commit("SET_USERINFO", loginInfo);
    },
    async logoutAction({ commit }) {
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
  },
});
