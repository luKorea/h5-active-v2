<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-06 10:38:33
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-06 11:00:49
 * @FilePath: /h5-active-v2/src/views/summerVacation/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="summary-container">
    <!-- 头部区域 -->
    <div class="banner-header">
      <img :src="headerImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <!-- 头部区域 -->
    <count-down :curStartTime="endTime"></count-down>
    <!-- 侧边栏 -->
    <info-fixed
      :userInfo="userInfo"
      @handleLoginDialog="showLoginDialog = true"
      @handleLogout="showLogoutDialog = true"
    ></info-fixed>
    <!--登录注册页面-->
    <login-and-register
      :show-dialog="showLoginDialog"
      @closeDialog="closeDialog"
      @handleLogin="phoneLogin"
    >
    </login-and-register>
    <!--退出弹框-->
    <logout
      :show-dialog="showLogoutDialog"
      @logout="logout"
      @closeDialog="closeDialog"
      title="退出登录"
    />
    <!-- 支付弹框 -->
    <pay-component
      ref="payRef"
      @payWechat="payWechat"
      @payAli="payAli"
      @payMoney="payMoney"
      :payInfo="payInfo"
      :userInfo="userInfo"
    ></pay-component>
    <!-- 支付成功弹框 -->
    <pay-success-component
      ref="successRef"
      @openPage="handleChangeDifferentPage"
      title="充值已到账，请打开APP刷新查看"
    ></pay-success-component>
  </div>
</template>

<script>
import logout from "../login-and-register/logout.vue";
import loginAndRegister from "../login-and-register/login-and-register.vue";

import PayComponent from "@/components/pay";
import PaySuccessComponent from "@/components/pay-success";

import infoFixed from "./common/fixed";
import CountDown from "./common/count-down";

import localCache from "@/utils/cache";
import { getCode } from "@/utils/getCode";
import { errorInfo, successInfo, reduceEndTime } from "@/utils";
import { wechatPayAction, aliPayAction } from "@/utils/pay-config";
import urlLink from "@/utils/link";
import { mapState } from "vuex";
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";

export default {
  name: "summaryContainer",
  components: {
    infoFixed,
    CountDown,
    logout,
    loginAndRegister,
    PayComponent,
    PaySuccessComponent,
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.summaryModule.userInfo,
      token: (state) => state.summaryModule.token,
      uid: (state) => state.summaryModule.uid,
    }),
  },
  data() {
    return {
      headerImg: BASE_IMAGE_SUMMARY_URL + "/home-header.png",
      endTime: new Date("2022/07/31 23:59:59").getTime() / 1000,
      showLoginDialog: false,
      showLogoutDialog: false,
      payInfo: {
        title: "充值128P币送米诺",
        id: "MDRCG12800",
      },
      activeIsState: false,
    };
  },
  mounted() {
    this.activeIsState = reduceEndTime(this.endTime);
    // 判断当前是否在微信内
    if (this._isWechat()) {
      if (localCache.getCache("openId") == null) {
        getCode("wx4e33f34be6700e46", this.$route.query.code);
        return;
      }
    }
  },
  methods: {
    phoneLogin(data) {
      const _this = this;
      let tel = "" + data.no;
      const phoneStr = tel.substr(0, 3) + "****" + tel.substr(7);
      localCache.setCache("phoneStr", phoneStr);
      this.$store
        .dispatch("activeModule/loginAction", data)
        .then(() => {
          successInfo("登录成功");
          _this.showLoginDialog = false;
          this.$router.go(0);
        })
        .catch((err) => errorInfo(err));
    },
    logout() {
      this.$store.dispatch("activeModule/logoutAction").then(() => {
        // this.$router.replace("/active");
        this.$router.go(0);
      });
    },
    closeDialog() {
      this.showLoginDialog = false;
      this.showLogoutDialog = false;
    },
    handleChangePayModal(info) {
      this.payInfo = info;
      if (!this.token) {
        this.showLoginDialog = true;
      } else {
        this.checkHasEven()
          .then(() => {
            this.$refs["payRef"].showDialog = true;
          })
          .catch((err) => errorInfo(err));
      }
    },
    _isWechat() {
      return navigator.userAgent.match(/micromessenger/i);
    },
    // 微信支付
    payWechat() {
      let data = {
        snId: this.payInfo.id,
        chargeType: 0,
        uid: this.uid,
        loginKey: this.token,
        appid: this._isWechat() ? urlLink.wechatAPPID : null,
        from: this._isWechat() ? 3 : 2,
        // remark: JSON.stringify({
        //   type: 8,
        // }),
        remark: "",
        returnUrl: `${window.location.href}?state=success`,
        openId: this._isWechat() ? localCache.getCache("openId") : null,
      };
      console.log(data, "wechat");
      wechatPayAction(data)
        .then(() => {
          this.$refs["payRef"].showDialog = false;
          this.openSuccessDialog();
        })
        .catch((err) => errorInfo(err));
    },
    // 支付宝支付
    payAli() {
      let data = {
        snId: this.payInfo.id,
        chargeType: 1,
        uid: this.uid,
        loginKey: this.token,
        from: 2,
        // remark: JSON.stringify({
        //   type: 8,
        // }),
        remark: "",
        appid: urlLink.alipayAPPID,
        returnUrl: `${window.location.href}?state=success`,
      };
      console.log(data, "ali");
      aliPayAction(data);
    },
  },
};
</script>

<style lang="less" scoped></style>
