<!--
 * @Author: korealu
 * @Date: 2022-03-04 10:31:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-04 10:38:33
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/ordinary-recommend/index.vue
-->
<template>
  <div class="ordinary-recommend">
    <!-- 头部区域 -->
    <div class="ordinary-img">
      <img :src="bgImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <info-fixed></info-fixed>
    <count-down></count-down>
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
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
export default {
  name: "ordinaryRecommend",
  components: {
    AnniversaryFooter,
    PoseDiscount,
    SendLink,
    InfoFixed,
    CountDown,
  },
  data() {
    return {
      bgImg: BASE_IMAGE_ANNIVERSARY_URL + "/bg.png",
    };
  },
  created() {
    // if (this.$store.state.anniversaryModule.token === null) {
    //   this.$router.push({
    //     path: "/login",
    //   });
    // }
    console.log(this.$store);
  },
};
</script>

<style lang="less" scoped>
.ordinary-recommend {
  display: flex;
  flex-direction: column;
  width: 100%;
  .ordinary-img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
