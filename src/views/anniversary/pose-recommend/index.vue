<!--
 * @Author: korealu
 * @Date: 2022-03-01 17:36:50
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 18:06:52
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/pose-recommend/index.vue
-->
<template>
  <div class="pose-recommend">
    <!-- 头部区域 -->
    <div class="pose-img">
      <img :src="bgImg" alt="" />
    </div>
    <!-- 优惠区域 -->
    <pose-discount></pose-discount>
    <anniversary-footer></anniversary-footer>
  </div>
</template>

<script>
import AnniversaryFooter from "../footer";
import PoseDiscount from "../common/discount";
export default {
  components: {
    AnniversaryFooter,
    PoseDiscount,
  },
  mounted() {
    document.title = "POFI 周年庆典";
  },
  data() {
    return {
      bgImg: require("@/assets/image/anniversary/pose-recommend/bg.png"),
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
