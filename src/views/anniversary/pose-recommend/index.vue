<!--
 * @Author: korealu
 * @Date: 2022-03-01 17:36:50
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-03 16:55:22
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
    <pose-component v-if="showDifferentComponents === 1"></pose-component>
    <even-component v-if="showDifferentComponents === 2"></even-component>
    <!-- 优惠区域 -->
    <pose-discount></pose-discount>
    <!-- 第三方链接 -->
    <send-link></send-link>
    <anniversary-footer></anniversary-footer>
  </div>
</template>

<script>
import AnniversaryFooter from "../footer";
import InfoFixed from "../common/info";
import CountDown from "../common/count-down";
import PoseDiscount from "../common/discount";
import SendLink from "../common/part";

import PoseComponent from "./components/pose";
import EvenComponent from "./components/even";
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
export default {
  name: "poseRecommend",
  components: {
    AnniversaryFooter,
    PoseDiscount,
    SendLink,
    InfoFixed,
    CountDown,
    PoseComponent,
    EvenComponent,
  },
  mounted() {
    document.title = "POFI 周年庆典";
  },
  data() {
    return {
      bgImg: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/bg.png",
      showDifferentComponents: 2, // 1. pose 2. even
    };
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
