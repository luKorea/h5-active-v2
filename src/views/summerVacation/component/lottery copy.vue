<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-13 11:51:23
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-13 11:51:23
 * @FilePath: /h5-active-v2/src/views/summerVacation/component/lottery copy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-11 17:29:02
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-13 11:46:19
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
      <!-- 抽奖区域 -->
      <!-- 剩余次数 -->
      <div class="count">{{ 3 }}/3</div>
      <div class="luck-wrap">
        <template v-if="list && list.length > 0">
          <div
            class="item"
            :class="currentIndex === index + 1 && 'select'"
            v-for="(item, index) in list"
            :key="index"
            @click="start(item)"
          >
            <img :src="item.img" alt="" referrerpolicy="no-referrer" />
          </div>
        </template>
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
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
import userInfoComponent from "../common/user-info/user-info.vue";
import { generatorDrawList, errorInfo } from "@/utils";
import { getPriceInfo, refreshCount, startLottery } from "@/api/lottery";
import { mapState } from "vuex";
import { Dialog } from "vant";

export default {
  name: "lottery-page",
  components: {
    userInfoComponent,
  },
  data() {
    return {
      headerImg: BASE_IMAGE_SUMMARY_URL + "/lottery-bg.png",
      priceImg: BASE_IMAGE_SUMMARY_URL + "/price.png",
      getImg: BASE_IMAGE_SUMMARY_URL + "/replace1.png",
      swipeImg: BASE_IMAGE_SUMMARY_URL + "/swipe-banner.png",
      status: 1, // 1. 我的奖品  2. 奖品说明
      dataList: {},
      info: [],
      // 盲盒抽奖区域
      currentInfo: {}, //中奖信息
      noStart: BASE_IMAGE_SUMMARY_URL + "/no-start.png",
      list: [
        {
          img: BASE_IMAGE_SUMMARY_URL + "/gift1.png",
          id: 1,
        },
        {
          img: BASE_IMAGE_SUMMARY_URL + "/gift2.png",
          id: 2,
        },
        {
          img: BASE_IMAGE_SUMMARY_URL + "/gift3.png",
          id: 3,
        },
        {
          img: BASE_IMAGE_SUMMARY_URL + "/gift8.png",
          id: 8,
        },
        {
          img: BASE_IMAGE_SUMMARY_URL + "/no-start.png",
          start: BASE_IMAGE_SUMMARY_URL + "/start.png",
          id: 9,
        },
        {
          img: BASE_IMAGE_SUMMARY_URL + "/gift4.png",
          id: 4,
        },
        {
          img: BASE_IMAGE_SUMMARY_URL + "/gift7.png",
          id: 7,
        },
        {
          img: BASE_IMAGE_SUMMARY_URL + "/gift6.png",
          id: 6,
        },
        {
          img: BASE_IMAGE_SUMMARY_URL + "/gift5.png",
          id: 5,
        },
      ],
      currentIndex: 1, //当前中奖行，默认第一行
      count: 3, // 用户抽奖次数、
      speed: 200, // 时间->速度
      diff: 15, // 基数
      time: 0, // 当前时间戳
      timer: null, // 定时器
    };
  },

  mounted() {
    this.dataList = generatorDrawList();
    if (this.token && this.uid) {
      this.getMyPrice();
      this.refreshCountPlay();
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
    start(item) {
      this.startLotteryPlay(item);
    },
    startLotteryPlay(item) {
      if (item.id === 9) {
        if (!this.uid) {
          this.handleLoginDialog();
          return;
        }
        item.img = item.start;
        startLottery({
          uid: this.uid,
          loginKey: this.token,
        }).then((res) => {
          if (res.state) {
            this.currentInfo = res.data;
            this.currentIndex = res.data.id;
            this.refreshCountPlay();
            // 调用stop停止旋转并传递中奖索引;
          } else if (res.code === 77) {
            this.refreshCountPlay();
            setTimeout(() => {
              item.img = this.noStart;
              this.currentIndex = 9;
              Dialog.alert({
                message: "欧气增加了一点点，再来一次~",
              });
            }, 3000);
          } else if (res.code === 78) {
            item.img = this.noStart;
            this.currentIndex = 1;
            this.refreshCountPlay();
            Dialog.alert({
              message: "今天的抽奖额度已用完，明天再来吧！",
            });
          } else errorInfo(res.msg);
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
    top: 233px;
    right: 135px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #1e1e1e;
  }
  .luck-wrap {
    position: absolute;
    top: 265px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 0 26px 0 30px;
    .item {
      width: 94px;
      height: 94px;
      margin-bottom: 10px;
      img {
        width: 94px;
        height: 94px;
        padding: 0;
        background-size: cover;
      }
    }
    .select {
      border: 4px solid #ff264a;
      border-radius: 20px;
    }
  }
}
</style>
