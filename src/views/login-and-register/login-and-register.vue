<template>
  <korea-dialog :show-dialog="showDialog" @closeDialog="closeDialog">
    <template #content>
      <div class="login-content" v-if="status === 1">
        <div class="title">用户登录</div>
        <div class="input-wrap">
          <input
            placeholder="请输入你的手机号"
            type="text"
            class="input-text"
            style="margin-bottom: 6px"
            v-model="formData.no"
          />
          <input
            placeholder="请输入密码"
            v-model="formData.pwd"
            class="input-text"
            type="password"
          />
        </div>
        <div class="btn-wrap">
          <div class="btn" @click="handleLogin">登录</div>
          <div class="btn" @click="handleRegister">注册</div>
        </div>
      </div>
      <div
        class="animate__animated animate__backInLeft register-content"
        v-else
      >
        <div class="title">请前往Pofi无限人偶App注册账号</div>
        <div class="app-img" @click="goApp">
          <img :src="appImg" alt="" />
        </div>
      </div>
    </template>
  </korea-dialog>
</template>

<script>
import koreaDialog from "@/components/korea-dialog/korea-dialog";
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";
import md5 from "md5";

export default {
  name: "loginAndRegister",
  components: { koreaDialog },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      status: 1, // 1. 登录 2. 注册
      appImg: require("@/assets/image/go-app.png"),
      formData: {
        no: "15360461319",
        pwd: "123456",
      },
    };
  },
  methods: {
    closeDialog() {
      if (this.status === 2) {
        this.status = 1;
      } else {
        this.$emit("closeDialog", false);
      }
    },
    handleRegister() {
      this.status = 2;
    },
    handleLogin() {
      this.$emit("handleLogin", {
        no: this.formData.no,
        pwd: md5(this.formData.pwd).toUpperCase(),
      });
    },
    goApp() {
      openUrl(urlLink.appLink);
    },
  },
};
</script>

<style lang="less" scoped>
.login-content {
  position: absolute;
  top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 23px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #c9c9c9;
  .input-wrap {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .input-text {
      width: 275px;
      height: 35px;
      line-height: 35px;
      background: #737373;
      border-radius: 18px;
      border-color: #737373;
      padding: 10px 0 8px 14px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
  }
  .btn-wrap {
    display: flex;
    .btn {
      width: 102px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ff264a;
      border-radius: 15px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #f9f9f9;
      margin-top: 20px;
      margin-right: 22px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.register-content {
  position: absolute;
  top: 92px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 13px;
  font-family: Source Han Sans CN;
  font-weight: 300;
  color: #b8b8b8;
  line-height: 18px;
  .app-img {
    width: 165px;
    height: 30px;
    margin-top: 46px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
