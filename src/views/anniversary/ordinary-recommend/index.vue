<!--
 * @Author: korealu
 * @Date: 2022-03-04 10:31:25
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-11 12:02:17
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/ordinary-recommend/index.vue
-->
<template>
  <div class="ordinary-recommend">
    <!-- 固定按钮 -->
    <div class="fixed-wrap">
      <template v-for="item in list">
        <div class="item" :key="item.id" @click="changeBtnClick(item)">
          <img
            :src="selectBtnIndex === item.id ? item.img : item.selectImg"
            alt=""
            referrerpolicy="no-referrer"
          />
        </div>
      </template>
    </div>
    <!-- 头部区域 -->
    <div class="ordinary-img">
      <img :src="bgImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <info-fixed :userInfo="userInfo"></info-fixed>
    <count-down></count-down>
    <div class="content-wrap">
      <!-- 周年庆优惠 -->
      <anniver-component ref="one" @goAnchor="goAnchor"></anniver-component>
      <!-- pose特价库 -->
      <pose-component ref="two"></pose-component>
      <!-- 充值送限定人偶 -->
      <even-component
        ref="three"
        :userInfo="userInfo"
        @openPayModal="handleChangePayModal"
      ></even-component>
      <!-- 功能订阅 -->
      <fun-component
        ref="four"
        :userInfo="userInfo"
        @openPayModal="handleChangePayModal"
      ></fun-component>
      <!-- 人偶礼包 -->
      <shop-component ref="five"></shop-component>
    </div>
    <!-- 第三方链接 -->
    <send-link></send-link>
    <anniversary-footer></anniversary-footer>

    <!-- 普通用户充值逻辑放这里 -->
    <!-- 支付弹框 -->
    <pay-component
      ref="payRef"
      @payWechat="payWechat"
      @payAli="payAli"
      :payInfo="payInfo"
      :userInfo="userInfo"
    ></pay-component>
  </div>
</template>

<script>
import AnniversaryFooter from "../footer";
import InfoFixed from "../common/info";
import CountDown from "../common/count-down";
import SendLink from "../common/part";
import PayComponent from "@/components/pay";

import AnniverComponent from "./components/anniver.vue";
import PoseComponent from "./components/pose.vue";
import EvenComponent from "./components/even.vue";
import FunComponent from "./components/fun.vue";
import ShopComponent from "./components/shop.vue";

import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
import urlLink from "@/utils/link";
import { aliPayAction, wechatPayAction } from "@/utils/pay-config";
import { successInfo, errorInfo } from "@/utils";
import { getUserAccount, checkUserBug } from "@/api/anniversary";
import localCache from "@/utils/cache";
import smoothscroll from "smoothscroll-polyfill";
// import { getCode } from "@/utils/getCode";
export default {
  name: "ordinaryRecommend",
  components: {
    AnniversaryFooter,
    SendLink,
    InfoFixed,
    CountDown,
    PayComponent,
    AnniverComponent,
    PoseComponent,
    EvenComponent,
    FunComponent,
    ShopComponent,
  },
  // computed: {
  //   userInfo() {
  //     return this.$store.state.anniversaryModule.userInfo;
  //   },
  // },
  data() {
    return {
      userInfo: {},
      payInfo: {},
      bgImg: BASE_IMAGE_ANNIVERSARY_URL + "/bg.png",
      selectBtnIndex: "one",
      list: [
        {
          id: "one",
          selectImg:
            BASE_IMAGE_ANNIVERSARY_URL +
            "/ordinary-recommend/btn/select-one.png",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/btn/one.png",
        },
        {
          id: "two",
          selectImg:
            BASE_IMAGE_ANNIVERSARY_URL +
            "/ordinary-recommend/btn/select-two.png",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/btn/two.png",
        },
        {
          id: "three",
          selectImg:
            BASE_IMAGE_ANNIVERSARY_URL +
            "/ordinary-recommend/btn/select-three.png",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/btn/three.png",
        },
        {
          id: "four",
          selectImg:
            BASE_IMAGE_ANNIVERSARY_URL +
            "/ordinary-recommend/btn/select-four.png",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/btn/four.png",
        },
        {
          id: "five",
          selectImg:
            BASE_IMAGE_ANNIVERSARY_URL +
            "/ordinary-recommend/btn/select-five.png",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/btn/five.png",
        },
      ],
      selectShopInfo: {},
    };
  },
  created() {
    if (this.$store.state.anniversaryModule.token === null) {
      this.$router.push({
        path: "/Ann2022",
      });
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   window.addEventListener(
    //     "scroll",
    //     () => {
    //       this.handleScroll();
    //     },
    //     true
    //   );
    // });
    document.title = "POFI 周年庆典";
    if (this.$route.state === "success") {
      successInfo("充值成功");
    }
    const store = this.$store.state.anniversaryModule;
    this.getAccount({
      uid: store.uid,
      loginKey: store.token,
    });
  },
  methods: {
    handleScroll() {
      const bodyScrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      const list = [
        {
          offsetTop: this.$refs["one"].$el.offsetTop,
          id: "one",
        },
        {
          offsetTop: this.$refs["two"].$el.offsetTop,
          id: "two",
        },
        {
          offsetTop: this.$refs["three"].$el.offsetTop,
          id: "three",
        },
        {
          offsetTop: this.$refs["four"].$el.offsetTop,
          id: "four",
        },
        {
          offsetTop: this.$refs["five"].$el.offsetTop,
          id: "five",
        },
      ];
      const _this = this;
      for (let i = 0; i < list.length; i++) {
        if (bodyScrollTop > list[i].offsetTop - 100) {
          if (_this.selectBtnIndex !== list[i].id) {
            _this.selectBtnIndex = list[i].id;
          }
        } else {
          break;
        }
      }
    },
    getAccount(data) {
      getUserAccount(data).then((res) => {
        if (res.code === 200) {
          this.userInfo = {
            ...this.$store.state.anniversaryModule.userInfo,
            ...res.data,
          };
          localCache.setCache("userAccount", res.data);
        }
      });
    },
    changeBtnClick(item) {
      // document.removeEventListener("scroll", this.handleScroll, false);
      if (item.id === this.selectBtnIndex) return;
      this.selectBtnIndex = item.id;
      smoothscroll.polyfill();
      this.$refs[item.id].$el.scrollIntoView({
        behavior: "smooth",
      });
    },
    goAnchor(el) {
      // document.removeEventListener("scroll", this.handleScroll, false);
      this.selectBtnIndex = el;
      smoothscroll.polyfill();
      this.$refs[el].$el.scrollIntoView({
        behavior: "smooth",
      });
    },
    handleChangePayModal(type, info) {
      this.selectShopInfo = info;
      switch (type) {
        case "mina":
          this.payInfo = {
            title: "充值128送米诺",
            id: "AMINO",
          };
          break;
        case "pro":
          this.payInfo = {
            title: "充值专业版",
            id: "AFUNC_PRO_455D_B",
          };
          break;
        case "svip":
          this.payInfo = {
            title: "充值SVIP",
            id: "AFUNC_SVIP_455D",
          };
          break;
        case "draw":
          this.payInfo = {
            title: "充值绘画版一年",
            id: "AFUNC_PAINT_455D",
          };
          break;
      }
      const store = this.$store.state.anniversaryModule;
      const data = {
        uid: store.uid,
        loginKey: store.token,
        snId: this.payInfo.id,
      };
      this.checkUserBugInfo(data)
        .then(() => {
          this.$refs["payRef"].showDialog = true;
        })
        .catch((err) => errorInfo(err));
    },
    _isWechat() {
      return navigator.userAgent.match(/micromessenger/i);
    },
    checkUserBugInfo(data) {
      return new Promise((resolve, reject) => {
        checkUserBug(data).then((res) => {
          if (res.state) {
            resolve();
          } else reject(res.msg);
        });
      });
    },
    payWechat() {
      let data = {
        snId: this.payInfo.id,
        chargeType: 0,
        uid: this.$store.state.anniversaryModule.uid,
        loginKey: this.$store.state.anniversaryModule.token,
        appid: this._isWechat() ? urlLink.wechatAPPID : null,
        from: this._isWechat() ? 3 : 2,
        // remark: JSON.stringify({
        //   type: 8,
        // }),
        remark: "",
        returnUrl: `${window.location.href}?state=success`,
        openId: this._isWechat() ? localCache.getCache("openId") : null,
      };
      console.log(data, "data");
      wechatPayAction(data)
        .then(() => {
          successInfo("充值成功");
          this.$refs["payRef"].showDialog = false;
        })
        .catch((err) => errorInfo(err));
    },
    payAli() {
      let data = {
        snId: this.payInfo.id,
        chargeType: 1,
        uid: this.$store.state.anniversaryModule.uid,
        loginKey: this.$store.state.anniversaryModule.token,
        from: 2,
        // remark: JSON.stringify({
        //   type: 8,
        // }),
        remark: "",
        appid: urlLink.alipayAPPID,
        returnUrl: `${window.location.href}?state=success`,
      };
      console.log(data, "data");
      aliPayAction(data);
    },
  },
};
</script>

<style>
.content-wrap {
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  margin: 18px;
}
</style>
<style lang="less" scoped>
.ordinary-recommend {
  display: flex;
  flex-direction: column;
  width: 100%;
  .ordinary-img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .fixed-wrap {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    width: 100%;
    background-color: #0f0f0f;
    .item {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
