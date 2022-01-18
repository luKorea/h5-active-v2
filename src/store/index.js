import Vue from "vue";
import Vuex from "vuex";
import localCache from "@/utils/cache";
import { getGroupConfig, userLogin } from "@/api";

Vue.use(Vuex);
export default new Vuex.Store({
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
        result.data && result.data.length > 0
          ? (((payload["fuliTwoSnId"] = result.data[1].snId),
            (payload["fuliTwoPrice"] = result.data[1].price)),
            ((payload["fuliOneSnId"] = result.data[0].snId),
            (payload["fuliOnePrice"] = result.data[0].price)))
          : (payload = {});
      }
      commit("SET_PAY_CONFIG", payload);
    },
  },
});
