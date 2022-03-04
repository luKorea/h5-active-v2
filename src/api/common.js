/*
 * @Author: korealu
 * @Date: 2022-03-04 09:40:28
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-04 09:40:28
 * @Description: file content
 * @FilePath: /h5-active-v2/src/api/common.js
 */
import { request } from "@/request";

// 用户登录
export const userLogin = (params) => {
  return request.post({
    url: `/api/doll/user/phone/login`,
    // params: params,
    data: params,
  });
};

// 微信公众号授权
export const getUserOpenId = (data) => {
  return request.post({
    url: "/api/doll/user/getOpenId",
    params: data,
  });
};
// 微信支付
export const wechatPay = (params) => {
  return request.post({
    url: "/api/charge/orderWechat",
    data: params,
  });
};
// 支付宝支付
export const ailPay = (params) => {
  return request.post({
    url: "/api/charge/orderAlipay",
    data: params,
  });
};
