/*
 * @Author: your name
 * @Date: 2022-01-18 14:46:55
 * @LastEditTime: 2022-01-25 13:57:31
 * @LastEditors: korealu
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/api/index.js
 */
import { request } from "@/request";

// 微信公众号授权
export const getUserOpenId = (data) => {
  return request.post({
    url: "/api/doll/user/getOpenId",
    params: data,
  });
};

// 获取页面基础配置
export const getPageConfig = () => {
  return request.post({
    url: "/api/event/group/h5Config",
  });
};

// 用户登录
export const userLogin = (params) => {
  return request.post({
    url: `/api/doll/user/phone/login`,
    // params: params,
    data: params,
  });
};

// 获取组队活动配置
export const getGroupConfig = (params) => {
  return request.post({
    url: "/api/event/group/config",
    data: params,
  });
};
// 用户抽奖记录
export const getUserPrize = (params) => {
  return request.post({
    url: "/api/event/group/getRewardRecords",
    data: params,
  });
};

// 用户支付调起校验，校验是否可以支付
export const rulePayStatus = (params) => {
  return request.post({
    url: "/api/event/group/order/check",
    data: params,
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

// 获取活动文字描述
export const getActiveDesc = () => {
  return request.post({
    url: "/api/demo",
  });
};

// 获取福利二奖品配置
export const getPrizeConfig = () => {
  return request.post({
    url: "/api/event/group/draw/config",
  });
};

// 领取奖品
export const getPrizeToUser = (params) => {
  return request.post({
    url: "/api/event/group/doReward",
    data: params,
  });
};
