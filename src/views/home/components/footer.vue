<template>
  <div class="footer-container">
    <div class="wrap">
      <div class="logo">
        <img :src="logoImg" alt="logo" />
      </div>
      <div class="driver"></div>
      <div class="qrcode">
        <img :src="qrcode" alt="" />
      </div>
    </div>
    <div class="copyright">{{ copyTitle }}</div>
  </div>
</template>

<script>
export default {
  name: "footerComponent",
  data() {
    return {
      logoImg: "https://f3.pofiapp.com/draw/pofi_logo.png",
      qrcode: "https://f3.pofiapp.com/draw/pofi_wechat_qrcode.jpg",
      copyTitle: "本活动由Pofi无限人偶提供 | Pofi，让绘画，更简单。",
    };
  },
};
</script>

<style scoped lang="less">
.footer-container {
  display: flex;
  flex-direction: column;
  margin: 40px;
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 230px;
      height: 177px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
