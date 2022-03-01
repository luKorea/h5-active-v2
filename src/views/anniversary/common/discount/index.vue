<!--
 * @Author: korealu
 * @Date: 2022-03-01 18:03:07
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 18:04:16
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/common/discount/index.vue
-->
<template>
  <div class="content-wrap">
    <div class="pose-youhui">
      <div class="youhui-title">
        <img :src="youhuiTitle" alt="" />
      </div>
      <div class="youhui-img">
        <img :src="youhuiImg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      youhuiTitle: require("@/assets/image/anniversary/pose-recommend/youhui.png"),
      youhuiImg: require("@/assets/image/anniversary/pose-recommend/youhui-link.png"),
    };
  },
};
</script>

<style lang="less" scoped>
.pose-youhui {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .youhui-title {
    width: 257px;
    height: 37px;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .youhui-img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
