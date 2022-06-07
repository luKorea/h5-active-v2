<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 10:50:55
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-07 11:54:32
 * @FilePath: /h5-active-v2/src/views/active/index/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="active-page">
    <info-fixed
      :userInfo="userInfo"
      @handleLoginDialog="showLoginDialog = true"
      @handleLogout="showLogoutDialog = true"
      @openPage="handleChangeDifferentPage"
      :selectPage="selectPage"
    ></info-fixed>
    <!-- 首页 -->
    <active-home-page
      v-if="selectPage === 1"
      @openPage="handleChangeDifferentPage"
    ></active-home-page>
    <template>
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
        :endTime="endTime"
      ></active-recharge-discounts-page>
      <!-- 限定人偶 -->
      <active-doll-gain-page
        v-if="selectPage === 4"
        @handleLoginDialog="showLoginDialog = true"
        @handlePayDialog="handleChangePayModal"
        :otherInfo="otherInfo"
        @openPage="handleChangeDifferentPage"
        @getConfig="checkLinkIsInviter"
        :endTime="endTime"
        :startTime="startTime"
      ></active-doll-gain-page>
    </template>
    <!-- 以下页面为公用页面 -->
    <active-footer :showRules="selectPage === 1"></active-footer>
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
      title="充值已到账，请打开APP刷新查看"
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
    <!-- 实体人偶 -->
    <van-dialog v-model="showEvenDialog" :show-cancel-button="false">
      <div class="dialog-img">
        <img :src="qrCode" referrerpolicy="no-referrer" />
      </div>
    </van-dialog>
    <van-dialog v-model="showWechatDialog" :show-cancel-button="false">
      <div class="dialog-img">
        <img :src="wechat" referrerpolicy="no-referrer" />
      </div>
    </van-dialog>
    <!-- <back-top></back-top> -->
  </div>
</template>

<script>
import activeHomePage from "../home/home.vue";
import activeFunctionPage from "../functionSubscription/index.vue";
import activeRechargeDiscountsPage from "../rechargeDiscounts/index.vue";
import activeDollGainPage from "../dollGain/index.vue";

import PayComponent from "@/components/pay";
// import BackTop from "@/components/back-top/index.vue";
import infoFixed from "../common/fixed";
import logout from "../../login-and-register/logout.vue";
import loginAndRegister from "../../login-and-register/login-and-register.vue";

import ActiveFooter from "../footer";
import PaySuccessComponent from "@/components/pay-success";
import localCache from "@/utils/cache";
import { getCode } from "@/utils/getCode";
import { successInfo, errorInfo, clearRouterQuery } from "@/utils";
import urlLink from "@/utils/link";
import { mapState } from "vuex";
// import { reduceTime } from "@/utils";

import {
  wechatPayAction,
  aliPayAction,
  moneyPayAction,
} from "@/utils/pay-config";
import { getActivePageConfig } from "@/api/active";
// import { Dialog } from "vant";
import { checkUserHasEvent } from "@/api/common";
export default {
  name: "activePageComponent",
  components: {
    activeHomePage,
    activeFunctionPage,
    activeRechargeDiscountsPage,
    activeDollGainPage,
    loginAndRegister,
    logout,
    PaySuccessComponent,
    PayComponent,
    infoFixed,
    ActiveFooter,
    // BackTop,
  },
  mounted() {
    if (sessionStorage.getItem("selectPage")) {
      this.selectPage = +sessionStorage.getItem("selectPage");
    } else this.selectPage = 1;
    // ；判断当前页面是否是
    const { inviteCode, pageCode } = this.$route.query;
    console.log(inviteCode);
    if (pageCode && +pageCode === 4) {
      sessionStorage.setItem("selectPage", 4);
      this.selectPage = 4;
    }
    // TODO 获取地址栏是否带有state参数，带有参数展示支付成功弹
    const state = this.$route.query.state;
    if (state && state === "success") {
      this.$nextTick(() => {
        this.openSuccessDialog();
      });
    }
    // 判断当前是否在微信内
    if (this._isWechat()) {
      if (localCache.getCache("openId") == null) {
        getCode("wx4e33f34be6700e46", this.$route.query.code);
        return;
      }
    }
    if (this.uid && this.token) {
      this.$store.dispatch("activeModule/getUserInfo", this.userInfo);
    }
    this.checkLinkIsInviter();
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
      window.location.reload();
    },
  },
  data() {
    return {
      showLoading: false,
      startTime: 1655395199,
      endTime: 1655654399,
      showEvenDialog: false,
      showWechatDialog: false,
      qrCode: require("@/assets/image/qrcode-drawer.jpeg"),
      wechat: require("@/assets/wechat-banner.png"),
      selectPage: 4, // 1. 首页 2. 功能订阅 3. P币充值 4. 限定人偶
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
    // 校验当前链接是邀请人链接还是被邀请人链接
    checkLinkIsInviter() {
      getActivePageConfig({
        inviteCode: this.$route.query.inviteCode ?? undefined,
        uid: this.uid ?? undefined,
        loginKey: this.token ?? undefined,
      }).then((res) => {
        if (res.code === 200) {
          this.otherInfo = res.data;
        } else errorInfo(res.msg);
      });
    },
    // 打开不同页面
    handleChangeDifferentPage(index) {
      if (index) {
        if (index === 5) {
          this.showEvenDialog = true;
        } else if (index === 6) {
          this.showWechatDialog = true;
        } else {
          this.mapDialog(index);
          // if (index === 3 || index === 4) {
          //   const start = reduceTime(this.startTime); // 活动开始
          //   const end = reduceTime(this.endTime); // 活动结束
          //   if (start === 2) {
          //     Dialog.alert({
          //       message: "该活动将于6月17日开始，敬请期待！",
          //     });
          //   } else if (end === 1) {
          //     Dialog.alert({
          //       message: "活动已结束",
          //     });
          //   } else {
          //     this.mapDialog(index);
          //   }
          // } else {
          //   this.mapDialog(index);
          // }
        }
      }
    },
    mapDialog(index) {
      sessionStorage.setItem("selectPage", index);
      this.selectPage = index;
      window.scrollTo(0, 0);
      this.showEvenDialog = false;
      if (index === 4 && this.$route.query.pageCode) {
        clearRouterQuery(this);
      }
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
    checkHasEven() {
      return new Promise((resolve, reject) => {
        checkUserHasEvent({
          uid: this.uid,
          snId: this.payInfo.id,
          loginKey: this.token,
        }).then((res) => {
          if (res.code === 200 && res.state) {
            resolve();
          } else if (res.code === 200 && res.state === false) {
            reject("您已经拥有该套餐，无需再购买");
          } else reject(res.msg);
        });
      });
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
        uid: this.uid,
        loginKey: this.token,
        cart: JSON.stringify({
          snId: this.payInfo.id,
          tid: this.payInfo.tid ? this.payInfo.tid : undefined,
          paymentType: 1,
          amount: 1,
        }),
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
  background-color: #fff;
  width: 100%;
  min-height: 100%;
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
