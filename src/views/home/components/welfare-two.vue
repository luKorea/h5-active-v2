<template>
  <div class="welfare-one-wrap" id="welfareTwo">
    <div class="bg-img">
      <img :src="bgImg" alt="" />
    </div>
    <div class="user-info">
      <div class="common-user-id">
        <div class="left-text">当前用户</div>
        <div class="right-white">
          <div class="left-circle"></div>
          <div class="right-text">Pofi ID : 2568926</div>
        </div>
      </div>
    </div>
    <div class="send-buy">
      <div class="send-info" @click="showPayDialog">立即购买</div>
    </div>

    <div class="join-us">
      <div class="user-join-wrap">
        <div class="user-join-item" @click="copyLink">
          <div class="item-add"></div>
          <div class="item-title">邀请队友</div>
        </div>
        <div class="user-join-item" @click="copyLink">
          <div class="item-add"></div>
          <div class="item-title">邀请队友</div>
        </div>
        <!--        <div class="user-join-item">-->
        <!--          <div class="item-add"></div>-->
        <!--          <div class="item-title">邀请队友</div>-->
        <!--        </div>-->
        <!--        <div class="user-join-item">-->
        <!--          <div class="item-add"></div>-->
        <!--          <div class="item-title">邀请队友</div>-->
        <!--        </div>-->
      </div>
    </div>
    <div class="join-success">
      <div class="user-join-success">组队成功</div>
    </div>

    <div class="user-info-join">
      <div class="common-user-id">
        <div class="left-text">当前用户</div>
        <div class="right-white">
          <div class="left-circle"></div>
          <div class="right-text">Pofi ID : 2568926</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { copyShareLink } from "@/utils";

export default {
  name: "welfare-two",
  data() {
    return {
      bgImg: require("@/assets/image/welfare-bg-two.png"),
    };
  },
  methods: {
    showPayDialog() {
      this.$emit("handleDialog", "fuliTwo");
    },
    copyLink() {
      copyShareLink(window.location.href, this);
    },
  },
};
</script>

<style scoped lang="less">
.welfare-one-wrap {
  width: 100%;
  position: relative;
  margin-top: 10px;
  .bg-img {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user-info {
    position: absolute;
    top: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .user-info-join {
    position: absolute;
    top: 870px;
    left: 90px;
  }
  .send-buy {
    position: absolute;
    top: 290px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    .send-info {
      width: 153px;
      height: 39px;
      line-height: 39px;
      text-align: center;
      background: #ffffff;
      box-shadow: 0 3px 4px 1px rgba(0, 0, 0, 0.35);
      border-radius: 14px;
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ba2b2a;
    }
  }
  .join-us {
    position: absolute;
    top: 490px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .join-success {
    position: absolute;
    top: 620px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
