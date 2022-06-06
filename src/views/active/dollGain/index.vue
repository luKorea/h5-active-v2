<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 11:15:40
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-06 18:26:57
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
  <div class="doll-container">
    <!-- 头部区域 -->
    <count-down :curStartTime="1656259199"></count-down>
    <div class="user-info">
      <user-info @handleLoginDialog="handleLoginDialog"></user-info>
    </div>
    <!-- 邀请区域 -->
    <div class="get-wrap">
      <img :src="imgInfo.bannerImg" alt="" referrerpolicy="no-referrer" />
      <template
        v-if="
          (otherInfo.record &&
            otherInfo.record.userInfo &&
            otherInfo.record.userInfo.length === 0) ||
          otherInfo.record.userInfo === null
        "
      >
        <!-- 未登录以及未拥有人偶展示 -->
        <div class="init-wrap" v-if="otherInfo && !otherInfo.have">
          <div class="btn bug" @click="handleDifferentOperation('buy')">
            <img :src="initBug" alt="" referrerpolicy="no-referrer" />
          </div>
          <div class="btn share" @click="handleDifferentOperation('share')">
            <img :src="shareImg" alt="" referrerpolicy="no-referrer" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="invite-wrap">
          <div class="user-info">
            <!-- 邀请者看到的信息 -->
            <template v-if="!$route.query.inviteCode">
              <div class="info">
                <div class="icon">
                  <img
                    :src="userInfo.iconUrl"
                    alt=""
                    referrerpolicy="no-referrer"
                  />
                </div>
                <div class="pofi-id">POFI ID: {{ userInfo.nickId }}</div>
              </div>
              <div class="icon-wrap">
                <template v-if="mapIcon">
                  <div
                    v-for="item in otherInfo.record.userInfo"
                    :key="item.id"
                    class="icon"
                  >
                    <img
                      :src="item.iconUrl"
                      alt=""
                      referrerpolicy="no-referrer"
                    />
                  </div>
                  <template v-if="otherInfo.record.userInfo.length < 3">
                    <div
                      v-for="i in 3 - otherInfo.record.userInfo.length"
                      :key="i"
                      class="icon"
                      @click="handleNoDifferentOperation('share')"
                    >
                      <img :src="addBtn" alt="" referrerpolicy="no-referrer" />
                    </div>
                  </template>
                </template>
                <template v-else>
                  <div
                    v-for="item in 3"
                    :key="item"
                    class="icon"
                    @click="handleNoDifferentOperation('share')"
                  >
                    <img :src="addBtn" alt="" referrerpolicy="no-referrer" />
                  </div>
                </template>
              </div>
            </template>
            <!-- 被邀请者看到的信息 -->
            <template v-else>
              <div class="info">
                <div class="icon">
                  <img
                    :src="otherInfo.record.iconUrl"
                    alt=""
                    referrerpolicy="no-referrer"
                  />
                </div>
                <div class="pofi-id">
                  邀请者的POFI昵称：{{ otherInfo.record.nickId }}
                </div>
              </div>
            </template>
          </div>
          <div class="share-wrap">
            <!-- 点击邀请按钮邀请好友 -->
            <img
              :src="getUser"
              class="share-btn"
              alt=""
              referrerpolicy="no-referrer"
              v-if="!$route.query.inviteCode"
              @click="handleNoDifferentOperation('share')"
            />
            <!-- 邀请完毕可以购买 -->
            <img
              :src="bugBtn"
              class="buy-btn"
              alt=""
              referrerpolicy="no-referrer"
              v-if="successState"
              @click="handleNoDifferentOperation('buy')"
            />
            <!-- 被邀请人查看到的页面，可以点赞 -->
            <img
              :src="likeBtn"
              class="like-btn"
              alt=""
              referrerpolicy="no-referrer"
              v-else-if="$route.query.inviteCode"
              @click="handleNoDifferentOperation('like')"
            />
          </div>
        </div>
      </template>
      <!--已拥有人偶 -->
      <div class="have-wrap" v-if="otherInfo && otherInfo.have">
        <div class="btn">
          <img :src="haveBtn" alt="" referrerpolicy="no-referrer" />
        </div>
      </div>
    </div>
    <!-- 轮播图 -->
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
    <!-- 购物 -->
    <div class="buy-wrap" @click="goPage('shop')">
      <img :src="imgInfo.shopImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <div class="white-wrap">
      <div class="img-tip">
        <img :src="tipImg" alt="" referrerpolicy="no-referrer" />
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
      <app-component></app-component>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { BASE_IMAGE_ACTIVE_URL } from "@/request/config";
import CountDown from "../common/count-down";
import appComponent from "../common/go-app/index.vue";
import UserInfo from "../common/user-info/user-info.vue";
// import { reduceTime, openUrl, copyShareLink, errorInfo } from '@/utils';
// import { Dialog } from "vant";
import { mapState } from "vuex";
import urlLink from "@/utils/link";
import { openUrl, copyShareLink, successInfo, errorInfo } from "@/utils";
import { inviteUser, likeUser } from "@/api/active";
export default {
  name: "activeDollGainPage",
  components: {
    CountDown,
    appComponent,
    UserInfo,
  },
  props: {
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.activeModule.userInfo,
      token: (state) => state.activeModule.token,
      uid: (state) => state.activeModule.uid,
    }),
    mapIcon() {
      let result = false;
      if (this.otherInfo?.record?.userInfo?.length > 0) {
        result = true;
      }
      return result;
    },
    successState() {
      let result = false;
      if (this.uid && !this.$route.query.inviteCode) {
        if (this.otherInfo?.record?.userInfo?.length >= 3) {
          result = true;
        }
      }
      return result;
    },
  },
  data() {
    return {
      showInviteWrap: false,
      payInfo: {
        snId: "MIDIM191001241",
        tid: "M191001241",
        title: "618活动大Q",
      },
      imgInfo: {
        bgImg: BASE_IMAGE_ACTIVE_URL + "/b3-swiper.png",
        bannerImg: BASE_IMAGE_ACTIVE_URL + "/b3-banner.png",
        shopImg: BASE_IMAGE_ACTIVE_URL + "/b3-shop.png",
      },
      haveBtn: BASE_IMAGE_ACTIVE_URL + "/b3-have.png",
      initBug: BASE_IMAGE_ACTIVE_URL + "/b3-init-buy.png",
      shareImg: BASE_IMAGE_ACTIVE_URL + "/b3-share.png",
      bugBtn: BASE_IMAGE_ACTIVE_URL + "/b3-buy.png",
      getUser: BASE_IMAGE_ACTIVE_URL + "/b3-get.png",
      likeBtn: BASE_IMAGE_ACTIVE_URL + "/b3-like.png",
      addBtn: BASE_IMAGE_ACTIVE_URL + "/b3-add.png",
      itemList: [
        {
          id: 3,
          src: BASE_IMAGE_ACTIVE_URL + "/b-function.png",
        },
        {
          id: 4,
          src: BASE_IMAGE_ACTIVE_URL + "/b-pay.png",
        },
        {
          id: 5,
          src: BASE_IMAGE_ACTIVE_URL + "/b-wechat.png",
        },
        {
          id: 1,
          src: BASE_IMAGE_ACTIVE_URL + "/b-home.png",
        },
      ],
      list: [
        BASE_IMAGE_ACTIVE_URL + "/b3-one.png",
        BASE_IMAGE_ACTIVE_URL + "/b3-two.png",
        BASE_IMAGE_ACTIVE_URL + "/b3-three.png",
      ],
      tipImg: BASE_IMAGE_ACTIVE_URL + "/trigon.png",
    };
  },
  created() {
    document.title = "Pofi盛夏福利——限定人偶获取";
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
    goPage(type) {
      if (type === "shop") {
        openUrl(urlLink.shoppingLink);
      }
    },
    handleDifferentOperation(type) {
      if (!this.uid || !this.token) {
        this.handleLoginDialog();
      } else {
        // 已经投票,点击购买
        if (type === "buy" && this.otherInfo.vote) {
          this.showInviteWrap = false;
          this.handlePayDialog();
          return;
        }
        if (type === "share" && this.otherInfo.vote) {
          this.showInviteWrap = false;
          this.handlePayDialog();
          return;
        } else this.showInviteWrap = true;
      }
    },
    handleNoDifferentOperation(type) {
      // 这里的是没有投票
      if (!this.otherInfo.vote && this.showInviteWrap) {
        this.showInviteWrap = true;
        if (type === "buy") {
          this.handlePayDialog();
          return;
        }
        if (type === "share") {
          this.shareCode();
          return;
        }
        if (type === "like") {
          this.likeCode();
          return;
        }
      }
      return;
    },
    // 生成分享链接
    shareCode() {
      if (this.otherInfo.record.inviteCode === null) {
        inviteUser({
          uid: this.uid,
          loginKey: this.token,
        }).then((res) => {
          if (res.code === 200) {
            console.log(res.data);
            const href = `${window.location.origin}${window.location.pathname}?inviteCode=${res.data.inviteCode}&pageCode=4`;
            copyShareLink(href, this);
          }
        });
      } else {
        const href = `${window.location.origin}${window.location.pathname}?inviteCode=${this.otherInfo.record.inviteCode}&pageCode=4`;
        copyShareLink(href, this);
      }
    },
    // 点赞
    likeCode() {
      if (this.uid && this.token) {
        likeUser({
          uid: this.uid,
          inviteCode: this.$route.query.inviteCode,
        }).then((res) => {
          if (res.code === 200) {
            successInfo("点赞成功");
          } else errorInfo(res.msg);
        });
      } else this.handleLoginDialog();
    },
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
    handlePayDialog() {
      this.$emit("handlePayDialog", this.payInfo);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../../../node_modules/swiper/css/swiper.css");
.doll-container {
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
      height: 165px;
      position: absolute;
      top: 235px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .swiper-container {
        width: 100%;
        .swiper-slide {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          // padding: 10px;
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
  .get-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .init-wrap {
      position: absolute;
      bottom: 20px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .btn {
        width: 322px;
        height: 84px;
        .share {
          display: block;
          margin-top: -10px;
        }
        img {
          width: 322px;
          height: 84px;
        }
      }
    }
    .have-wrap {
      position: absolute;
      bottom: 80px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .btn {
        width: 318px;
        height: 63px;
        img {
          width: 318px;
          height: 63px;
        }
      }
    }
    .invite-wrap {
      position: absolute;
      bottom: 24px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 244px;
        height: 93px;
        background: #313131;
        border-radius: 12px;
        .info {
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            width: 29px;
            height: 29px;
            margin-right: 10px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .pofi-id {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: #cccccc;
          }
        }
        .icon-wrap {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 80%;
          background-color: rgba(102, 102, 102, 0.6);
          border-radius: 12px;
          padding: 4px 0;
          box-sizing: border-box;
          .icon {
            width: 31px;
            height: 31px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
      .share-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        .share-btn {
          width: 157px;
          height: 57px;
        }
        .like-btn {
          width: 152px;
          height: 44px;
        }
        .buy-btn {
          width: 152px;
          height: 57px;
        }
      }
    }
  }
  .buy-wrap {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .white-wrap {
    background-color: #fff;
    width: 100%;
    // padding-top: 20px;
    .img-tip {
      width: 100%;
      height: 100%;
      // background-image: url("https://f3.pofiapp.com/event/active/trigon.png");
      img {
        width: 100%;
        height: 100%;
      }
    }
    .send-link1 {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
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
