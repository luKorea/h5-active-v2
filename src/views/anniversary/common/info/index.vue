<!--
 * @Author: korealu
 * @Date: 2022-03-02 10:44:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-02 11:29:55
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/common/info/index.vue
-->
<template>
  <div class="info-fixed">
    <div class="info-avatar">
      <img :src="avatarImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <div class="app-logo" @click="goApp">
      <img :src="logoImg" alt="" referrerpolicy="no-referrer" />
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";
export default {
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
