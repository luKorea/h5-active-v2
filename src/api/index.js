/*
 * @Author: your name
 * @Date: 2022-01-18 14:46:55
 * @LastEditTime: 2022-01-20 16:29:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/api/index.js
 */
import { request } from "@/request";

// 用户登录
export const userLogin = (params) => {
  return request.post({
    url: `/api/doll/user/phone/login`,
    params: params,
  });
};

// 获取组队活动配置
export const getGroupConfig = () => {
  return request.post({
    url: "/api/event/group/config",
  });
};
// 用户抽奖记录
export const getUserPrize = (params) => {
  return request.post({
    url: "/api/event/group/getRewardRecords",
    params: params,
  });
};

// 微信支付
export const wechatPay = (params) => {
  return request.post({
    url: "/api/charge/orderWechat",
    params: params,
  });
};
// 支付宝支付
export const ailPay = (params) => {
  return request.post({
    url: "/api/charge/orderAlipay",
    params: params,
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
    params: params,
  });
};
