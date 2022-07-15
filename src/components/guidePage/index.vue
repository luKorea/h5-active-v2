<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-14 20:55:07
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-14 20:57:27
 * @FilePath: /h5-active-v2/src/components/guidePage/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-overlay
    @click="showDialog = false"
    :show="showDialog"
    z-index="999"
    :lock-scroll="false"
  >
    <div class="over-wrap">
      <div class="over-img">
        <img :src="arrowImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="over-info">
        <div class="over-text">点击右上角按钮，在默认浏览器打开</div>
        <div class="over-room">
          <img :src="roomImg" alt="" referrerpolicy="no-referrer" />
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: "guidePage",
  data() {
    return {
      showDialog: false,
      arrowImg: require("@/assets/image/arrow.png"),
      roomImg: require("@/assets/image/rom.png"),
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped></style>
