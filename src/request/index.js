import KoreaRequest from "./service";
import { BASE_URL } from "./config";
// import localCache from "@/utils/cache";

export const request = new KoreaRequest({
  baseURL: BASE_URL,
  timeout: 10000,
  showLoading: true,
  interceptors: {
    requestInterceptors: (config) => {
      // const token = localCache.getCache("token") ?? "";
      // if (token) {
      //   config.headers["Authorization"] = `Bearer ${token}`;
      // }
      config.headers["Content-Type"] = "x-www-form-urlencoded";
      return config;
    },
  },
});
