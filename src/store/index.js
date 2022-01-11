import Vue from "vue";
import Vuex from "vuex";
import localCache from "@/utils/cache";
import { userLogin, userRegister } from "@/api";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: "",
    userInfo: {},
  },
  mutations: {
    SET_USERINFO(state, payload) {
      state.userInfo = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async loginAction({ commit }, payload) {
      const loginInfo = await userLogin(payload);
      localCache.setCache("userInfo", loginInfo);
      commit("SET_USERINFO", loginInfo);
    },
    async registerAction({ commit }, payload) {
      const loginInfo = await userRegister(payload);
      localCache.setCache("userInfo", loginInfo);
      commit("SET_USERINFO", loginInfo);
    },
    getLocalStorageInit({ commit }) {
      const token = localCache.getCache("token"),
        userInfo = localCache.getCache("userInfo");
      token && commit("SET_TOKEN", token);
      userInfo && commit("SET_USERINFO", userInfo);
    },
  },
});
