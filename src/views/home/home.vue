<template>
  <div class="home-container">
    <home-header v-once :header-img="headerImg" />
    <flex-btn
      @handleLoginDialog="handleLoginDialog"
      @handlePrizeDialog="handlePrizeDialog"
      @handleLogout="openLogoutDialog"
    />
    <!--红包区域-->
    <red-envelopes @anchor="goAnchor" />
    <!--福利一-->
    <welfare-one
      ref="one"
      @handleDialog="openDifferentDialog"
      @handleLoginDialog="showLoginDialog = true"
      @handleShowOpenNewGroup="openLogoutDialog"
      :group-data="groupData[0]"
    />
    <!-- 福利二-->
    <welfare-two
      ref="two"
      @handleLoginDialog="showLoginDialog = true"
      @handleDialog="openDifferentDialog"
      @handleShowOpenNewGroup="openLogoutDialog"
      :group-data="groupData[1]"
      :list-data="welfareListData"
    />
    <!--购物链接-->
    <shopping-link />
    <!--分享链接-->
    <send-link />
    <!--文字描述-->
    <desc-component :list="textList" />
    <!--底部标识-->
    <footer-component></footer-component>
    <!--公用福利弹框-->
    <korea-dialog
      :show-dialog="showDialog"
      @closeDialog="closeDialog"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #content>
        <!-- 支付成功弹框-->
        <div class="info" v-if="openType === 'pay'">
          <div class="pay-icon">
            <img :src="successIcon" alt="" />
          </div>
          <div class="pay-title">支付成功！</div>
          <div class="pay-tip">服务已充值到账号中</div>
          <div class="get-user">邀请用户</div>
          <!--          <div class="go-back">返回</div>-->
        </div>
        <!--福利弹框-->
        <div
          class="fuli-one"
          v-if="openType === 'fuliOne' || openType === 'fuliTwo'"
        >
          <div class="title">
            {{ openType === "fuliOne" ? "充128P币送30P币" : "买SVIP送30P币" }}
          </div>
          <div class="common-user-id" style="background-color: #ff264a">
            <div class="left-text">当前用户</div>
            <div class="right-white">
              <div class="left-circle"></div>
              <div class="right-text">Pofi ID : {{ userInfo.nickId }}</div>
            </div>
          </div>
          <div class="fuli-tip">
            <!--根据地址栏是否有邀请人ID判断当前显示文字-->
            {{ $route.query.inviteCode ? fuliOur : fuliOnce }}
          </div>
          <div class="pay-btn">
            <div class="wechat-pay" @click="payWechat">
              <img :src="wechatPay" alt="" />
            </div>
            <div class="ali-pay" @click="payAli">
              <img :src="aliPay" alt="" />
            </div>
          </div>
        </div>
        <!--抽奖弹框-->
      </template>
    </korea-dialog>
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
      :title="logoutTitle"
    />
    <!--我的奖品弹框-->
    <prize-modal
      :show-dialog="showPrizeDialog"
      @closeDialog="closeDialog"
      :list="prizeInfo"
    ></prize-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import descComponent from "./components/desc";
import KoreaDialog from "@/components/korea-dialog/korea-dialog";
import FooterComponent from "@/views/home/components/footer";
import ShoppingLink from "@/views/home/components/shopping-link";
import SendLink from "@/views/home/components/send-link";
import FlexBtn from "@/views/home/components/fixed-btn";
import RedEnvelopes from "@/views/home/components/red-envelopes";
import HomeHeader from "@/views/home/components/home-header";
import WelfareOne from "@/views/home/components/welfare-one";
import WelfareTwo from "@/views/home/components/welfare-two";
import LoginAndRegister from "@/views/login-and-register/login-and-register";
import Logout from "@/views/login-and-register/logout";

import { errorInfo, successInfo, _isWechatPay } from "@/utils";
import PrizeModal from "@/views/home/components/prize-modal";
import { mapState } from "vuex";
import urlLink from "@/utils/link";
import urlencode from "urlencode";
import {
  wechatPay,
  ailPay,
  getGroupConfig,
  getUserPrize,
  getPrizeConfig,
  getPageConfig,
} from "@/api";
// import { getCode } from "@/utils/getCode";

import smoothscroll from "smoothscroll-polyfill";
export default {
  name: "Home",
  components: {
    PrizeModal,
    Logout,
    LoginAndRegister,
    WelfareTwo,
    WelfareOne,
    HomeHeader,
    RedEnvelopes,
    FlexBtn,
    SendLink,
    ShoppingLink,
    FooterComponent,
    KoreaDialog,
    descComponent,
  },
  data() {
    return {
      headerImg: null,
      textList: null,
      showLoginDialog: false, // 登录弹框
      showLogoutDialog: false, // 退出弹框
      showPrizeDialog: false, // 奖品弹框
      showDialog: false, // 福利弹框
      /**
       *  pay 支付成功
       *  fuliOne 用户点击福利一按钮
       *  fuliTwo 用户点击福利二按钮
       */
      openType: "fuliTwo",
      successIcon: require("@/assets/image/pay-success.png"),
      aliPay: require("@/assets/image/alipay.png"),
      wechatPay: require("@/assets/image/wechatpay.png"),
      fuliOnce: "注意：支付成功后将开启新组队，您将无法接受其他发起人的邀请。", // 单人文本
      fuliOur:
        "注意：支付完成后将完成组队，您将无法开启组团，也无法再接受他人邀请。", // 组队文本
      queryInfo: {},
      groupData: [],
      prizeInfo: null,
      welfareListData: [],
      logoutTitle: "是否退出登录",
      logoutStatus: false,
    };
  },
  mounted() {
    this.getPageData();
    console.log(localStorage.getItem("openId"), "openId");
    // if (this._isWechat()) {
    //   if (localStorage.getItem("openId") == null) {
    //     getCode("wx4e33f34be6700e46", this.$route.query.code);
    //     return;
    //   }
    // }
    // 被邀请人
    if (this.$route.query.inviteCode) {
      this.$store.dispatch("getGroupConfigAction");
      this.getGroupData({
        inviteCode: this.$route.query.inviteCode,
      });
    } else if (this.uid || (this.uid && this.$route.query.inviteCode)) {
      console.log("支付成功后");
      // 邀请人
      this.getAllData();
    } else {
      this.getGroupData();
      this.$store.dispatch("getGroupConfigAction");
    }
    this.getWelfareList();
    this.queryInfo = this.$route.query;
    this.$nextTick(() => {
      console.log(this.$route.query.ref, "页面节点");
      setTimeout(() => {
        if (this.queryInfo.ref) {
          this.goAnchor(this.queryInfo.ref);
        }
      }, 1000);
    });
    // 友盟数据埋点
    const script = document.createElement("script");
    script.src =
      "https://s4.cnzz.com/z_stat.php?id=1280511914&web_id=1280511914";
    script.language = "JavaScript";
    document.body.appendChild(script);
  },
  computed: {
    ...mapState(["uid", "userInfo", "payConfig"]),
  },
  methods: {
    getPageData() {
      getPageConfig().then((res) => {
        if (res.code === 200) {
          this.headerImg = res.data.imgUrl[0];
          this.textList = res.data.text;
        }
      });
    },
    getAllData() {
      this.getUserPrizeInfo({
        loginKey: this.$store.state.token,
        uid: this.$store.state.uid,
      });
      if (!this.$route.query.inviteCode) {
        this.$store.dispatch("getGroupConfigAction");
        this.getGroupData({
          uid: this.uid,
          inviteCode: this.$route.query.inviteCode ?? null,
        });
      }
    },
    /* 获取组队信息 */
    getGroupData(params) {
      getGroupConfig(params).then((res) => {
        if (res.code === 200) {
          this.groupData = res.data;
        } else errorInfo(res.msg);
      });
    },
    // 获取福利二配置信息
    getWelfareList() {
      getPrizeConfig().then((res) => {
        if (res.code === 200) {
          this.welfareListData = res.data;
        } else errorInfo(res.msg);
      });
    },
    _isWechat() {
      return navigator.userAgent.match(/micromessenger/i);
    },
    _isAli() {
      return /AlipayClient/.test(window.navigator.userAgent);
    },
    phoneLogin(data) {
      const _this = this;
      this.$store
        .dispatch("loginAction", data)
        .then(() => {
          successInfo("登录成功");
          _this.showLoginDialog = false;
          this.getAllData();
          // window.location.reload();
        })
        .catch((err) => errorInfo(err));
    },
    //  获取用户中奖信息
    getUserPrizeInfo(params) {
      getUserPrize(params).then((res) => {
        if (res.code === 200) {
          this.prizeInfo = res.data;
        } else errorInfo(res.msg);
      });
    },
    goAnchor(el) {
      smoothscroll.polyfill();
      this.$refs[el].$el.scrollIntoView({
        behavior: "smooth",
      });
    },
    // 福利弹框
    openDifferentDialog(type) {
      if (this.uid) {
        this.showDialog = true;
        this.openType = type;
      } else this.showLoginDialog = true;
    },
    // 登录弹框
    handleLoginDialog(status) {
      this.showLoginDialog = status;
    },
    // 我的奖品弹框
    handlePrizeDialog(status) {
      this.getUserPrizeInfo({
        loginKey: this.$store.state.token,
        uid: this.$store.state.uid,
      });
      this.showPrizeDialog = status;
    },
    closeDialog(status) {
      let result;
      if (typeof status === "boolean") {
        result = status;
      } else {
        result = false;
      }
      this.showPrizeDialog = result;
      this.showLoginDialog = result;
      this.showLogoutDialog = result;
      this.showDialog = result;
    },
    handleConfirm(e) {
      this.showDialog = e;
    },
    handleCancel(e) {
      this.showDialog = e;
    },
    openLogoutDialog(status) {
      this.showLogoutDialog = true;
      if (status === "logout") {
        this.logoutStatus = false;
        this.logoutTitle = "是否退出登录";
      } else {
        this.logoutStatus = true;
        this.logoutTitle = "是否回到自己的页面开启新的组队";
      }
    },
    logout() {
      if (this.$route.query.inviteCode && this.logoutStatus) {
        window.location.href =
          window.location.origin + window.location.pathname;
      } else {
        this.$store.dispatch("logoutAction").then(() => {
          window.location.reload();
        });
      }
    },

    payWechat() {
      const {
        payConfig: { fuliOneSnId, fuliTwoSnId, fuliOneEid, fuliTwoEid },
        uid,
        token,
      } = this.$store.state;
      const type = this.openType === "fuliOne";
      let data = {
        snId: type ? fuliOneSnId : fuliTwoSnId,
        chargeType: 0,
        uid: uid,
        loginKey: token,
        appid: this._isWechat() ? urlLink.wechatAPPID : null,
        from: this._isWechat() ? 3 : 2,
        remark: JSON.stringify({
          type: "7",
          eid: type ? fuliOneEid : fuliTwoEid,
          inviteCode: this.queryInfo.inviteCode ?? null,
        }),
        returnUrl: window.location.href,
        // openId: this._isWechat() ? localStorage.getItem("openId") : null,
      };
      wechatPay(data)
        .then((res) => {
          if (res.code === 200) {
            if (this._isWechat()) {
              _isWechatPay(res.data.wxRes)
                .then((res) => {
                  console.log(res, "测试");
                })
                .catch((err) => {
                  console.log(err, "错误");
                });
            } else {
              let backUrl = window.location.href;
              window.location.href = `${
                res.data.wxRes.mweburl
              }&redirect_url=${urlencode(backUrl)}`;
            }
          } else errorInfo(res.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    payAli() {
      const {
        payConfig: { fuliOneSnId, fuliTwoSnId, fuliOneEid, fuliTwoEid },
        uid,
        token,
      } = this.$store.state;
      const inviteCode = this.$route.query.inviteCode ?? null;
      const ref = this.$route.query.inviteCode ?? null;
      const queryData =
        inviteCode !== null && ref !== null
          ? `?inviteCode=${inviteCode}&ref=${ref}`
          : "";
      const url = `${window.location.origin}${window.location.pathname}${queryData}`;
      console.log(url);
      const type = this.openType === "fuliOne";
      let data = {
        snId: type ? fuliOneSnId : fuliTwoSnId,
        chargeType: 1,
        uid: uid,
        loginKey: token,
        from: 2,
        remark: JSON.stringify({
          type: "7",
          eid: type ? fuliOneEid : fuliTwoEid,
          inviteCode: this.$route.query.inviteCode ?? null,
        }),
        appid: urlLink.alipayAPPID,
        returnUrl: url,
      };
      console.log(url, "支付宝链接");
      ailPay(data)
        .then((res) => {
          if (res.code === 200) {
            window.location.href = res.data.aliRes;
          } else errorInfo(res.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  width: 100%;

  .logout-info {
    position: absolute;
    top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .info {
    position: absolute;
    top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    .pay-icon {
      width: 59px;
      height: 59px;
      margin-bottom: 4px;
      img {
        width: 59px;
        height: 59px;
      }
    }
    .pay-title {
      font-size: 23px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #c9c9c9;
      margin-bottom: 8px;
      text-align: center;
      margin-left: 10px;
    }
    .pay-tip {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      margin-bottom: 10px;
      color: #dfdfdf;
    }
    .get-user {
      width: 102px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ff264a;
      border-radius: 15px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #f9f9f9;
    }
    .go-back {
      width: 102px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #4c4c4c;
      border-radius: 15px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #f9f9f9;
    }
  }
  .fuli-one {
    position: absolute;
    top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    .title {
      text-align: center;
      font-size: 23px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #c9c9c9;
      margin-bottom: 10px;
    }
    .fuli-tip {
      margin-top: 20px;
      width: 215px;
      line-height: 20px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #dfdfdf;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
    }
    .pay-btn {
      display: flex;
      margin-top: 15px;
      .ali-pay {
        width: 102px;
        height: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .wechat-pay {
        width: 102px;
        height: 30px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
