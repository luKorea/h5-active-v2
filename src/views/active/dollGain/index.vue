<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 11:15:40
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-30 14:42:03
 * @FilePath: /h5-active-v2/src/views/active/functionSubscription/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 
  购买
/api/trade/purchase
618活动 大Q
snId: MIDIM191001241
tid: M191001241

页面 传inviteCode是他人页面
/api/event/mid22/config
have：1 已拥有
vote：1 已投票
recordList：组队用户信息

邀请 /api/event/mid22/invite 传uid

点赞 /api/event/mid22/like 传uid和inviteCode
 -->
<template>
  <div class="content-wrap">
    <div class="swiper-wrap">
      <div class="swiper-bg">
        <img :src="imgInfo.bgImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div id="swiper">这是轮播区域</div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { BASE_IMAGE_VOTE_URL } from "@/request/config";
export default {
  name: "activeDollGainPage",
  data() {
    return {
      payInfo: {
        snId: "MIDIM191001241",
        tid: "M191001241",
        title: "618活动大Q",
      },
      imgInfo: {
        bgImg: BASE_IMAGE_VOTE_URL + "/wechat-bg.png",
        titleImg: BASE_IMAGE_VOTE_URL + "/wechat-title1.png",
        qrcodeImg: BASE_IMAGE_VOTE_URL + "/wechat-code.png",
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      const wrap = new Swiper("#swiper");
      console.log(wrap, "wrap");
    });
  },
  methods: {
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
    handleChangeSelectContent() {
      this.$emit("handleChangeSelectContent", this.payInfo);
    },
    handlePayDialog() {
      this.$emit("handlePayDialog");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../../../node_modules/swiper/css/swiper.css");
.swiper-wrap {
  width: 100%;
  position: relative;
  .swiper-bg {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .wechat-code {
    position: absolute;
    top: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 190px;
      height: 190px;
    }
  }
}
</style>
