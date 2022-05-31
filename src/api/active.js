import { request } from "@/request";
// 获取用户账号状态
export function getUserAccount(data) {
  return request.post({
    url: "/api/trade/getAccount",
    data: data,
    showLoading: false,
  });
}
// 获取页面配置，判断是否拥有邀请码，确认是自己页面还是邀请页面
export const getActivePageConfig = (params) => {
  return request.post({
    url: "/api/event/mid22/config",
    data: params,
  });
};
// 邀请好友 /api/event/mid22/invite
// data: uid
export const inviteUser = (data) => {
  return request.post({
    url: "/api/event/mid22/invite",
    data: data,
  });
};
// 给好友点赞  /api/event/mid22/like 需要传邀请码，被邀请者给邀请者点赞
//  传uid和inviteCode
export const likeUser = (data) => {
  return request.post({
    url: "/api/event/mid22/invite",
    data: data,
  });
};
