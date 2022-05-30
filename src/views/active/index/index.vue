<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 10:50:55
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-30 11:50:12
 * @FilePath: /h5-active-v2/src/views/active/index/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="active-page">
    <info-fixed
      :userInfo="userInfo"
      @handleLoginDialog="showLoginDialog = true"
      @handleLogout="showLogoutDialog = true"
      :selectPage="selectPage"
    ></info-fixed>
    <!-- 首页 -->
    <active-home-page
      v-if="selectPage === 1"
      @openPage="handleChangeDifferentPage"
    ></active-home-page>
    <!-- 功能订阅 -->
    <active-function-page
      v-if="selectPage === 2"
      @handleLoginDialog="showLoginDialog = true"
      @handlePayDialog="handleChangePayModal"
      :otherInfo="otherInfo"
      @openPage="handleChangeDifferentPage"
    ></active-function-page>
    <!-- P币购买 -->
    <active-recharge-discounts-page
      v-if="selectPage === 3"
      @handleLoginDialog="showLoginDialog = true"
      @handlePayDialog="handleChangePayModal"
      :otherInfo="otherInfo"
      @openPage="handleChangeDifferentPage"
    ></active-recharge-discounts-page>
    <!-- 限定人偶 -->
    <active-doll-gain-page
      v-if="selectPage === 4"
      @handleLoginDialog="showLoginDialog = true"
      @handlePayDialog="handleChangePayModal"
      :otherInfo="otherInfo"
      @openPage="handleChangeDifferentPage"
    ></active-doll-gain-page>
    <!-- 以下页面为公用页面 -->
    <vote-footer></vote-footer>
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
      title="请直接打开 Pofi 无限人偶 APP，刷新人偶库即可拥有米诺。"
    ></pay-success-component>
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
  </div>
</template>

<script>
import activeHomePage from "../home/home.vue";
import activeFunctionPage from "../functionSubscription/index.vue";
import activeRechargeDiscountsPage from "../rechargeDiscounts/index.vue";
import activeDollGainPage from "../dollGain/index.vue";

import voteFooter from "../footer";
import infoFixed from "../common/fixed";
import loginAndRegister from "../../login-and-register/login-and-register.vue";
import logout from "../../login-and-register/logout.vue";
import localCache from "@/utils/cache";
import { getCode } from "@/utils/getCode";
import { successInfo, errorInfo } from "@/utils";
import urlLink from "@/utils/link";
import { mapState } from "vuex";
import {
  wechatPayAction,
  aliPayAction,
  moneyPayAction,
} from "@/utils/pay-config";
export default {
  name: "activePage",
  components: {
    activeHomePage,
    activeFunctionPage,
    activeRechargeDiscountsPage,
    activeDollGainPage,
    loginAndRegister,
    logout,
    infoFixed,
    voteFooter,
  },
  mounted() {
    if (this._isWechat()) {
      if (localCache.getCache("openId") == null) {
        getCode("wx4e33f34be6700e46", this.$route.query.code);
        return;
      }
    }
  },
  data() {
    return {
      selectPage: 1, // 1. 首页 2. 功能订阅 3. P币充值 4. 限定人偶
      payInfo: {
        title: "充值128P币送米诺",
        id: "MDRCG12800",
      },
      // bgImg: BASE_IMAGE_VOTE_URL + "/banner1.png",
      resetTime: null,
      showLoginDialog: false,
      showLogoutDialog: false,
      otherInfo: {},
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.activeModule.userInfo,
      token: (state) => state.activeModule.token,
      uid: (state) => state.activeModule.uid,
    }),
  },
  methods: {
    // 打开不同页面
    handleChangeDifferentPage(index) {
      this.selectPage = index;
    },
    openSuccessDialog() {
      this.$refs["successRef"].showDialog = true;
    },
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
          this.getUserOtherInfo();
          // window.location.reload();
        })
        .catch((err) => errorInfo(err));
    },
    logout() {
      this.$store.dispatch("activeModule/logoutAction").then(() => {
        this.$router.replace("/active");
        window.location.reload();
        this.getUserOtherInfo();
      });
    },
    closeDialog() {
      this.showLoginDialog = false;
      this.showLogoutDialog = false;
    },
    handleChangePayModal() {
      this.$refs["payRef"].showDialog = true;
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
    // 用户钱包支付
    payMoney() {
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
      moneyPayAction(data)
        .then((res) => {
          successInfo(res.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.content-wrap {
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  margin: 15px;
}
</style>
<style lang="less" scoped>
.active-page {
  display: flex;
  flex-direction: column;
  background-color: #b0dbbf;
  width: 100%;
  .pose-img {
    width: 100%;
    height: 100%;
    // margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
