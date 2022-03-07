<!--
 * @Author: korealu
 * @Date: 2022-03-02 10:44:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-07 11:32:21
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/common/info/index.vue
-->
<template>
  <div class="info-fixed">
    <div class="info-avatar" @click="showLogoutDialog">
      <img :src="userInfo.iconUrl" alt="" referrerpolicy="no-referrer" />
    </div>
    <div class="app-logo" @click="goApp">
      <img :src="logoImg" alt="" referrerpolicy="no-referrer" />
    </div>

    <logout ref="logoutRef" @logout="logout"></logout>
  </div>
</template>

<script>
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";
import logout from "@/components/logout/logout.vue";
export default {
  components: { logout },
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      logoImg: BASE_IMAGE_ANNIVERSARY_URL + "/app-logo.png",
      avatarImg: BASE_IMAGE_ANNIVERSARY_URL + "/avatar.png",
    };
  },
  methods: {
    goApp() {
      openUrl(urlLink.appLink);
    },
    showLogoutDialog() {
      this.$refs["logoutRef"].showDialog = true;
    },
    logout() {
      this.$store.dispatch("anniversaryModule/logoutAction").then(() => {
        window.location.reload();
      });
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
  .info-avatar {
    width: 43px;
    height: 43px;
    margin-bottom: 8px;
    img {
      width: 43px;
      height: 43px;
      border: 2px solid #da842e;
      border-radius: 9px;
      box-sizing: border-box;
    }
  }
  .app-logo {
    width: 43px;
    height: 43px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
