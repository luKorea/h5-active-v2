<!--
 * @Author: korealu
 * @Date: 2022-03-03 16:03:30
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-13 14:36:42
 * @Description: file content
 * @FilePath: /h5-active-v2/src/components/pay/index.vue
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
        <!-- 这里展示用户选中的商品信息 -->
        <div class="pay-title">{{ payInfo.title }}</div>
        <div class="pay-title" style="margin-top: 26px; font-size: 12px">
          {{ payInfo.subTitle }}
        </div>
        <!-- 这里展示用户的基本信息 -->
        <div class="user-info">
          <div class="user-avatar">
            <img :src="userInfo.iconUrl" alt="" referrerpolicy="no-referrer" />
          </div>
          <div class="user-tip">
            <div class="user-id">POFI ID: {{ userInfo.nickId }}</div>
          </div>
        </div>
        <!-- 充值说明 -->
        <div class="pay-info" v-if="!payInfo.desc">
          充值说明：请仔细核对充值 Pofi ID，充值完成后不支持退款。
        </div>
        <div class="pay-info" v-else>
          {{ payInfo.desc }}
        </div>
        <div class="pay-btn">
          <div class="wechat-pay" @click="payWechat">
            <img :src="wechatPay" alt="" />
          </div>
          <div class="ali-pay" @click="payAli">
            <img :src="aliPay" alt="" />
          </div>
        </div>
      </div>
    </template>
  </korea-dialog>
</template>

<script>
import KoreaDialog from "@/components/korea-dialog/korea-dialog.vue";
export default {
  name: "payModal",
  components: {
    KoreaDialog,
  },
  props: {
    payInfo: {
      type: Object,
      default: () => {},
    },
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showDialog: false,
      aliPay: require("@/assets/image/alipay.png"),
      wechatPay: require("@/assets/image/wechatpay.png"),
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
    payWechat() {
      this.$emit("payWechat");
    },
    payAli() {
      this.$emit("payAli");
    },
    payMoney() {
      this.$emit("payMoney");
    },
  },
};
</script>

<style lang="less" scoped>
.pay-wrap {
  position: absolute;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  .pay-title {
    position: absolute;
    top: 20px;
    height: 18px;
    font-size: 15px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #c9c9c9;
  }
  .pay-info {
    position: absolute;
    top: 120px;
    font-size: 12px;
    line-height: 16px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #c9c9c9;
    width: 70%;
  }
  .user-info {
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .user-avatar {
      width: 43px;
      height: 43px;
      margin-right: 10px;
      img {
        width: 43px;
        height: 43px;
        border: 2px solid #da842e;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }
    .user-tip {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #79797e;
      .user-id {
        // margin-bottom: 6px;
      }
      //   justify-content: space-evenly;
    }
  }
  .pay-btn {
    display: flex;
    // margin-top: 15px;
    position: absolute;
    top: 180px;
    width: 100%;
    justify-content: center;
    align-items: center;
    .ali-pay {
      width: 102px;
      height: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .wechat-pay {
      width: 102px;
      height: 30px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
