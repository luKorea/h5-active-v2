<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 11:06:33
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-01 10:20:09
 * @FilePath: /h5-active-v2/src/views/active/common/fixed/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
    <div class="app-service" @click="goPage('home')" v-if="selectPage !== 1">
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
  props: {
    selectPage: {
      type: Number,
      default: 0,
    },
  },
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
      } else if (type === "home") {
        this.$emit("openPage", 1);
        this.$router.replace({
          path: "/active",
        });
      } else this.$emit("handleLoginDialog", true);
    },
  },
};
</script>

<style lang="less" scoped>
.info-fixed {
  position: fixed;
  right: 0;
  top: 200px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  background-color: RGBA(34, 35, 41, 0.5);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 6px 4px 6px 8px;
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
    margin-top: 6px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .app-service {
    width: 43px;
    height: 43px;
    margin-top: 6px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
