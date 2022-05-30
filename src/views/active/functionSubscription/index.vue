<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 11:15:40
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-30 14:08:23
 * @FilePath: /h5-active-v2/src/views/active/functionSubscription/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>这是功能订阅</div>
</template>

<script>
export default {
  name: "activeFunctionPage",
  data() {
    // MIDFUNC_PRO_455D 618活动专业版15个月
    // MIDSVIP_455D 618活动专业版和绘画版15个月(赠送158PB)
    return {
      payInfo: {
        title: "618活动专业版15个月",
        snId: "MIDFUNC_PRO_455D",
      },
    };
  },
  methods: {
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
    handleChangeSelectContent(info) {
      this.$emit("handleChangeSelectContent", info);
    },
    handlePayDialog() {
      this.$emit("handlePayDialog");
    },
  },
};
</script>

<style lang="less" scoped></style>
