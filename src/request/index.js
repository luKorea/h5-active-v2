/*
 * @Author: your name
 * @Date: 2022-01-18 14:46:55
 * @LastEditTime: 2022-01-20 15:55:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE,
 * @FilePath: /h5-active-v2/src/request/index.js
 */
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
      // config.headers["Content-Type"] = "x-www-form-urlencoded";
      config.headers["Content-Type"] =
        "application/x-www-form-urlencoded; charset=UTF-8";
      return config;
    }
  }
});
