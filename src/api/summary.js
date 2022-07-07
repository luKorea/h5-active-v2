import { request } from "@/request";
// 获取用户账号状态
export function getUserAccount(data) {
  return request.post({
    url: "/api/trade/getAccount",
    data: data,
    showLoading: false,
  });
}
// 获取页面配置
export function checkPageConfig(data) {
  return request.post({
    url: "/api/event/summer2022/config",
    data: data,
    showLoading: true,
  });
}
// 支付前校验是否已经拥有
export const checkUserHasEvent = (params) => {
  return request.post({
    url: "/api/event/summer2022/checkTrade",
    params: params,
  });
};

// Pose库随机展示
export const randomPose = (params) => {
  return request.post({
    url: "/api/event/summer2022/randomList",
    params: params,
  });
};

// 领取9PB
export const getAward = (params) => {
  return request.post({
    url: "/api/event/summer2022/receive",
    params: params,
  });
};
