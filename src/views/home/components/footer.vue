<template>
  <div class="footer-container">
    <div class="wrap">
      <div class="logo">
        <img :src="logoImg" referrerpolicy="no-referrer" alt="logo" />
      </div>
      <div class="driver">
        <img :src="drivar" alt="" />
      </div>
      <div class="qrcode">
        <img :src="qrcode" referrerpolicy="no-referrer" alt="" />
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
      logoImg: require("@/assets/image/logo.png"),
      qrcode: require("@/assets/image/qrcode.png"),
      drivar: require("@/assets/image/drivar.png"),
      copyTitle: "本活动由Pofi无限人偶提供 | Pofi，让绘画，更简单。",
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
