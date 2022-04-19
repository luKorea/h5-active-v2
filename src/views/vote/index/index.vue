<!--
 * @Author: korealu
 * @Date: 2022-03-01 17:36:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-19 16:58:13
 * @Description: 分五个页面， 一个头部轮播图。一个购买页面，一个三选一投票页面，一个选五投票，一个商品页面
 * @FilePath: /h5-active-v2/src/views/anniversary/pose-recommend/index.vue
-->
<template>
  <div class="pose-recommend">
    <info-fixed :userInfo="userInfo"></info-fixed>
    <div style="width: 100%; height: 300px"><count-down></count-down></div>
    <anniversary-footer></anniversary-footer>
    <!-- 支付弹框 -->
    <pay-component
      ref="payRef"
      @payWechat="payWechat"
      @payAli="payAli"
      :payInfo="payInfo"
      :userInfo="userInfo"
    ></pay-component>
  </div>
</template>

<script>
import AnniversaryFooter from "../footer";
import InfoFixed from "../common/info";
import CountDown from "../common/count-down";
import PayComponent from "@/components/pay";

import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";

import {
  bugOnePrice,
  checkUserBug,
  getPoseAndEvenList,
  getUserAccount,
} from "@/api/anniversary";
import { errorInfo, successInfo } from "@/utils";
import localCache from "@/utils/cache";
import urlLink from "@/utils/link";
import { aliPayAction, wechatPayAction } from "@/utils/pay-config";
import { Dialog } from "vant";

export default {
  name: "poseRecommend",
  components: {
    AnniversaryFooter,
    PayComponent,
    InfoFixed,
    CountDown,
  },
  mounted() {},
  data() {
    return {
      payInfo: {},
      bgImg: BASE_IMAGE_ANNIVERSARY_URL + "/bg.png",
      showDifferentComponents: "A1", // A1. pose 2. even
      poseData: [],
      evenData: [],
      selectShopInfo: {},
      userInfo: {},
      resetTime: null,
    };
  },
  methods: {
    getAccount(data) {
      getUserAccount(data).then((res) => {
        if (res.code === 200) {
          res?.data?.vips.forEach((item) => {
            if (item.func === "pro") {
              this.resetTime = item.endAt;
            }
          });
          this.userInfo = {
            ...this.$store.state.anniversaryModule.userInfo,
            ...res.data,
          };
          localCache.setCache("userAccount", res.data);
        }
      });
    },
    getPoseAndEvenData(data) {
      getPoseAndEvenList(data).then((res) => {
        if (res.code === 200) {
          this.poseData = res.data;
          this.evenData = res.data;
        } else errorInfo(res.msg);
      });
    },
    bugShopping(data) {
      bugOnePrice(data).then((res) => {
        localCache.cleanCache("selectInfo");
        if (res.code === 200) {
          Dialog.alert({
            title: "兑换成功",
            message: "充值的P币已到账，人偶兑换成功",
          }).then(() => {
            this.$router.replace("/ordinaryRecommend");
          });
        } else {
          Dialog.alert({
            title: "兑换失败",
            message: res.msg,
          });
        }
      });
    },
    handleChangePayModal(type, info) {
      if (!info.snId) errorInfo("请先选择pose库");
      else {
        this.selectShopInfo = info;
        localCache.setCache("selectInfo", info);
        switch (type) {
          case "pro":
            this.payInfo = {
              title: "充值专业版",
              id: "AFUNC_PRO_455D_A",
            };
            break;
          case "six":
            this.payInfo = {
              title: "充值6P币",
              id: "ARCG600",
            };
            break;
          case "svip":
            this.payInfo = {
              title: "充值SVIP",
              id: "AFUNC_SVIP_455D",
            };
            break;
        }
        const store = this.$store.state.anniversaryModule;
        const data = {
          uid: store.uid,
          loginKey: store.token,
          snId: this.payInfo.id,
        };
        this.checkUserBugInfo(data)
          .then(() => {
            this.$refs["payRef"].showDialog = true;
          })
          .catch((err) => errorInfo(err));
      }
    },
    _isWechat() {
      return navigator.userAgent.match(/micromessenger/i);
    },
    checkUserBugInfo(data) {
      return new Promise((resolve, reject) => {
        checkUserBug(data).then((res) => {
          if (res.state) {
            resolve();
          } else reject(res.msg);
        });
      });
    },
    payWechat() {
      let data = {
        snId: this.payInfo.id,
        chargeType: 0,
        uid: this.$store.state.anniversaryModule.uid,
        loginKey: this.$store.state.anniversaryModule.token,
        appid: this._isWechat() ? urlLink.wechatAPPID : null,
        from: this._isWechat() ? 3 : 2,
        // remark: JSON.stringify({
        //   type: 8,
        // }),
        remark: "",
        returnUrl: `${window.location.href}?state=success`,
        openId: this._isWechat() ? localCache.getCache("openId") : null,
      };
      console.log(data, "data");
      wechatPayAction(data)
        .then(() => {
          successInfo("充值成功");
          this.$refs["payRef"].showDialog = false;
          const data = localCache.getCache("selectInfo");
          const store = this.$store.state.anniversaryModule;
          const list = [];
          list.push({
            tid: data.moid,
            snId: data.snId,
            amount: 1,
            paymentType: 1,
          });
          console.log(list, "data");
          this.bugShopping({
            uid: store.uid,
            loginKey: store.token,
            cart: JSON.stringify(list),
          });
        })
        .catch((err) => errorInfo(err));
    },
    payAli() {
      let data = {
        snId: this.payInfo.id,
        chargeType: 1,
        uid: this.$store.state.anniversaryModule.uid,
        loginKey: this.$store.state.anniversaryModule.token,
        from: 2,
        // remark: JSON.stringify({
        //   type: 8,
        // }),
        remark: "",
        appid: urlLink.alipayAPPID,
        returnUrl: `${window.location.href}?state=success`,
      };
      console.log(data, "data");
      aliPayAction(data);
    },
  },
};
</script>

<style>
.content-wrap {
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  margin: 18px;
}
</style>
<style lang="less" scoped>
.pose-recommend {
  display: flex;
  flex-direction: column;
  background-color: #b0dbbf;
  width: 100%;
  .pose-img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
