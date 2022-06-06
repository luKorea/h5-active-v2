/*
 * @Author: korealu
 * @Date: 2022-01-18 14:46:55
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-06 10:29:56
 * @Description: file content
 * @FilePath: /h5-active-v2/src/utils/index.js
 */
import { Toast } from "vant";
import dayjs from "dayjs";

export const reduceTime = (endTime) => {
  const nowTime = (dayjs().valueOf() / 1000).toFixed(0);
  console.log(nowTime, endTime);
  let result = 0; // 0. 活动时间内 1 已过期 2. 时间未到
  if (nowTime > endTime) {
    result = 1;
  } else if (nowTime < endTime) {
    result = 2;
  } else result = 0;
  return result;
};

export const openUrl = (url, blank = "_self") => {
  window.open(url, blank);
};

export const successInfo = (message) =>
  Toast({
    message,
    type: "success",
    duration: 1000,
  });

export const errorInfo = (message) => Toast(message);

export const goAnchor = (el, instance) => {
  instance.$el.querySelector(el).scrollIntoView();
};

export const copyShareLink = (
  url,
  app,
  message = "已复制链接，快分享给好友，组队赢好礼吧！"
) => {
  app
    .$copyText(url)
    .then(() => {
      Toast(message);
    })
    .catch(() => {
      Toast("复制失败");
    });
};

export function onBridgeReady(data) {
  const nonceStr = RandomId(16);
  const result = {
    sign: data.sign,
    prepayid: data.prepayid,
    partnerid: data.partnerid,
    paySign: data.sign,
    appId: data.appid,
    nonceStr: data.noncestr,
    timeStamp: data.timestamp,
    package: "prepay_id=" + data.prepayid,
    signType: "MD5",
    // jsApiList: ["chooseWXPay"],
  };
  console.log(data, "后台返回的参数");
  console.log(nonceStr, "随机数");
  console.log(result, "调起微信支付的参数");
  return new Promise((resolve, reject) => {
    window.WeixinJSBridge.invoke(
      // getBrandWCPayRequest
      "getBrandWCPayRequest",
      result,
      function (res) {
        if (res.err_msg === "get_brand_wcpay_request:ok") {
          resolve("success");
        } else if (res.err_msg === "get_brand_wcpay_request:fail") {
          reject(res.err_msg);
        } else {
          reject(res.err_msg);
        }
      }
    );
  });
}

export const _isWechatPay = (data) => {
  return new Promise((resolve, reject) => {
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener(
          "WeixinJSBridgeReady",
          onBridgeReady(data)
            .then((res) => resolve(res))
            .catch((err) => reject(err)),
          false
        );
      } else if (document.attachEvent) {
        document.attachEvent(
          "WeixinJSBridgeReady",
          onBridgeReady(data)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        );
        document.attachEvent(
          "onWeixinJSBridgeReady",
          onBridgeReady(data)
            .then((res) => resolve(res))
            .catch((err) => reject(err))
        );
      }
    } else {
      onBridgeReady(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    }
  });
};

export const RandomId = (n) => {
  var str = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += str[id];
  }
  return res;
};

export const clearRouterQuery = (queryParams) => {
  let path = queryParams.$route.path;
  queryParams.$router.push(path);
};
