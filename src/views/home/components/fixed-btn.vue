<template>
  <div class="flex-wrap">
    <div class="flex-btn">
      <div class="flex-item" v-if="uid" @click="goPage('logout')">
        <div class="user-icon">
          <img :src="userInfo.iconUrl" alt="" referrerpolicy="no-referrer" />
          <div class="login-state">
            <img :src="loginStateImg" alt="" />
          </div>
        </div>
      </div>
      <div class="flex-item" v-else @click="goPage('login')">
        <div class="img1">
          <img :src="loginUrl" alt="" />
        </div>
        <div class="item-name">登录注册</div>
      </div>
      <div class="flex-item" @click="goPage('app')">
        <div class="img2">
          <img :src="linkUrl" alt="" />
        </div>
        <div class="item-name">打开APP</div>
      </div>
      <div class="flex-item" @click="goPage('prize')">
        <div class="img3">
          <img :src="prizeUrl" alt="" />
        </div>
        <div class="item-name">我的奖品</div>
      </div>
    </div>
  </div>
</template>

<script>
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";
import { mapState } from "vuex";

export default {
  name: "flex-btn",
  computed: {
    ...mapState(["uid", "userInfo"]),
  },
  data() {
    return {
      loginStateImg: require("@/assets/image/login-state.png"),
      loginUrl: require("@/assets/image/icon-user.png"),
      linkUrl: require("@/assets/image/icon-people.png"),
      prizeUrl: require("@/assets/image/icon-fuli.png"),
    };
  },
  methods: {
    goPage(type) {
      if (type === "app") {
        openUrl(urlLink.appLink);
      } else if (type === "prize" && this.uid) {
        this.$emit("handlePrizeDialog", true);
      } else if (type === "logout") {
        this.$emit("handleLogout", true);
      } else this.$emit("handleLoginDialog", true);
    },
  },
};
</script>

<style scoped lang="less">
.flex-wrap {
  position: fixed;
  right: 6px;
  top: 280px;
  z-index: 99;
  .flex-btn {
    display: flex;
    flex-direction: column;
    .flex-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 14px;
      width: 60px;
      background: linear-gradient(270deg, #81221d 26%, #fef6ea 100%);
      opacity: 0.45;
      border-radius: 22px;
      padding: 4px 2px;
      img {
        width: 100%;
        height: 100%;
      }
      .user-icon {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        position: relative;
        .login-state {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 14px;
          height: 14px;
        }
        img {
          border-radius: 50%;
        }
      }
      .img1 {
        width: 17px;
        height: 20px;
      }
      .img2 {
        width: 9px;
        height: 22px;
      }
      .img3 {
        width: 16px;
        height: 15px;
      }
      .item-name {
        font-size: 11px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: #ffffff;
        margin-top: 4px;
      }
    }
  }
}
</style>
