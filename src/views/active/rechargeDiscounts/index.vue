<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 11:15:40
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-09 09:54:57
 * @FilePath: /h5-active-v2/src/views/active/functionSubscription/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <div class="banner-header">
      <img :src="headerImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <count-down :curStartTime="endTime"></count-down>
    <div class="user-info">
      <user-info @handleLoginDialog="handleLoginDialog"></user-info>
    </div>
    <!-- 购买区域 -->
    <div class="buy-wrap">
      <template v-if="vipList && vipList.length > 0">
        <div
          class="item"
          v-for="item in vipList"
          :key="item.id"
          @click="handlePayDialog(item.payInfo)"
        >
          <img :src="item.img" alt="" referrerpolicy="no-referrer" />
        </div>
      </template>
    </div>
    <div class="white-wrap">
      <div class="img-tip" style="margin-top: 0">
        <img :src="tipImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <!-- 功能介绍 -->
      <div class="img-title-wrap">
        <div class="img-title" style="margin: 20px 0 0 0">
          <img :src="bannerTitle" alt="" referrerpolicy="no-referrer" />
        </div>
      </div>
      <div class="img-banner">
        <img :src="bannerImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <!-- 轮播图 -->
      <div class="img-title-wrap" style="margin: 20px 0 0 0">
        <div class="img-title" style="margin: 0">
          <img
            :src="swiperTitle"
            style="width: 305px; height: 35px"
            alt=""
            referrerpolicy="no-referrer"
          />
        </div>
      </div>
      <div class="swiper-wrap">
        <div class="swiper-bg">
          <img :src="swiperImage" alt="" referrerpolicy="no-referrer" />
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
      <!-- 小item区域 -->
      <div class="send-link1">
        <div class="img-wrap">
          <template v-if="itemList && itemList.length > 0">
            <div
              v-for="(item, index) in itemList"
              :key="index"
              class="img-item"
              @click="openPage(item.id)"
            >
              <img :src="item.src" alt="" referrerpolicy="no-referrer" />
            </div>
          </template>
        </div>
      </div>
      <!-- APP介绍区域 -->
      <app-component />
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { BASE_IMAGE_ACTIVE_URL } from "@/request/config";
import CountDown from "../common/count-down";
import appComponent from "../common/go-app/index.vue";
import UserInfo from "../common/user-info/user-info.vue";
export default {
  name: "activeRechargeDiscountsPage",
  props: {
    endTime: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
  },
  components: {
    CountDown,
    appComponent,
    UserInfo,
  },
  data() {
    // MIDRCG6800 618活动68p币
    // MIDRCG12800 618活动128p币
    // MIDRCG20800 618活动208p币
    // MIDRCG58800 618活动588p币
    return {
      headerImg: BASE_IMAGE_ACTIVE_URL + "/pay-header.png",
      payInfo: {
        title: "618活动专业版15个月",
        snId: "MIDFUNC_PRO_455D",
      },
      proImg: BASE_IMAGE_ACTIVE_URL + "/b1-pro.png",
      svipImg: BASE_IMAGE_ACTIVE_URL + "/b1-svip.png",
      tipImg: BASE_IMAGE_ACTIVE_URL + "/trigon.png",
      bannerTitle: BASE_IMAGE_ACTIVE_URL + "/b2-p-title.png",
      bannerImg: BASE_IMAGE_ACTIVE_URL + "/b2-b-banner.png",
      itemList: [
        {
          id: 2,
          src: BASE_IMAGE_ACTIVE_URL + "/b-function.png",
        },
        {
          id: 4,
          src: BASE_IMAGE_ACTIVE_URL + "/b-even.png",
        },
        {
          id: 5,
          src: BASE_IMAGE_ACTIVE_URL + "/b-real-even.png",
        },
        {
          id: 1,
          src: BASE_IMAGE_ACTIVE_URL + "/b-home.png",
        },
      ],
      vipList: [
        {
          id: 1,
          payInfo: {
            id: "MIDRCG6800",
            title: "618活动68p币",
          },
          img: BASE_IMAGE_ACTIVE_URL + "/b2-68.png",
        },
        {
          id: 2,
          payInfo: {
            id: "MIDRCG12800",
            title: "618活动128p币",
          },
          img: BASE_IMAGE_ACTIVE_URL + "/b2-128.png",
        },
        {
          id: 3,
          payInfo: {
            id: "MIDRCG20800",
            title: "618活动208p币",
          },
          img: BASE_IMAGE_ACTIVE_URL + "/b2-208.png",
        },
        {
          id: 4,
          payInfo: {
            id: "MIDRCG58800",
            title: "618活动588p币",
          },
          img: BASE_IMAGE_ACTIVE_URL + "/b2-588.png",
        },
      ],
      swiperImage: BASE_IMAGE_ACTIVE_URL + "/b2-swiper.png",
      swiperTitle: BASE_IMAGE_ACTIVE_URL + "/b2-swiper-title.png",
      list: [
        BASE_IMAGE_ACTIVE_URL + "/b2-one.png",
        BASE_IMAGE_ACTIVE_URL + "/b2-two.png",
        BASE_IMAGE_ACTIVE_URL + "/b2-three.png",
        BASE_IMAGE_ACTIVE_URL + "/b2-four.png",
        BASE_IMAGE_ACTIVE_URL + "/b2-five.png",
      ],
    };
  },
  created() {
    document.title = "Pofi盛夏福利——P币充值优惠";
  },
  mounted() {
    // const start = reduceTime(this.startTime); // 活动开始
    // const end = reduceTime(this.endTime); // 活动结束
    // if (start === 2) {
    //   Dialog.alert({
    //     message: "该活动将于6月17日开始，敬请期待！",
    //     showConfirmButton: false,
    //   });
    //   // this.$emit("openPage", 1);
    // } else if (end === 1) {
    //   Dialog.alert({
    //     message: "活动已结束",
    //     showConfirmButton: false,
    //   });
    //   // this.$emit("openPage", 1);
    // }
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
    onPlayerPlay(e) {
      console.log(e, "ee");
    },
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
    handlePayDialog(type) {
      this.$emit("handlePayDialog", type);
    },
    openPage(pageNumber) {
      this.$emit("openPage", pageNumber);
    },
  },
};
</script>
<style>
@import url("../../../../node_modules/swiper/css/swiper.css");
.swiper-pagination-bullet-active {
  background: rgba(51, 51, 51, 1) !important;
}
</style>
<style lang="less" scoped>
.home-container {
  width: 100%;
  background-color: #7a92fe;
  position: relative;
  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
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
      // height: 165px;
      position: absolute;
      top: 14px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .swiper-container {
        width: 90%;
        .swiper-slide {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          // background-color: #fff;
          img {
            width: 297px;
            height: 165px;
            // object-fit: cover;
            // border-radius: 10px;
          }
        }
      }
    }
  }
  .buy-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    // margin-bottom: 20px;
    .item {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .item-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    width: 100%;
    .item {
      width: 100%;
      height: 100%;
      // margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .white-wrap {
    .img-tip {
      width: 100%;
      height: 100%;
      // background-image: url("https://f3.pofiapp.com/event/active/trigon.png");
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img-title-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .img-title {
      width: 305px;
      height: 35px;
      margin: 20px 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img-banner {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img-video {
      width: 338px;
      height: 490px;
      margin-bottom: 20px;
      .video {
        width: 100%;
        height: 100%;
      }
    }
    background-color: #fff;
    width: 100%;
    // padding-top: 20px;
    .send-link1 {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0 0 0;
      width: 100%;
      .img-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        // width: 80%;
        .img-item {
          width: 171px;
          height: 98px;
          // margin-top: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
