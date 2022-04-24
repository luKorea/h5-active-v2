<!--
 * @Author: korealu
 * @Date: 2022-03-02 10:44:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-24 10:17:25
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/common/info/index.vue
-->
<template>
  <div class="info-fixed">
    <div class="app-user" v-if="token" @click="goPage('logout')">
      <img :src="userInfo.iconUrl" alt="" referrerpolicy="no-referrer" />
    </div>
    <div class="app-login" v-else @click="goPage('login')">
      <img :src="loginUrl" alt="" referrerpolicy="no-referrer" />
    </div>
    <div class="app-logo" @click="goPage('app')">
      <img :src="logoImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <div class="app-service" @click="goPage('service')">
      <img :src="serviceImg" alt="" referrerpolicy="no-referrer" />
    </div>
  </div>
</template>

<script>
import {
  BASE_IMAGE_VOTE_URL,
  BASE_IMAGE_ANNIVERSARY_URL,
} from "@/request/config";
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      token: (state) => state.voteModule.token,
      userInfo: (state) => state.voteModule.userInfo,
    }),
  },
  data() {
    return {
      logoImg: BASE_IMAGE_ANNIVERSARY_URL + "/app-logo.png",
      loginUrl: BASE_IMAGE_VOTE_URL + "/login.png",
      serviceImg: BASE_IMAGE_VOTE_URL + "/service.png",
    };
  },
  methods: {
    goPage(type) {
      if (type === "app") {
        openUrl(urlLink.appLink);
      } else if (type === "service") {
        openUrl(urlLink.voteQQLink);
      } else if (type === "logout") {
        this.$emit("handleLogout", "logout");
      } else this.$emit("handleLoginDialog", true);
    },
  },
};
</script>

<style lang="less" scoped>
.info-fixed {
  position: fixed;
  right: 6px;
  top: 280px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  .app-user {
    width: 43px;
    height: 43px;
    img {
      width: 43px;
      height: 43px;
      border: 2px solid #da842e;
      border-radius: 9px;
      box-sizing: border-box;
      // background-color: #ccc;
    }
  }
  .app-login {
    width: 43px;
    height: 43px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .app-logo {
    width: 43px;
    height: 43px;
    margin-top: 14px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .app-service {
    width: 43px;
    height: 43px;
    margin-top: 14px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
