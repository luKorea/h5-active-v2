<!--
 * @Author: korealu
 * @Date: 2022-03-01 17:36:50
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-08 14:15:05
 * @Description: 该页面作为pose推荐页以及人偶推荐页，
    根据登录后判断参数type，来决定显示pose库还是人偶库
 * @FilePath: /h5-active-v2/src/views/anniversary/pose-recommend/index.vue
-->
<template>
  <div class="pose-recommend">
    <!-- 头部区域 -->
    <div class="pose-img">
      <img :src="bgImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <info-fixed :userInfo="userInfo"></info-fixed>
    <count-down></count-down>
    <!-- 这是是不同type显示不用组件区域 -->
    <pose-component
      :userInfo="userInfo"
      :poseData="poseData"
      :resetTime="resetTime"
      @openPayModal="handleChangePayModal"
      v-if="showDifferentComponents == 'A1'"
    ></pose-component>
    <even-component
      :userInfo="userInfo"
      :evenData="evenData"
      @openPayModal="handleChangePayModal"
      v-if="showDifferentComponents == 'A2'"
    ></even-component>
    <!-- 优惠区域 -->
    <pose-discount></pose-discount>
    <!-- 第三方链接 -->
    <send-link></send-link>
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
import PoseDiscount from "../common/discount";
import SendLink from "../common/part";
import PayComponent from "@/components/pay";

import PoseComponent from "./components/pose";
import EvenComponent from "./components/even";
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";

import {
  bugOnePrice,
  getPoseAndEvenList,
  getUserAccount,
} from "@/api/anniversary";
import { errorInfo } from "@/utils";
import localCache from "@/utils/cache";
import urlLink from "@/utils/link";
import { aliPayAction, wechatPayAction } from "@/utils/pay-config";
import { Dialog } from "vant";
export default {
  name: "poseRecommend",
  components: {
    AnniversaryFooter,
    PoseDiscount,
    PayComponent,
    SendLink,
    InfoFixed,
    CountDown,
    PoseComponent,
    EvenComponent,
  },
  // computed: {
  //   userInfo() {
  //     return this.$store.state.anniversaryModule.userInfo;
  //   },
  // },
  created() {
    if (this.$store.state.anniversaryModule.token === null) {
      this.$router.push({
        path: "/Ann2022",
      });
    }
    console.log(this.$store);
  },
  mounted() {
    document.title = "POFI 周年庆典";
    const store = this.$store.state.anniversaryModule;
    this.getPoseAndEvenData({
      uid: store.uid,
      loginKey: store.token,
    });
    this.getAccount({
      uid: store.uid,
      loginKey: store.token,
    });
    // if (!localCache.getCache("userAccount") && store.token) {
    //   this.getAccount({
    //     uid: store.uid,
    //     loginKey: store.token,
    //   });
    // } else {
    //   this.userInfo = {
    //     ...this.$store.state.anniversaryModule.userInfo,
    //     ...localCache.getCache("userAccount"),
    //   };
    // }
    const type = localCache.getCache("checkPage");
    this.showDifferentComponents = type;
    if (
      this.$route.query.state === "success" &&
      localCache.getCache("selectInfo")
    ) {
      const data = localCache.getCache("selectInfo");
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
      // this.getAccount({
      //   uid: store.uid,
      //   loginKey: store.token,
      // });
    }
  },
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
      this.selectShopInfo = info;
      localCache.setCache("selectInfo", info);
      this.$refs["payRef"].showDialog = true;
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
    },
    _isWechat() {
      return navigator.userAgent.match(/micromessenger/i);
    },
    payWechat() {
      let data = {
        snId: this.payInfo.id,
        chargeType: 0,
        uid: this.$store.state.anniversaryModule.uid,
        loginKey: this.$store.state.anniversaryModule.token,
        appid: this._isWechat() ? urlLink.wechatAPPID : null,
        from: this._isWechat() ? 3 : 2,
        remark: JSON.stringify({
          type: "7",
          eid: this.payInfo.id,
          inviteCode: null,
        }),
        returnUrl: `${window.location.href}?state=success`,
        // openId: this._isWechat() ? localStorage.getItem("openId") : null,
      };
      console.log(data, "data");
      wechatPayAction(data);
    },
    payAli() {
      let data = {
        snId: this.payInfo.id,
        chargeType: 1,
        uid: this.$store.state.anniversaryModule.uid,
        loginKey: this.$store.state.anniversaryModule.token,
        from: 2,
        remark: JSON.stringify({
          type: 8,
        }),
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
