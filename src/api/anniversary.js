/*
 * @Author: korealu
 * @Date: 2022-03-03 10:09:10
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-07 16:19:36
 * @Description: file content
 * @FilePath: /h5-active-v2/src/api/anniversary.js
 */
import { request } from "@/request";

//  检测用户资格
export function checkUserState(data) {
  return request.post({
    url: "/api/event/ann2022/checkUser",
    data: data,
    showLoading: false,
  });
}

// 获取用户账号状态
export function getUserAccount(data) {
  return request.post({
    url: "/api/trade/getAccount",
    data: data,
    showLoading: false,
  });
}

// 获取用户进入到pose库或者人偶库展示的模型
export function getPoseAndEvenList(data) {
  return request.post({
    url: "/api/event/ann2022/molds",
    data: data,
  });
}
// 1P币购买人偶
export function bugOnePrice(data) {
  return request.post({
    url: "/api/trade/purchase",
    data: data,
  });
}
