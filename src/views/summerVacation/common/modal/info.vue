<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-12 15:41:46
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-12 16:35:21
 * @FilePath: /h5-active-v2/src/views/summerVacation/common/modal/rule.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <korea-dialog
    :show-dialog="showDialog"
    @closeDialog="closeDialog"
    @confirm="handleConfirm"
    @cancel="handleCancel"
    :bgImg="bgImg"
  >
    <template #content>
      <div class="wrap">
        <div class="title">Pofi「用户协议」</div>
        <div class="wrap">
          <div class="img-wrap">
            <img :src="infoImg" alt="" referrerpolicy="no-referrer" />
          </div>
        </div>
      </div>
    </template>
  </korea-dialog>
</template>

<script>
import koreaDialog from "@/components/korea-dialog/korea-dialog";
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
export default {
  name: "H5ActiveV2Info",
  components: {
    koreaDialog,
  },
  data() {
    return {
      bgImg: BASE_IMAGE_SUMMARY_URL + "/rule-bg.png",
      infoImg: BASE_IMAGE_SUMMARY_URL + "/user-info.png",
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
  },
};
</script>

<style lang="less" scoped>
.wrap {
  position: absolute;
  top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  .title {
    font-size: 23px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #c9c9c9;
  }
  .wrap {
    width: 80%;
    max-height: 400px;
    overflow: hidden;
    overflow-y: scroll;
    padding-top: 20px;
    padding-bottom: 20px;
    box-sizing: border-box;
    .img-wrap {
      width: 100%;
      min-height: 100%;
      img {
        width: 100%;
        min-height: 100%;
      }
    }
  }
}
</style>
