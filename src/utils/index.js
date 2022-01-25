import { Toast } from "vant";

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

export const copyShareLink = (url, app) => {
  app
    .$copyText(url)
    .then(() => {
      Toast("已复制链接，快分享给好友，组队赢好礼吧！");
    })
    .catch(() => {
      Toast("复制失败");
    });
};

export function onBridgeReady(data) {
  return new Promise((resolve, reject) => {
    //挂在window注意
    const result = {
      ...data,
      paySign: data.sign,
      appId: data.appid,
      nonceStr: data.noncestr,
      timeStamp: data.timestamp,
      package: "prepay_id=" + data.prepayid,
      signType: "MD5",
      // jsApiList: ["chooseWXPay"],
    };
    window.WeixinJSBridge.invoke(
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
