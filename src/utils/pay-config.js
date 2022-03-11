/*
 * @Author: korealu
 * @Date: 2022-03-04 09:25:35
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-11 12:01:05
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
  return new Promise((resolve, reject) => {
    wechatPay(data)
      .then((res) => {
        if (res.code === 200) {
          if (_isWechat()) {
            _isWechatPay(res.data.wxRes)
              .then((res) => {
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            let backUrl = `${window.location.href}?state=success`;
            window.location.href = `${
              res.data.wxRes.mweburl
            }&redirect_url=${urlencode(backUrl)}`;
          }
        } else errorInfo(res.msg);
      })
      .catch((err) => {
        console.log(err);
      });
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
