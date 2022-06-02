<!--
 * @Author: your name
 * @Date: 2022-04-21 13:49:40
 * @LastEditTime: 2022-06-02 10:24:11
 * @LastEditors: korealu 643949593@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/components/user-info/user-info.vue
-->
<template>
  <div class="base-wrap">
    <template v-if="!token">
      <div class="login-title">登录后参与活动 >></div>
      <div class="login-btn" @click="handleLoginDialog">点击登录</div>
    </template>
    <template v-else>
      <div class="login-title">当前账号</div>
      <div class="user-info">
        <div class="avatar">
          <img :src="userInfo.iconUrl" alt="" referrerpolicy="no-referrer" />
        </div>
        <div class="user-id">
          <span style="margin-right: 10px"
            >Pofi ID : {{ userInfo.nickId }}</span
          >
          <span v-if="userInfo.pocket.gold"
            >P币: {{ userInfo.pocket.gold / 100 }}</span
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "userInfoComponent",
  computed: {
    ...mapState({
      token: (state) => state.activeModule.token,
      userInfo: (state) => state.activeModule.userInfo,
    }),
  },
  methods: {
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
  },
};
</script>

<style lang="less" scoped>
.base-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 31px;
  line-height: 31px;
  background-color: rgba(225, 230, 255, 1);
  border-radius: 16px;
  padding: 0 6px 0 12px;
  .login-title {
    font-size: 13px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #08050e;
    margin-right: 10px;
  }
  .login-btn {
    width: 63px;
    height: 24px;
    line-height: 24px;
    background: #ffffff;
    border-radius: 12px;
    text-align: center;
  }
  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    line-height: 24px;
    background: #ffffff;
    border-radius: 12px;
    padding: 0 14px 0 4px;
    .avatar {
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      img {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        background-color: #ccc;
      }
    }
    .user-title {
      font-size: 11px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #000000;
    }
  }
}
</style>
