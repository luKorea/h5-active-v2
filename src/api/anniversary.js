/*
 * @Author: korealu
 * @Date: 2022-03-03 10:09:10
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-04 09:42:36
 * @Description: file content
 * @FilePath: /h5-active-v2/src/api/anniversary.js
 */
import { request } from "@/request";

//  检测用户资格
export function checkUserState(data) {
  return request.post({
    url: "/api/event/ann2022/checkUser",
    data: data,
  });
}
