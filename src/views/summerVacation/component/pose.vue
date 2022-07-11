<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-11 17:29:02
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-11 17:59:45
 * @FilePath: /h5-active-v2/src/views/summerVacation/component/function-buy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="pose-buy">
    <div class="wrap-content">
      <img :src="headerImg" alt="" referrerpolicy="no-referrer" />
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
export default {
  name: "pose-buy",
  data() {
    return {
      headerImg: BASE_IMAGE_SUMMARY_URL + "/pb-bg.png",
    };
  },

  mounted() {},

  methods: {
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
  },
};
</script>

<style lang="less" scoped>
.pose-buy {
  margin-top: 60px;
}
</style>
