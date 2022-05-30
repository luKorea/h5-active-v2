<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 11:17:44
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-30 11:56:35
 * @FilePath: /h5-active-v2/src/views/active/rechargeDiscounts/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 11:15:40
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-30 11:15:42
 * @FilePath: /h5-active-v2/src/views/active/functionSubscription/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>activeRechargeDiscountsPage</div>
</template>

<script>
export default {
  name: "activeRechargeDiscountsPage",
  methods: {
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
    handlePayDialog() {
      this.$emit("handlePayDialog");
    },
  },
};
</script>

<style lang="less" scoped></style>
