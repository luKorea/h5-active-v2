<!--
 * @Author: korealu
 * @Date: 2022-03-01 16:42:05
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-04 10:27:11
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/footer/index.vue
-->
<template>
  <div class="footer-container">
    <template v-if="showRules">
      <div class="desc-title">活动规则</div>
      <div class="desc-wrap">
        <template v-if="list && list.length > 0">
          <div v-for="(item, index) in list" :key="index">
            {{ item }}
          </div>
        </template>
      </div>
    </template>
    <div class="wrap">
      <div class="logo">
        <img :src="logoImg" referrerpolicy="no-referrer" alt="logo" />
      </div>
      <div class="driver">
        <img :src="drivar" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="qrcode">
        <img :src="qrcode" referrerpolicy="no-referrer" alt="" />
      </div>
    </div>
    <div class="copyright">{{ copyTitle }}</div>
  </div>
</template>

<script>
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
export default {
  name: "footerComponent",
  props: {
    showRules: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      logoImg: BASE_IMAGE_ANNIVERSARY_URL + "/logo.png",
      qrcode: BASE_IMAGE_ANNIVERSARY_URL + "/qrcode.png",
      drivar: BASE_IMAGE_ANNIVERSARY_URL + "/drivar.png",
      copyTitle: "本活动由Pofi无限人偶提供 | Pofi，让绘画，更简单。",
      list: [
        "1、活动时间：2022年3月14日-3月31日，本次活动优惠和奖励仅限活动期间内完成；",
        "2、本次充值或赠送的物品均为直接发放到对应Pofi ID中，请在支付前仔细确认到账的Pofi ID；",
        "3、活动中，若领取到的限定人偶与原Pofi ID的人偶库重复，则限定人偶自动换算成18P币；",
        "4、本优惠仅限当前活动页中参与获得，APP内充值无法享受此优惠，本活动不参与其他充值优惠活动；",
        "5、本活动内容属于虚拟服务，支付成功无法主动申请退款，如遇订单失败或数据异常，请添加QQ群430030135，联系客服处理；",
        "6、请仔细浏览本活动规则与说明，参与本活动将视为充分理解和接受并认可本次活动规则。",
      ],
    };
  },
};
</script>

<style scoped lang="less">
.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .desc-title {
    text-align: center;
    height: 11px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #b8b8b8;
    line-height: 25px;
  }
  .desc-wrap {
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #b8b8b8;
    line-height: 25px;
    margin: 20px 30px 30px 30px;
  }
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 135px;
      height: 103px;
      margin-right: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .driver {
      width: 1px;
      height: 13px;
      margin-right: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .qrcode {
      width: 102px;
      height: 102px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .copyright {
    text-align: center;
    font-size: 12px;
    color: rgb(145, 145, 145);
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>
