<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-13 13:52:36
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-13 15:24:02
 * @FilePath: /h5-active-v2/src/components/lottery-success/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <korea-dialog
    class="a"
    :show-dialog="showDialog"
    @closeDialog="closeDialog"
    @confirm="handleConfirm"
    @cancel="handleCancel"
    :bgImg="bgImg"
    closeBtnTop="30px"
    bgTop="30px"
  >
    <template #content>
      <div class="wrap">
        <div class="img">
          <img :src="info.url" alt="" referrerpolicy="no-referrer" />
        </div>
        <div class="title">{{ info.name }}</div>
        <div class="code">{{ info.redeem ? info.redeem : info.reward }}</div>
        <div class="copy">
          <img
            :src="copyImg"
            @click="copyText"
            alt=""
            referrerpolicy="no-referrer"
          />
        </div>
      </div>
    </template>
  </korea-dialog>
</template>

<script>
import koreaDialog from "@/components/korea-dialog/korea-dialog";
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
import { copyShareLink } from "@/utils";
export default {
  name: "lotterySuccess",
  components: {
    koreaDialog,
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      bgImg: BASE_IMAGE_SUMMARY_URL + "/get.png",
      copyImg: BASE_IMAGE_SUMMARY_URL + "/copy.png",
      showDialog: false,
    };
  },

  mounted() {},

  methods: {
    handleConfirm(e) {
      this.showDialog = e;
    },
    handleCancel(e) {
      this.showDialog = e;
    },
    closeDialog() {
      this.showDialog = false;
    },
    copyText() {
      copyShareLink(
        this.info.redeem ? this.info.redeem : this.info.reward,
        this,
        "复制成功"
      );
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  position: absolute;
  top: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  .img {
    img {
      width: 117px;
      height: 117px;
      padding: 0;
    }
  }
  .title {
    position: relative;
    top: 10px;
    height: 18px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #f9f9f9;
  }
  .code {
    position: relative;
    top: 37px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #c9c9c9;
  }
  .copy {
    position: relative;
    top: 60px;
    img {
      width: 102px;
      height: 31px;
      padding: 0;
    }
  }
}
</style>
