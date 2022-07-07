/*
 * @Author: korealu
 * @Date: 2022-01-18 14:46:55
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-07 14:39:21
 * @Description: file content
 * @FilePath: /h5-active-v2/src/utils/getCode.js
 */
import { getUserOpenId } from "@/api";
import { errorInfo } from "@/utils";
import localCache from "@/utils/cache";

export function getCode(appid, code) {
  // "http://event.pofi.pro" ??
  // let local = "http://event.pofi.pro";
  // let local = window.location.origin + window.location.pathname; //当前地址
  let local = window.location.href; //当前地址
  console.log(code, "微信授权code", "链接", local);
  //没有授权的code
  if (code == null || code === "") {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
      local
    )}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`; //跳转授权链接
    // eslint-disable-next-line no-undef
    scope = snsapi_base; //这句是静默授权的意思
  } else {
    console.log(code, "获取到的code");
    //获取到授权的code
    getUserOpenId({
      code: code,
      type: 1,
    }).then((res) => {
      if (res.code === 200) {
        console.log(res.data.openId, "用户openID");
        localCache.setCache("openId", res.data.openId);
      } else errorInfo(res.data.msg);
    });
  }
}
