<!--
 * @Author: your name
 * @Date: 2022-04-21 13:49:40
 * @LastEditTime: 2022-07-14 09:34:21
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
          <!-- <span v-if="userInfo.pocket.gold"
            >P币: {{ (userInfo.pocket.gold / 100).toFixed(0) }}</span
          > -->
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
      token: (state) => state.summaryModule.token,
      userInfo: (state) => state.summaryModule.userInfo,
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
  height: 40px;
  line-height: 40px;
  background-color: RGBA(251, 152, 51, 1);
  border-radius: 30px;
  padding: 0 6px 0 12px;
  border: 1px solid #08050e;
  .login-title {
    font-size: 13px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #08050e;
    margin-right: 10px;
  }
  .login-btn {
    width: 63px;
    height: 30px;
    line-height: 30px;
    background: #ffffff;
    border-radius: 30px;
    border: 1px solid #08050e;
    text-align: center;
  }
  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;
    background: #ffffff;
    border-radius: 30px;
    border: 1px solid #08050e;
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
