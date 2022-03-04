<!--
 * @Author: korealu
 * @Date: 2022-03-01 17:36:50
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-04 15:48:04
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
    <info-fixed></info-fixed>
    <count-down></count-down>
    <!-- 这是是不同type显示不用组件区域 -->
    <pose-component
      :userInfo="userInfo"
      @openPayModal="handleChangePayModal"
      v-if="showDifferentComponents === 'A1'"
    ></pose-component>
    <even-component
      :userInfo="userInfo"
      @openPayModal="handleChangePayModal"
      v-if="showDifferentComponents === 'A2'"
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
  computed: {
    userInfo() {
      return {
        avatar: BASE_IMAGE_ANNIVERSARY_URL + "/avatar.png",
        id: "1234567899",
        price: 0,
        type: 1, // 已过期
      };
    },
  },
  created() {
    // if (this.$store.state.anniversaryModule.token === null) {
    //   this.$router.push({
    //     path: "/login",
    //   });
    // }
    console.log(this.$store);
  },
  mounted() {
    document.title = "POFI 周年庆典";
    // const type = this.$route.query.type;
    // this.showDifferentComponents = type;
  },
  data() {
    return {
      payInfo: {},
      bgImg: BASE_IMAGE_ANNIVERSARY_URL + "/bg.png",
      showDifferentComponents: "A1", // A1. pose 2. even
    };
  },
  methods: {
    handleChangePayModal(type) {
      this.$refs["payRef"].showDialog = true;
      switch (type) {
        case "mina":
          this.payInfo = {
            title: "充值128送米诺",
            id: "AFUNC_PRO_455D",
          };
          break;
        case "pro":
          this.payInfo = {
            title: "充值专业版",
            id: "AFUNC_PRO_455D",
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
        case "draw":
          this.payInfo = {
            title: "绘画版一年",
            id: "AFUNC_PRO_455D",
          };
          break;
      }
    },
    payWechat() {
      console.log(this.payInfo);
    },
    payAli() {
      console.log(this.payInfo);
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
