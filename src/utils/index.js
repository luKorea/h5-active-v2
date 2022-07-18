/*
 * @Author: korealu
 * @Date: 2022-01-18 14:46:55
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-18 16:00:50
 * @Description: file content
 * @FilePath: /h5-active-v2/src/utils/index.js
 */
import { Toast } from "vant";
import dayjs from "dayjs";
import urlLink from "./link";

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

export function openAppUrl(url) {
  function failed() {
    window.location.href = urlLink.appLink;
  }

  function transfer(cb) {
    window.location.href = url;
    const initialTime = new Date();
    let counter = 0;
    let waitTime = 0;
    const checkOpen = setInterval(() => {
      counter++;
      waitTime = new Date() - initialTime;
      if (waitTime > 3500) {
        clearInterval(checkOpen);
        cb();
      }
      if (counter < 1000) {
        return;
      }
    }, 20);

    document.addEventListener("visibilitychange", () => {
      const isHidden = document.hidden;
      if (isHidden) {
        clearInterval(checkOpen);
      }
    });
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      window.addEventListener("pagehide", function () {
        clearInterval(checkOpen);
      });
    }
  }
  transfer(failed);
}

export function openApp(url) {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    let loadDateTime = new Date();
    window.setTimeout(function () {
      let timeOutDateTime = new Date();
      if (timeOutDateTime - loadDateTime < 5000) {
        // 跳转至app下载页 以微信为例
        window.location = urlLink.appLink;
      } else {
        window.close();
      }
    }, 25);
    // 打开本地的app 以微信为例
    window.location = url;
  } else if (navigator.userAgent.match(/android/i)) {
    let loadDateTime = new Date();
    window.setTimeout(function () {
      let timeOutDateTime = new Date();
      if (timeOutDateTime - loadDateTime < 5000) {
        // 跳转至app下载页
        window.location = urlLink.appLink;
      } else {
        window.close();
      }
    }, 25);
    // 打开本地的app
    window.location = url;
  }
}

export const reduceEndTime = (endTime) => {
  let result = false;
  const end = reduceTime(endTime); // 活动结束
  if (end === 1) {
    result = true;
  }
  return result;
};

// 随机生成假数据
export function random(min, untilMax) {
  if (min === untilMax) {
    return min;
  } else {
    return Math.floor(Math.random() * (untilMax - min)) + min;
  }
}
const defaultGiftList = [
  "实体人偶奖",
  "专业版Pro奖",
  "限定人偶大礼包",
  "BJD大Q",
  "BJD薇薇安",
  "莉莉丝",
  "BJD小Q",
];
export function generatorDrawList(
  giftList = defaultGiftList,
  startTime = 7,
  endTime = 31
) {
  let numRank = [
    "135",
    "136",
    "137",
    "138",
    "139",
    "147",
    "148",
    "150",
    "151",
    "152",
    "157",
    "158",
    "159",
    "178",
    "182",
    "183",
    "184",
    "187",
    "188",
    "198",
    "130",
    "131",
    "132",
    "155",
    "156",
    "185",
    "186",
    "145",
    "146",
    "166",
    "167",
    "175",
    "176",
    "170",
    "171",
    "133",
    "153",
    "177",
    "180",
    "181",
    "189",
    "191",
    "199",
  ];
  let temp = [];
  let date = new Date();
  let year = date.getFullYear();
  let mon = date.getMonth() + 1;
  let day = date.getUTCDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let c = 0;
  let dM = 0;
  if (mon === 1 || mon === startTime) {
    if (mon === startTime && day > endTime) {
      return;
    }
    giftList.forEach(function (item) {
      let obj = {};
      let mM = m;
      if (c > s) {
        dM++;
        c = random(30, 65) * -1;
      }
      c++;
      if (m - dM < 0) {
        mM = 59 + (m - dM);
      } else {
        mM = m - dM;
      }
      obj["time"] =
        year +
        "/" +
        mon +
        "/" +
        day +
        "/" +
        h +
        ":" +
        (new RegExp(/^\d$/g).test(mM.toString()) ? `0${mM}` : mM);
      obj["obj"] = item;
      obj["number"] =
        numRank[random(0, numRank.length)] + "****" + random(1000, 10000);
      temp[temp.length] = obj;
    });
  }
  return {
    initialIndex: random(0, temp.length),
    list: temp,
  };
}

export const clearRouterQuery = (params) => {
  if (Object.keys(params.$route.query).length > 0) {
    let path = params.$route.path; //先获取路由路径
    params.$router.push(path); //再跳转路由路径，query参数没带过去，所以被清除了
  }
};
