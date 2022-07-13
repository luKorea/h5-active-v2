<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-11 17:29:02
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-13 18:24:01
 * @FilePath: /h5-active-v2/src/views/summerVacation/component/function-buy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="lottery-wrap">
    <div class="wrap-content">
      <img :src="headerImg" alt="" referrerpolicy="no-referrer" />
      <!-- 用户信息 -->
      <div class="user-info1">
        <user-info-component
          @handleLoginDialog="handleLoginDialog"
        ></user-info-component>
      </div>
      <!-- 剩余次数 -->
      <div class="count">{{ count }}/3</div>
      <!-- 抽奖区域 -->
      <div class="luck-wrap">
        <div class="event-draw-group">
          <div id="draw-item-1" class="event-draw-item draw-active">
            <img
              referrerpolicy="no-referrer"
              :src="newUrl + '/gift1.png'"
              alt=""
            />
          </div>
          <div id="draw-item-2" class="event-draw-item">
            <img
              referrerpolicy="no-referrer"
              :src="newUrl + '/gift2.png'"
              alt=""
            />
          </div>
          <div id="draw-item-3" class="event-draw-item">
            <img
              referrerpolicy="no-referrer"
              :src="newUrl + '/gift3.png'"
              alt=""
            />
          </div>
          <div id="draw-item-8" class="event-draw-item">
            <img
              referrerpolicy="no-referrer"
              :src="newUrl + '/gift8.png'"
              alt=""
            />
          </div>
          <div @click="startLotteryPlay" class="event-draw-do">
            <img
              class="event-do-draw-img"
              referrerpolicy="no-referrer"
              :src="
                !isDrawing ? newUrl + '/no-start.png' : newUrl + '/start.png'
              "
              alt=""
            />
          </div>
          <div id="draw-item-4" class="event-draw-item">
            <img
              referrerpolicy="no-referrer"
              :src="newUrl + '/gift4.png'"
              alt=""
            />
          </div>
          <div id="draw-item-7" class="event-draw-item">
            <img
              referrerpolicy="no-referrer"
              :src="newUrl + '/gift7.png'"
              alt=""
            />
          </div>
          <div id="draw-item-6" class="event-draw-item">
            <img
              referrerpolicy="no-referrer"
              :src="newUrl + '/gift6.png'"
              alt=""
            />
          </div>
          <div id="draw-item-5" class="event-draw-item">
            <img
              referrerpolicy="no-referrer"
              :src="newUrl + '/gift5.png'"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- 奖品区域 -->
      <div class="price-wrap">
        <div class="text-wrap">
          <div
            class="title"
            @click="changeText(1)"
            :class="status === 1 && 'selectText'"
          >
            兑换方法
          </div>
          <div
            class="title"
            @click="changeText(2)"
            :class="status === 2 && 'selectText'"
          >
            我的奖品
          </div>
        </div>
        <div class="item" v-if="status === 1">
          <img :src="getImg" alt="" referrerpolicy="no-referrer" />
        </div>
        <div class="item" v-else>
          <img :src="priceImg" alt="" referrerpolicy="no-referrer" />
        </div>
        <template v-if="info && info.length && status === 2">
          <div class="text-price">
            <div
              class="text-price-item"
              v-for="(item, index) in info"
              :key="item.uid"
            >
              <template v-if="index === 0">
                <span class="text">{{ item.createTime }}</span>
                <span class="text">{{ item.name }}</span>
                <span class="text" @click="showLotterySuccess(item)">查看</span>
              </template>
            </div>
          </div>
        </template>
      </div>
      <!-- 假数据区域 -->
      <div class="swipe-wrap">
        <div class="img-item">
          <img :src="swipeImg" alt="" referrerpolicy="no-referrer" />
          <div class="swipe-item">
            <van-swipe
              class="my-swipe"
              :autoplay="3000"
              :show-indicators="false"
              vertical
            >
              <template
                v-if="dataList && dataList.list && dataList.list.length > 0"
              >
                <van-swipe-item
                  v-for="(item, index) in dataList.list"
                  :key="index"
                >
                  <div class="item">
                    <span>{{ item.time }}</span>
                    <span>{{ item.number }}</span>
                    <span>{{ item.obj }}</span>
                  </div>
                </van-swipe-item>
              </template>
            </van-swipe>
          </div>
        </div>
      </div>
      <!-- 中奖弹框-->
      <lotterySuccessPage
        ref="lotteryRef"
        :info="currentInfo"
      ></lotterySuccessPage>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
import userInfoComponent from "../common/user-info/user-info.vue";
import { generatorDrawList, errorInfo, copyShareLink } from "@/utils";
import { getPriceInfo, refreshCount, startLottery } from "@/api/lottery";
import { mapState } from "vuex";
import { Dialog } from "vant";
import lotterySuccessPage from "@/components/lottery-success/index.vue";

export default {
  name: "lottery-page",
  components: {
    userInfoComponent,
    lotterySuccessPage,
  },
  data() {
    return {
      headerImg: BASE_IMAGE_SUMMARY_URL + "/lottery-bg.png",
      priceImg: BASE_IMAGE_SUMMARY_URL + "/price.png",
      getImg: BASE_IMAGE_SUMMARY_URL + "/replace1.png",
      swipeImg: BASE_IMAGE_SUMMARY_URL + "/swipe-banner.png",
      newUrl: BASE_IMAGE_SUMMARY_URL,
      status: 1, // 1. 我的奖品  2. 奖品说明
      dataList: {},
      info: [],
      // 盲盒抽奖区域
      currentInfo: {}, //中奖信息
      isDrawing: false,
      count: 3,
      currElement: 0,
      rotateCount: 0,
      needRotateCount: 0,
      drawItems: [],
    };
  },

  mounted() {
    this.dataList = generatorDrawList();
    if (this.token && this.uid) {
      this.getMyPrice();
      this.refreshCountPlay();
    }
    for (let i = 1; i < 9; i++) {
      this.drawItems[this.drawItems.length] = document.getElementById(
        "draw-item-" + i
      );
    }
  },
  computed: {
    ...mapState({
      token: (state) => state.summaryModule.token,
      uid: (state) => state.summaryModule.uid,
    }),
  },
  methods: {
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
    showLotterySuccess(item) {
      this.currentInfo = item;
      this.$refs["lotteryRef"].showDialog = true;
    },
    getMyPrice() {
      getPriceInfo({
        uid: this.uid,
        loginKey: this.token,
      }).then((res) => {
        if (res.state) {
          this.info = res.data;
        }
      });
    },
    changeText(e) {
      if (+e === this.status) return;
      this.status = +e;
      if (+e === 2 && this.token) {
        this.getMyPrice();
      }
    },
    // 刷新次数
    refreshCountPlay() {
      refreshCount({
        uid: this.uid,
        loginKey: this.token,
      }).then((res) => {
        if (res.state) {
          this.count = res.data;
        }
      });
    },
    markTargetIndex(targetIndex) {
      this.isDrawing = true;
      this.rotateCount = 0;
      this.currElement = 0;
      this.needRotateCount = 80 + targetIndex - 1;
      this.postRefreshItem();
      this.refreshCountPlay();
    },
    postRefreshItem() {
      let _this = this;
      _this.rotateCount++;
      _this.currElement++;
      if (_this.currElement >= _this.drawItems.length) {
        _this.currElement = 0;
      }
      let lastElement = _this.currElement - 1;
      if (lastElement < 0) {
        lastElement = _this.drawItems.length - 1;
      }
      _this.drawItems[lastElement].classList.remove("draw-active");
      _this.drawItems[_this.currElement].classList.add("draw-active");
      if (_this.needRotateCount !== _this.rotateCount) {
        let timeout = 30;
        if (_this.needRotateCount - _this.rotateCount < 14) {
          timeout = (14 - (_this.needRotateCount - _this.rotateCount)) * 40;
          console.log(timeout);
        }
        setTimeout(_this.postRefreshItem, timeout);
      } else {
        this.isDrawing = false;
      }
    },
    startLotteryPlay() {
      if (!this.uid) {
        this.handleLoginDialog();
        return;
      }
      if (this.isDrawing) {
        return;
      }
      copyShareLink(this.uid, this, "成功");
      startLottery({
        uid: this.uid,
        loginKey: this.token,
      }).then((res) => {
        if (res.state) {
          this.currentInfo = res.data;
          this.markTargetIndex(res.data.id);
          setTimeout(() => {
            this.$refs["lotteryRef"].showDialog = true;
          }, 6500);
          // 调用stop停止旋转并传递中奖索引;
        } else if (res.code === 77) {
          this.markTargetIndex(5);
          setTimeout(() => {
            this.currentIndex = 9;
            Dialog.alert({
              message: "欧气增加了一点点，再来一次~",
            });
          }, 6500);
        } else if (res.code === 78) {
          this.currentIndex = 1;
          Dialog.alert({
            message: "今天的抽奖额度已用完，明天再来吧！",
          });
        } else errorInfo(res.msg);
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./lottery.less");
.lottery-wrap {
  margin-top: 53px;
  .price-wrap {
    position: absolute;
    bottom: 90px;
    padding: 0 12px;
    .text-wrap {
      position: absolute;
      bottom: 370px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 90%;
      box-sizing: border-box;
      .title {
        font-weight: 400;
        font-size: 23px;
        font-family: zihun100hao-fangfangxianfengti;
        font-style: italic;
        color: #cccccc;
      }
      .selectText {
        color: #ffffff;
      }
    }
    .item {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text-price {
      position: absolute;
      bottom: 240px;
      width: 90%;
      .text-price-item {
        width: 75%;
        margin: 0 auto;
        display: flex;
        // justify-content: space-around;
        align-items: center;
        .text {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #1e1e1e;
          margin-right: 31px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .swipe-wrap {
    position: absolute;
    bottom: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .img-item {
      position: relative;
      img {
        width: 350px;
        height: 100%;
      }
      .swipe-item {
        position: absolute;
        top: 11px;
        left: 50px;
        display: flex;
        justify-content: space-between;
        height: 35px;
        line-height: 35px;
        overflow: hidden;
        color: rgba(51, 51, 51, 1);
        font-size: 12px;
        span {
          margin-right: 6px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .count {
    position: absolute;
    top: 234px;
    right: 134px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #1e1e1e;
  }
}
</style>
