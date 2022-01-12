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
      headerImg: require("@/assets/image/home-header.png"),
    };
  },
};
</script>

<style scoped lang="less">
.home-header {
  width: 100%;
  .bg-img {
    width: 100%;
    top: -100px;
    //height: 500px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
