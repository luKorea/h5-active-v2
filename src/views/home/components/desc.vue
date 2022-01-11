<template>
  <div class="desc-wrap">
    <template v-if="list && list.length > 0">
      <div v-for="(item, index) in list" :key="index">
        {{ index + 1 }}. {{ item }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "descComponent",
  data() {
    return {
      list: [
        "活动时间：2022年1月30日-2月7日，本次活动优惠和奖励仅限活动期间内完成；",
        "本次充值或赠送的物品均为直接发放到对应Pofi ID中，请在支付前仔细确认到账的Pofi ID；",
        "福利2中，若领取到的限定人偶与原Pofi ID的人偶库重复，则限定人偶自动换算成18P币；",
        "福利2中，活动结束后15天内，若仍未主动领取或抽取奖品，奖品将以18P币的形式自动发放到对应Pofi ID；",
        "本优惠仅限当前活动页中参与获得，APP内充值无法享受此优惠，本活动不参与其他充值优惠活动；",
        "本活动内容属于虚拟服务，支付成功无法主动申请退款，如遇订单失败或数据异常，请添加QQ群674228277，联系客服处理；",
        "请仔细浏览本活动规则与说明，参与本活动将视为充分理解和接受并认可本次活动规则。",
        "本活动页面将于结束后15天内关闭。",
      ],
    };
  },
};
</script>

<style scoped lang="less">
.desc-wrap {
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 300;
  color: #efefef;
  line-height: 20px;
  margin: 40px;
}
</style>
