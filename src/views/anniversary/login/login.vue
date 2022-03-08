<!--
 * @Author: korealu
 * @Date: 2022-03-01 16:42:42
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-08 15:47:46
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/login/login.vue
-->
<template>
  <div class="anniversary-login">
    <div class="login-img">
      <img :src="imgUrl" alt="" referrerpolicy="no-referrer" />
    </div>
    <div class="img-wrap">
      <div class="img" @click="showModal">
        <img :src="leftImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="img" @click="showModal">
        <img :src="rightImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
    <div class="login-wrap">
      <div class="login-panel">
        <div class="login-title">周年庆典大礼包</div>
        <div class="input-wrap">
          <input
            placeholder="请输入你的手机号"
            type="text"
            class="input-text"
            style="margin-bottom: 18px"
            v-model="formData.no"
          />
          <input
            placeholder="请输入密码"
            v-model="formData.pwd"
            class="input-text"
            type="password"
          />
        </div>
        <div class="login-btn" @click="sendData">立即登录</div>
      </div>
    </div>
    <anniversary-footer :showRules="false"></anniversary-footer>
  </div>
</template>

<script>
import AnniversaryFooter from "../footer";
import { Dialog } from "vant";
import { errorInfo, successInfo } from "@/utils";
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
import md5 from "md5";
import { getCode } from "@/utils/getCode";
import localCache from "@/utils/cache";
export default {
  components: {
    AnniversaryFooter,
  },
  data() {
    return {
      imgUrl: BASE_IMAGE_ANNIVERSARY_URL + "/login-img.png",
      leftImg: BASE_IMAGE_ANNIVERSARY_URL + "/one.png",
      rightImg: BASE_IMAGE_ANNIVERSARY_URL + "/two.png",
      formData: {
        //    17665142384----A1
        //  18075125940----A2
        //  15360461319---B1
        no: "",
        pwd: "",
      },
    };
  },
  mounted() {
    if (this._isWechat()) {
      if (localCache.getCache("openId") == null) {
        getCode("wx96b7fe260df0d200", this.$route.query.code);
        return;
      }
    }
    document.title = "POFI 周年庆典";
  },
  methods: {
    _isWechat() {
      return navigator.userAgent.match(/micromessenger/i);
    },
    showModal() {
      Dialog.alert({
        message: "登录立即参与",
      });
    },
    sendData() {
      if (this.formData.no === "" || this.formData.pwd === "") {
        errorInfo("请输入用户名和密码");
        return;
      } else {
        const _this = this;
        const data = {
          ..._this.formData,
          pwd: md5(_this.formData.pwd).toUpperCase(),
        };
        _this.$store
          .dispatch("anniversaryModule/loginAction", data)
          .then((res) => {
            successInfo("登录成功");
            this.$router.push({
              path: res === "B1" ? "/ordinaryRecommend" : "/poseRecommend",
              // query: {
              //   type: res,
              // },
            });
          })
          .catch((err) => errorInfo(err));
      }
    },
  },
};
</script>

<style lang="less" scoped>
.anniversary-login {
  width: 100%;
  display: flex;
  flex-direction: column;
  .login-img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img-wrap {
    display: flex;
    justify-content: space-evenly;
    margin-top: -175px;
    .img {
      width: 134px;
      height: 124px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .login-wrap {
    margin: 30px;
    .login-panel {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      width: 100%;
      background: #343537;
      border-radius: 18px;
      padding: 20px 0;
      .login-title {
        text-align: center;
        font-size: 21px;
        font-family: Source Han Serif SC;
        font-weight: bold;
        color: #d4ae82;
        line-height: 22px;
      }
      .input-wrap {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        .input-text {
          width: 270px;
          height: 37px;
          line-height: 37px;
          background: #737373;
          border-radius: 18px;
          border-color: #737373;
          padding: 6px 0 8px 14px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
      }
      .login-btn {
        margin-top: 20px;
        width: 119px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #d4ae82;
        border-radius: 18px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #0f0f0f;
      }
    }
  }
}
</style>
