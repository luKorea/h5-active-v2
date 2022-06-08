<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 11:15:40
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-08 12:01:47
 * @FilePath: /h5-active-v2/src/views/active/functionSubscription/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <count-down :curStartTime="1656259199"></count-down>
    <div class="user-info">
      <user-info @handleLoginDialog="handleLoginDialog"></user-info>
    </div>
    <!-- 购买区域 -->
    <div class="buy-wrap">
      <div class="buy-item" @click="handlePayDialog('pro')">
        <img :src="proImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="buy-item" @click="handlePayDialog('svip')">
        <img :src="svipImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
    <div class="white-wrap">
      <div class="img-tip">
        <img :src="tipImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <!-- 功能介绍 -->
      <div class="img-title-wrap">
        <div class="img-title">
          <img :src="bannerTitle" alt="" referrerpolicy="no-referrer" />
        </div>
      </div>
      <div class="img-banner">
        <img :src="bannerImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <!-- 视频播放 -->
      <div class="img-title-wrap">
        <div class="img-title">
          <img :src="videoTitle" alt="" referrerpolicy="no-referrer" />
        </div>
      </div>
      <div class="img-title-wrap">
        <div class="img-video">
          <korea-video :options="playerOptions"> </korea-video>
          <!-- <div id="playerId"></div> -->
          <!-- <video controls :poster="videoImg">
            <source
              src="https://f3.pofiapp.com/event/active/video.mp4"
              type="video/mp4"
            />
          </video> -->
          <!-- <img :src="videoImg" alt="" referrerpolicy="no-referrer" /> -->
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
import { BASE_IMAGE_ACTIVE_URL } from "@/request/config";
import CountDown from "../common/count-down";
import appComponent from "../common/go-app/index.vue";
import UserInfo from "../common/user-info/user-info.vue";
// import Player from "xgplayer";
import koreaVideo from "@/components/video/index.vue";
export default {
  name: "activeFunctionPage",
  components: {
    CountDown,
    appComponent,
    UserInfo,
    koreaVideo,
  },
  data() {
    // MIDFUNC_PRO_455D 618活动专业版15个月
    // MIDSVIP_455D 618活动专业版和绘画版15个月(赠送158PB)
    return {
      playerOptions: {
        // videojs options
        muted: false,
        language: "zh-CN",
        width: 290,
        height: 516,
        preload: "auto",
        sources: [
          {
            type: "video/mp4",
            src: require("../../../assets/video.mp4"),
          },
        ],
        poster: require("../../../assets/video-banner.png"),
        notSupportedMessage: "此视频暂无法播放...",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      payInfo: {
        title: "618活动专业版15个月",
        snId: "MIDFUNC_PRO_455D",
      },
      proImg: BASE_IMAGE_ACTIVE_URL + "/b1-pro.png",
      svipImg: BASE_IMAGE_ACTIVE_URL + "/b1-svip.png",
      tipImg: BASE_IMAGE_ACTIVE_URL + "/trigon.png",
      bannerTitle: BASE_IMAGE_ACTIVE_URL + "/b1-banner-title.png",
      bannerImg: BASE_IMAGE_ACTIVE_URL + "/b1-banner.png",
      videoTitle: BASE_IMAGE_ACTIVE_URL + "/b1-video-title.png",
      videoImg: BASE_IMAGE_ACTIVE_URL + "/b1-video-banner.png",
      videoUrl: BASE_IMAGE_ACTIVE_URL + "/video.mp4",
      itemList: [
        {
          id: 3,
          src: BASE_IMAGE_ACTIVE_URL + "/b-pay.png",
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
    };
  },
  created() {
    document.title = "Pofi盛夏福利——功能订阅优惠";
  },
  mounted() {
    this.$nextTick(() => {
      // 西瓜播放器
      // new Player({
      //   id: "playerId",
      //   url: "https://f3.pofiapp.com/event/active/video.mp4",
      //   // poster: "https://i.ytimg.com/vi/lK2ZbbQSHww/hqdefault.jpg",
      //   poster: "https://f3.pofiapp.com/event/active/b1-video-banner.png",
      //   width: 338,
      //   height: 490,
      // });
    });
  },
  methods: {
    onPlayerPlay(e) {
      console.log(e, "ee");
    },
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
    handlePayDialog(type) {
      const info =
        type === "pro"
          ? {
              title: "专业版15个月",
              id: "MIDFUNC_PRO_455D",
            }
          : {
              title: "专业版和绘画版15个月(赠送158PB)",
              id: "MIDFUNC_SVIP_455D",
            };
      this.$emit("handlePayDialog", info);
    },
    openPage(pageNumber) {
      this.$emit("openPage", pageNumber);
    },
  },
};
</script>
<style>
.vjs-poster,
.video-js,
.video-js .vjs-tech {
  background-color: RGBA(145, 144, 143, 1);
  border-radius: 20px;
}
.video-js .vjs-big-play-button {
  visibility: hidden;
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
  .buy-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    .buy-item {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .img-tip {
    width: 100%;
    height: 100%;
    // background-image: url("https://f3.pofiapp.com/event/active/trigon.png");
    img {
      width: 100%;
      height: 100%;
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
    .img-title-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .img-title {
      width: 277px;
      height: 60px;
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
      width: 290px;
      height: 516px;
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
      // margin: 20px 0;
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
