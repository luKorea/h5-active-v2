<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 11:15:40
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-01 10:53:12
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
      <div class="swiper-info">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <template v-if="list && list.length > 0">
              <div
                class="swiper-slide"
                v-for="(item, index) in list"
                :key="index"
              >
                <img :src="item" referrerpolicy="no-referrer" />
              </div>
            </template>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { BASE_IMAGE_VOTE_URL, BASE_IMAGE_ACTIVE_URL } from "@/request/config";
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
      list: [
        BASE_IMAGE_ACTIVE_URL + "/one.jpg",
        BASE_IMAGE_ACTIVE_URL + "/two.jpg",
        BASE_IMAGE_ACTIVE_URL + "/three.jpg",
        BASE_IMAGE_ACTIVE_URL + "/four.jpg",
        BASE_IMAGE_ACTIVE_URL + "/five.jpg",
        BASE_IMAGE_ACTIVE_URL + "/six.jpg",
      ],
    };
  },
  created() {
    document.title = "Pofi盛夏福利——限定人偶获取";
  },
  mounted() {
    const wrap = new Swiper(".swiper-container", {
      autoplay: {
        disableOnInteraction: false,
        delay: 2000,
      },
      effect: "coverflow",
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 400,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
    console.log(wrap);
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
  .swiper-info {
    width: 100%;
    height: 200px;
    position: absolute;
    top: 90px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .swiper-container {
      width: 90%;
      .swiper-slide {
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
