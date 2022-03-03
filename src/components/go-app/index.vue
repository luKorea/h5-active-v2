<!--
 * @Author: korealu
 * @Date: 2022-03-03 16:03:30
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-03 16:37:43
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
      <div class="app-wrap">
        <div class="app-title">{{ title }}</div>
        <div class="app-img" @click="goApp">
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
    },
  },
};
</script>

<style lang="less" scoped>
.app-wrap {
  position: absolute;
  top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  .app-title {
    height: 14px;
    font-size: 13px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #b8b8b8;
    line-height: 18px;
  }
}
</style>
