<!--
 * @Author: korealu
 * @Date: 2022-03-01 18:03:07
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-04 10:42:02
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/common/discount/index.vue
-->
<template>
  <div class="content-wrap">
    <div class="pose-youhui">
      <div class="youhui-title">
        <img :src="youhuiTitle" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="youhui-img" @click="goOrdinaryPage">
        <img :src="youhuiImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
export default {
  data() {
    return {
      youhuiTitle: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/youhui.png",
      youhuiImg: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/youhui-link.png",
    };
  },
  methods: {
    goOrdinaryPage() {
      this.$router.push({
        path: "/ordinaryRecommend",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pose-youhui {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .youhui-title {
    width: 257px;
    height: 37px;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .youhui-img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
