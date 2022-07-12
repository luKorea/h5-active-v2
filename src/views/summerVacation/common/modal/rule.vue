<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-12 15:41:46
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-12 16:02:07
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
        <div class="title">活动规则</div>
        <div class="desc-wrap">
          <template v-if="list && list.length > 0">
            <div v-for="(item, index) in list" :key="index" class="item">
              {{ item }}
            </div>
          </template>
        </div>
      </div>
    </template>
  </korea-dialog>
</template>

<script>
import koreaDialog from "@/components/korea-dialog/korea-dialog";
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
export default {
  name: "H5ActiveV2Rule",
  components: {
    koreaDialog,
  },
  data() {
    return {
      bgImg: BASE_IMAGE_SUMMARY_URL + "/rule-bg.png",
      showDialog: false,
      list: [
        "1. 活动时间：2022年7月15日-8月31日，本次活动优惠和奖励仅限活动期间内完成；",
        "2. 本次充值或赠送的物品均为直接发放到对应Pofi ID中，请在支付前仔细确认到账的Pofi ID；",
        "3. 本优惠仅限当前活动页中参与获得，APP内充值无法享受此优惠，本活动不参与其他充值优惠活动；",
        "4. 本活动内容属于虚拟服务，支付成功无法主动申请退款，如遇订单失败或数据异常，请联系客服处理；",
        "5. 请仔细浏览本活动规则与说明，参与本活动将视为充分理解和接受并认可本次活动规则。",
      ],
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
  .desc-wrap {
    position: relative;
    top: 20px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #c9c9c9;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
    padding-top: 90px;
    box-sizing: border-box;
    .item {
      margin-bottom: 10px;
      line-height: 30px;
    }
  }
}
</style>
