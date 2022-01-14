<template>
  <div class="home-container">
    <home-header />
    <flex-btn
      @handleLoginDialog="handleLoginDialog"
      @handlePrizeDialog="handlePrizeDialog"
    />
    <!--红包区域-->
    <red-envelopes @anchor="goAnchor" />
    <!--福利一-->
    <welfare-one ref="one" @handleDialog="openDifferentDialog" />
    <!-- 福利二-->
    <welfare-two ref="two" @handleDialog="openDifferentDialog" />
    <!--购物链接-->
    <shopping-link />
    <!--分享链接-->
    <send-link />
    <!--文字描述-->
    <desc-component />
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
              <div class="right-text">Pofi ID : 2568926</div>
            </div>
          </div>
          <div class="fuli-tip">
            <!--根据地址栏是否有邀请人ID判断当前显示文字-->
            {{ $route.query._id ? fuliOur : fuliOnce }}
          </div>
          <div class="pay-btn">
            <div class="wechat-pay">
              <img :src="wechatPay" alt="" />
            </div>
            <div class="ali-pay">
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
    >
    </login-and-register>
    <!--退出弹框-->
    <logout
      :show-dialog="showLogoutDialog"
      @logout="logout"
      @closeDialog="closeDialog"
    />
    <!--我的奖品弹框-->
    <prize-modal
      :show-dialog="showPrizeDialog"
      @closeDialog="closeDialog"
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

import { successInfo } from "@/utils";
import PrizeModal from "@/views/home/components/prize-modal";

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
    };
  },
  mounted() {
    // console.log(this.$route.query, "判断当前用户是否是被邀请人");
    // let el = this.$refs[this.$route.query.ref].$el;
    // console.log(el);
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     if (el)
    //       el.scrollIntoView({
    //         behavior: "smooth",
    //       });
    //   });
    // });
  },
  methods: {
    goAnchor(el) {
      this.$refs[el].$el.scrollIntoView({
        behavior: "smooth",
      });
    },
    // 福利弹框
    openDifferentDialog(type) {
      this.showDialog = true;
      this.openType = type;
    },
    // 登录弹框
    handleLoginDialog(status) {
      this.showLoginDialog = status;
    },
    // 我的奖品弹框
    handlePrizeDialog(status) {
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
    logout() {
      this.$store.dispatch("logoutAction").then(() => {
        successInfo("退出成功");
        window.location.reload();
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
