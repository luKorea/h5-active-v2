/*
 * @Author: korealu
 * @Date: 2022-03-03 10:09:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-24 18:27:54
 * @Description: file content
 * @FilePath: /h5-active-v2/src/api/anniversary.js
 */
import { request } from "@/request";

//  检测用户资格
export function checkUserState(data) {
  return request.post({
    url: "/api/event/mayday22/config",
    data: data,
    showLoading: false,
  });
}

// 预约以及取消预约
export function voteState(data, state) {
  return request.post({
    url: state
      ? "/api/event/mayday22/booking"
      : "/api/event/mayday22/cancelBooking",
    data: data,
    showLoading: true,
  });
}
