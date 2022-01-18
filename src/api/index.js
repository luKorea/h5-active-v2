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
