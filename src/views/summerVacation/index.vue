<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-06 10:38:33
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-14 16:57:55
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
    <page-info-component @goAnchor="goAnchor"></page-info-component>
    <!-- item选项吸顶 -->
    <template v-if="selectList && selectList.length > 0">
      <div class="select-wrap">
        <div
          class="select-item"
          :class="selectBtnIndex === item.ref && 'select'"
          v-for="item in selectList"
          :key="item.ref"
          @click="handleChangeItem(item.ref)"
        >
          {{ item.name }}
        </div>
      </div>
    </template>
    <!-- 功能订阅 -->
    <page-fun-buy-component
      ref="one"
      @handleLoginDialog="showLoginDialog = true"
      @handlePayDialog="handleChangePayModal"
      @showText="showText"
      @showRule="showRule"
      :page-config="pageConfig"
    ></page-fun-buy-component>
    <!-- 充值P币 -->
    <page-pay-info-component
      ref="two"
      :page-config="pageConfig"
      @handlePayDialog="handleChangePayModal"
      @handleLoginDialog="showLoginDialog = true"
      @showText="showText"
      @showRule="showRule"
    ></page-pay-info-component>
    <!-- 实体人偶 -->
    <page-even-component ref="three"></page-even-component>
    <!-- pose半价 -->
    <page-pose-component
      ref="four"
      @getData="getPageConfig"
      @handleLoginDialog="showLoginDialog = true"
      :state="awardState"
    ></page-pose-component>
    <!-- 打卡活动区域 -->
    <div class="wrap-content">
      <img :src="punchCardImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <!-- 九宫格抽奖 -->
    <page-lottery-component
      @handleLoginDialog="showLoginDialog = true"
    ></page-lottery-component>
    <!-- 第三方链接 -->
    <part-component></part-component>
    <!-- 底部 -->
    <footer-component></footer-component>
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
      :payInfo="payInfo"
      :userInfo="userInfo"
    ></pay-component>
    <!-- 支付成功弹框 -->
    <pay-success-component
      ref="successRef"
      title="充值已到账，请打开APP刷新查看"
    ></pay-success-component>
    <!-- 规则 -->
    <rule-modal ref="ruleRef"></rule-modal>
    <!-- 用户协议 -->
    <info-modal ref="infoRef"></info-modal>
  </div>
</template>

<script>
import logout from "../login-and-register/logout.vue";
import loginAndRegister from "../login-and-register/login-and-register.vue";

import PayComponent from "@/components/pay";
import PaySuccessComponent from "@/components/pay-success";

import infoFixed from "./common/fixed";
import CountDown from "./common/count-down";
import footerComponent from "./footer";
import partComponent from "./common/part/index.vue";
import ruleModal from "./common/modal/rule.vue";
import infoModal from "./common/modal/info.vue";

import pageInfoComponent from "./component/function-desc.vue";
import pageFunBuyComponent from "./component/function-buy.vue";
import pagePayInfoComponent from "./component/pay-info.vue";
import pageEvenComponent from "./component/even.vue";
import pagePoseComponent from "./component/pose.vue";
import pageLotteryComponent from "./component/lottery.vue";

import localCache from "@/utils/cache";
import { getCode } from "@/utils/getCode";
import { errorInfo, successInfo, reduceEndTime, openUrl } from "@/utils";
import { wechatPayAction, aliPayAction } from "@/utils/pay-config";
import urlLink from "@/utils/link";
import { mapState } from "vuex";
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
import {
  checkUserHasEvent,
  checkPageConfig,
  randomPose,
  getAward,
} from "@/api/summary";
import smoothscroll from "smoothscroll-polyfill";
import { Dialog } from "vant";
var VueScrollTo = require("vue-scrollto");

export default {
  name: "summaryContainer",
  components: {
    infoFixed,
    CountDown,
    partComponent,
    ruleModal,
    infoModal,
    pageInfoComponent,
    pageFunBuyComponent,
    pagePayInfoComponent,
    pageEvenComponent,
    pagePoseComponent,
    pageLotteryComponent,
    logout,
    loginAndRegister,
    PayComponent,
    PaySuccessComponent,
    footerComponent,
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
      headerImg: BASE_IMAGE_SUMMARY_URL + "/header-banner.png",
      punchCardImg: BASE_IMAGE_SUMMARY_URL + "/vote-bg.png",
      endTime: new Date("2022/07/31 23:59:59").getTime() / 1000,
      showLoginDialog: false,
      showLogoutDialog: false,
      payInfo: {
        title: "充值128P币送米诺",
        id: "MDRCG12800",
      },
      activeIsState: false,
      selectBtnIndex: "one",
      selectList: [
        { name: "功能订阅", ref: "one" },
        { name: "充值送人偶", ref: "two" },
        { name: "实体人偶", ref: "three" },
        { name: "Pose库半价", ref: "four" },
      ],
      pageConfig: {},
      poseList: [],
      awardState: false,
    };
  },
  mounted() {
    document.title = "Pofi 暑假爆肝计划";
    this.activeIsState = reduceEndTime(this.endTime);
    if (this.activeIsState) {
      Dialog.confirm({
        message: "活动已结束",
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
    const state = this.$route.query.state;
    if (state && state === "success") {
      this.$nextTick(() => {
        this.openSuccessDialog();
      });
    }
    if (this.token && this.uid) {
      this.getPageConfig();
    }
    // 判断当前是否在微信内
    if (this._isWechat() && process.env.NODE_ENV === "production") {
      if (localCache.getCache("openId") == null) {
        getCode("wx4e33f34be6700e46", this.$route.query.code);
        return;
      }
    }
  },
  methods: {
    // 获取页面配置
    getPageConfig() {
      checkPageConfig({
        loginKey: this.token,
        uid: this.uid,
      }).then((res) => {
        if (res.code === 200) {
          this.pageConfig = res.data;
          // 判断是否具有领取资格
          if (res.data.receive) {
            this.getAwardToTime();
          }
        } else errorInfo(res.msg);
      });
    },
    // 获取随机库
    getPoseList() {
      randomPose().then((res) => {
        if (res.code === 200) {
          this.poseList = res.data;
        } else errorInfo(res.msg);
      });
    },
    // 获取9P币，如果receive返回1，可以领取9P币
    getAwardToTime() {
      getAward({
        loginKey: this.token,
        uid: this.uid,
      }).then((res) => {
        this.awardState = true;
        if (res.code === 200) {
          Dialog.alert({
            message: "9P币已到账，请前往APP查看",
          });
          // this.pageConfig = res.data;
        }
      });
    },
    goAnchor(ele) {
      if (ele === "download") {
        openUrl(urlLink.appLink);
      } else {
        this.handleScroll(ele);
      }
    },
    handleScroll(ele) {
      this.selectBtnIndex = ele;
      smoothscroll.polyfill();
      if (this.$refs[ele]) {
        VueScrollTo.scrollTo(this.$refs[ele].$el, 1000, {
          offset: -50,
        });
        console.log(VueScrollTo);
        // this.$refs[ele].$el.scrollIntoView({
        //   behavior: "smooth",
        // });
      }
    },
    handleChangeItem(ele) {
      if (this.selectBtnIndex === ele) return;
      this.handleScroll(ele);
    },
    phoneLogin(data) {
      const _this = this;
      let tel = "" + data.no;
      const phoneStr = tel.substr(0, 3) + "****" + tel.substr(7);
      localCache.setCache("phoneStr", phoneStr);
      this.$store
        .dispatch("summaryModule/loginAction", data)
        .then(() => {
          successInfo("登录成功");
          _this.showLoginDialog = false;
          this.$router.go(0);
        })
        .catch((err) => errorInfo(err));
    },
    logout() {
      this.$store.dispatch("summaryModule/logoutAction").then(() => {
        // this.$router.replace("/active");
        this.$router.go(0);
      });
    },
    closeDialog() {
      this.showLoginDialog = false;
      this.showLogoutDialog = false;
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
      wechatPayAction(data)
        .then(() => {
          this.$refs["payRef"].showDialog = false;
          this.openSuccessDialog();
        })
        .catch((err) => errorInfo(err));
    },
    openSuccessDialog() {
      this.$refs["successRef"].showDialog = true;
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
    showText() {
      this.$refs["infoRef"].showDialog = true;
    },
    showRule() {
      this.$refs["ruleRef"].showDialog = true;
    },
  },
};
</script>

<style lang="less" scoped>
.summary-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  width: 100%;
  background-color: rgba(16, 73, 61, 1);
  .banner-header {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .select-wrap {
    position: sticky;
    top: 0 !important;
    z-index: 99;
    display: flex;
    // justify-content: space-around;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 36px;
    line-height: 30px;
    // line-height: 20px;
    box-sizing: border-box;
    border: 3px solid #1e1e1e;
    border-radius: 3px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 400;
    font-family: zihun105hao-jianyahei;
    // margin-bottom: 47px;
    background-color: rgba(16, 73, 61, 1);
    .select-item {
      width: 98px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .select {
      text-align: center;
      background: #fb9833;
      border: 2px solid #1e1e1e;
      border-top: none;
      border-bottom: none;
      border-radius: 3px;
      box-sizing: border-box;
      color: #1e1e1e;
    }
  }
}
</style>
