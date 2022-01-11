<template>
  <div class="home-container">
    <korea-dialog
      :show-dialog="showDialog"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #content>
        <img
          src="https://img01.yzcdn.cn/vant/apple-3.jpg"
          width="100"
          height="100"
        />
      </template>
    </korea-dialog>

    <desc-component />
    <footer-component></footer-component>
  </div>
</template>

<script>
// @ is an alias to /src
import descComponent from "./components/desc";

import KoreaDialog from "@/components/korea-dialog/korea-dialog";
import { tipDialog } from "@/utils/dialog";
import FooterComponent from "@/views/home/components/footer";
export default {
  name: "Home",
  components: { FooterComponent, KoreaDialog, descComponent },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    show() {
      tipDialog("测试标题", "这是测试数据")
        .then(() => {
          console.log("开始做事情");
        })
        .catch(() => {
          console.log("不做任何事情");
        });
      // this.showDialog = !this.showDialog;
    },
    handleConfirm(e) {
      this.showDialog = e;
    },
    handleCancel(e) {
      this.showDialog = e;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
}
</style>
