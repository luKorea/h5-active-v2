// 这个文件用来存放抽奖逻辑
import { request } from "@/request";

// 刷新抽奖次数
export const refreshCount = (params) => {
  return request.post({
    url: "/api/doll/draw/playNum",
    params,
  });
};

// 开始抽奖
export const startLottery = (params) => {
  return request.post({
    url: "/api/doll/draw/play",
    params,
  });
};

// 获取我的奖品
export const getPriceInfo = (params) => {
  return request.post({
    url: "/api/doll/draw/getRewardRecords",
    params,
  });
};
