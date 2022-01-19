<!--
 * @Author: your name
 * @Date: 2022-01-13 17:43:39
 * @LastEditTime: 2022-01-19 15:37:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/views/home/components/home-header.vue
-->
<template>
  <div class="home-header">
    <div class="bg-img">
      <img :src="headerImg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "home-header",
  data() {
    return {
      headerImg: require("@/assets/image/heder-img.png"),
    };
  },
};
</script>

<style scoped lang="less">
.home-header {
  width: 100%;
  .bg-img {
    width: 100%;
    // top: -100px;
    //height: 500px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
