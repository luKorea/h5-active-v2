<!--
 * @Author: korealu
 * @Date: 2022-03-02 10:44:39
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-07 16:57:11
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
    <div class="app-service" @click="goPage('service')">
      <img :src="serviceImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <div class="app-logo" @click="goPage('app')">
      <img :src="logoImg" alt="" referrerpolicy="no-referrer" />
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";
import { mapState } from "vuex";
export default {
  props: {
    selectPage: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState({
      token: (state) => state.summaryModule.token,
      userInfo: (state) => state.summaryModule.userInfo,
    }),
  },
  data() {
    return {
      logoImg: BASE_IMAGE_SUMMARY_URL + "/app.png",
      loginUrl: BASE_IMAGE_SUMMARY_URL + "/login.png",
      serviceImg: BASE_IMAGE_SUMMARY_URL + "/service.png",
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
  right: 0;
  top: 190px;
  z-index: 800;
  display: flex;
  flex-direction: column;
  background-color: rgba(239, 239, 235, 0.6);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 10px 4px 10px 8px;
  .app-user {
    width: 43px;
    height: 43px;
    img {
      width: 43px;
      height: 43px;
      // border: 2px solid #da842e;
      // border-radius: 9px;
      border-radius: 50%;
      box-sizing: border-box;
      // background-color: #ccc;
    }
  }
  .app-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 41px;
      height: 52px;
    }
  }
  .app-logo {
    margin-top: 6px;
    img {
      width: 41px;
      height: 53px;
    }
  }
  .app-service {
    margin-top: 6px;
    img {
      width: 41px;
      height: 52px;
    }
  }
}
</style>
