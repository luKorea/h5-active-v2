<!--
 * @Author: korealu
 * @Date: 2022-03-01 17:36:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-24 18:23:21
 * @Description: 分五个页面， 一个头部轮播图。一个购买页面，一个三选一投票页面，一个商品页面
 * @FilePath: /h5-active-v2/src/views/anniversary/pose-recommend/index.vue
-->
<template>
  <div class="pose-recommend">
    <!-- 头部区域 -->
    <div class="pose-img">
      <img :src="bgImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <count-down></count-down>
    <info-fixed
      :userInfo="userInfo"
      @handleLoginDialog="showLoginDialog = true"
      @handleLogout="showLogoutDialog = true"
    ></info-fixed>
    <!-- 购买区域 -->
    <pay-event-component
      @handleLoginDialog="showLoginDialog = true"
      @handlePayDialog="handleChangePayModal"
      :otherInfo="otherInfo"
    ></pay-event-component>
    <!-- 投票区域 -->
    <vote-component
      @handleLoginDialog="showLoginDialog = true"
      :otherInfo="otherInfo"
      @getData="getUserOtherInfo"
    />
    <!-- 活动区域 -->
    <shop-component />
    <!-- 调查问卷 -->
    <question-component />
    <!-- 企业微信 -->
    <wechat-component />
    <vote-footer></vote-footer>
    <!-- 以下页面为公用页面 -->
    <!-- 支付弹框 -->
    <pay-component
      ref="payRef"
      @payWechat="payWechat"
      @payAli="payAli"
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
import PayComponent from "@/components/pay";
import PaySuccessComponent from "@/components/pay-success";

import voteFooter from "../footer";
import InfoFixed from "../common/info";
import CountDown from "../common/count-down";
import loginAndRegister from "../../login-and-register/login-and-register.vue";
import logout from "../../login-and-register/logout.vue";
import PayEventComponent from "./components/pay-event-component.vue";
import VoteComponent from "./components/vote-component.vue";
import shopComponent from "./components/shop-component.vue";
import questionComponent from "./components/question-component.vue";
import wechatComponent from "./components/wechat-component.vue";

import { BASE_IMAGE_VOTE_URL } from "@/request/config";

import { errorInfo, successInfo } from "@/utils";
import localCache from "@/utils/cache";
import urlLink from "@/utils/link";
import { aliPayAction, wechatPayAction } from "@/utils/pay-config";
import { mapState } from "vuex";
import { checkUserState } from "@/api/vote";

export default {
  name: "votePage",
  components: {
    voteFooter,
    PayComponent,
    InfoFixed,
    CountDown,
    PaySuccessComponent,
    PayEventComponent,
    VoteComponent,
    shopComponent,
    questionComponent,
    wechatComponent,
    loginAndRegister,
    logout,
  },
  mounted() {
    // TODO 获取地址栏是否带有state参数，带有参数展示支付成功弹
    const state = this.$route.query.state;
    if (state && state === "success") {
      this.$nextTick(() => {
        this.openSuccessDialog();
      });
    }
    if (this.uid && this.token) {
      this.getUserOtherInfo();
    }
  },
  data() {
    return {
      payInfo: {
        title: "充值128P币送米诺",
        id: "M220301347",
      },
      bgImg: BASE_IMAGE_VOTE_URL + "/banner.png",
      selectShopInfo: {},
      resetTime: null,
      showLoginDialog: false,
      showLogoutDialog: false,
      otherInfo: {},
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.voteModule.userInfo,
      token: (state) => state.voteModule.token,
      uid: (state) => state.voteModule.uid,
    }),
  },
  methods: {
    openSuccessDialog() {
      this.$refs["successRef"].showDialog = true;
    },
    getUserOtherInfo() {
      checkUserState({
        uid: this.uid,
        loginKey: this.token,
      }).then((result) => {
        if (result.code === 200) {
          this.otherInfo = result.data;
        } else errorInfo(result.msg);
      });
    },
    phoneLogin(data) {
      const _this = this;
      this.$store
        .dispatch("voteModule/loginAction", data)
        .then(() => {
          successInfo("登录成功");
          _this.showLoginDialog = false;
          this.getUserOtherInfo();
          // window.location.reload();
        })
        .catch((err) => errorInfo(err));
    },
    logout() {
      this.$store.dispatch("voteModule/logoutAction").then(() => {
        window.location.reload();
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

<style>
.content-wrap {
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  margin: 15px;
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
    // margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
