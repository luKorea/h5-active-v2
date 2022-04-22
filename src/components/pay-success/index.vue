<!--
 * @Author: korealu
 * @Date: 2022-03-03 16:03:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-22 10:23:23
 * @Description: file content
 * @FilePath: /h5-active-v2/src/components/go-app/index.vue
-->
<template>
  <korea-dialog
    :show-dialog="showDialog"
    @closeDialog="closeDialog"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <template #content>
      <div class="pay-wrap">
        <div class="pay-tip">
          <van-icon name="passed" class="pay-icon" />
          <div class="pay-text">支付成功!</div>
        </div>
        <div class="pay-title">{{ title }}</div>
        <div class="pay-img" @click="goApp">
          <img :src="appImg" referrerpolicy="no-referrer" alt="" />
        </div>
      </div>
    </template>
  </korea-dialog>
</template>

<script>
import KoreaDialog from "@/components/korea-dialog/korea-dialog.vue";
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";
export default {
  name: "appModal",
  components: {
    KoreaDialog,
  },
  props: {
    title: {
      type: String,
      default: "请前往Pofi无限人偶App购买",
    },
  },
  data() {
    return {
      showDialog: false,
      appImg: require("@/assets/image/go-app.png"),
    };
  },
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
    goApp() {
      openUrl(urlLink.appLink);
      // this.closeDialog();
    },
  },
};
</script>

<style lang="less" scoped>
.pay-wrap {
  position: absolute;
  top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  .pay-tip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    .pay-icon {
      font-size: 48px;
      color: #c9c9c9;
      margin-bottom: 10px;
    }
    .pay-text {
      height: 22px;
      font-size: 23px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #c9c9c9;
    }
  }
  .pay-title {
    height: 27px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #c1c1c1;
    line-height: 16px;
    width: 190px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
  .pay-img {
    width: 165px;
    height: 30px;
    margin-top: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
