<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-11 17:29:02
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-12 13:39:46
 * @FilePath: /h5-active-v2/src/views/summerVacation/component/function-buy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="even-buy">
    <div class="wrap-content">
      <img :src="headerImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <div class="btn-wrap">
      <div class="btn" @click="goApp('program')">
        <img :src="programBtn" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="btn" @click="goApp('redBook')">
        <img :src="redBookBtn" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";
export default {
  name: "even-buy",
  data() {
    return {
      headerImg: BASE_IMAGE_SUMMARY_URL + "/even-bg.png",
      programBtn: BASE_IMAGE_SUMMARY_URL + "/even-program.png",
      redBookBtn: BASE_IMAGE_SUMMARY_URL + "/even-redbook.png",
    };
  },

  mounted() {},

  methods: {
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
    goApp(type) {
      if (type === "program") {
        openUrl(urlLink.programLink);
      } else {
        openUrl(urlLink.redBookLink1);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.even-buy {
  margin-top: 48px;
  position: relative;
  .btn-wrap {
    position: absolute;
    bottom: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      width: 149px;
      height: 36px;
      &:first-child {
        margin-right: 3px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
