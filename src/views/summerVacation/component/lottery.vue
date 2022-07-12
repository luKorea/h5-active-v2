<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-11 17:29:02
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-12 15:36:43
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
import { generatorDrawList } from "@/utils";
import { getPriceInfo } from "@/api/lottery";
import { mapState } from "vuex";

export default {
  name: "lottery-page",
  components: {
    userInfoComponent,
  },
  data() {
    return {
      headerImg: BASE_IMAGE_SUMMARY_URL + "/fuli-bg.png",
      priceImg: BASE_IMAGE_SUMMARY_URL + "/price.png",
      getImg: BASE_IMAGE_SUMMARY_URL + "/replace1.png",
      swipeImg: BASE_IMAGE_SUMMARY_URL + "/swipe-banner.png",
      status: 1, // 1. 我的奖品  2. 奖品说明
      dataList: {},
      info: [],
    };
  },

  mounted() {
    this.dataList = generatorDrawList();
    if (this.token && this.uid) {
      this.getMyPrice();
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
}
</style>
