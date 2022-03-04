/*
 * @Author: korealu
 * @Date: 2022-03-04 09:25:35
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-04 09:31:38
 * @Description: 封装支付宝微信支付
 * @FilePath: /h5-active-v2/src/utils/pay-config.js
 */
import { errorInfo, _isWechatPay } from "@/utils";
import urlencode from "urlencode";
import { wechatPay, ailPay } from "@/api";
function _isWechat() {
  return navigator.userAgent.match(/micromessenger/i);
}
export function wechatPayAction(data) {
  wechatPay(data)
    .then((res) => {
      if (res.code === 200) {
        if (_isWechat()) {
          _isWechatPay(res.data.wxRes)
            .then((res) => {
              console.log(res, "测试");
            })
            .catch((err) => {
              console.log(err, "错误");
            });
        } else {
          let backUrl = window.location.href;
          window.location.href = `${
            res.data.wxRes.mweburl
          }&redirect_url=${urlencode(backUrl)}`;
        }
      } else errorInfo(res.msg);
    })
    .catch((err) => {
      console.log(err);
    });
}
export function aliPayAction(data) {
  ailPay(data)
    .then((res) => {
      if (res.code === 200) {
        window.location.href = res.data.aliRes;
      } else errorInfo(res.msg);
    })
    .catch((err) => {
      console.log(err);
    });
}
