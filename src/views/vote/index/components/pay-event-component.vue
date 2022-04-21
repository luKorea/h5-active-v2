import { BASE_IMAGE_VOTE_URL } from '@/request/config';
<!--
 * @Author: your name
 * @Date: 2022-04-21 10:09:46
 * @LastEditTime: 2022-04-21 15:03:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/views/vote/index/components/pay-component.vue
-->

<template>
  <div class="content-wrap">
    <div class="pay-wrap">
      <div class="pay-bg">
        <img :src="imgInfo.bgImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="pay-title">
        <img :src="imgInfo.titleImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <!-- 用户信息 -->
      <div class="user-info">
        <user-info-component
          @handleLoginDialog="handleLoginDialog"
        ></user-info-component>
      </div>
      <!-- 人偶库 -->
      <div class="pay-even">
        <img :src="imgInfo.bannerImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <!-- 区分按钮状态 -->
      <div class="pay-buy">
        <!-- 未购买 -->
        <img
          :src="imgInfo.buyImg"
          alt=""
          referrerpolicy="no-referrer"
          @click="handleOperation"
        />
        <!-- 购买成功 -->
        <!-- <img :src="imgInfo.buySuccessImg" alt="" referrerpolicy="no-referrer" /> -->
        <!-- 已经拥有 -->
        <!-- <img :src="imgInfo.hasImg" alt="" referrerpolicy="no-referrer" /> -->
      </div>
      <!-- 客服信息 -->
      <div class="pay-info">
        <div class="tip">
          充值送BJD米诺的优惠仅限当前活动充值获取，充值数据可能有延迟请在APP内刷新。如遇未到账情况，请填写<span
            class="blue"
            >《充值未到账售后登记表》</span
          >，或联系<span class="blue">Pofi客服: 800182146</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_VOTE_URL } from "@/request/config";
import { mapState } from "vuex";

import userInfoComponent from "../../common/user-info/user-info.vue";

export default {
  name: "PayEventComponent",
  components: {
    userInfoComponent,
  },
  computed: {
    ...mapState({
      token: (state) => state.voteModule.token,
    }),
  },
  data() {
    return {
      imgInfo: {
        bgImg: BASE_IMAGE_VOTE_URL + "/pay-bg1.png",
        titleImg: BASE_IMAGE_VOTE_URL + "/pay-title.png",
        bannerImg: BASE_IMAGE_VOTE_URL + "/pay-banner.png",
        buyImg: BASE_IMAGE_VOTE_URL + "/pay-buy-btn.png",
        buySuccessImg: BASE_IMAGE_VOTE_URL + "/pay-buy-success-btn.png",
        hasImg: BASE_IMAGE_VOTE_URL + "/pay-has-btn.png",
      },
    };
  },
  methods: {
    handleOperation() {
      if (this.token) {
        this.$emit("handlePayDialog");
      } else this.handleLoginDialog();
    },
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
  },
};
</script>

<style lang="less" scoped>
.pay-wrap {
  width: 100%;
  position: relative;
  .pay-bg {
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
  .pay-title {
    position: absolute;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 300px;
      height: 39px;
    }
  }
  .pay-even {
    position: absolute;
    top: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 311px;
      height: 100%;
    }
  }
  .user-info {
    position: absolute;
    top: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .pay-buy {
    position: absolute;
    top: 390px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 316px;
      height: 100%;
    }
  }
  .pay-info {
    position: absolute;
    bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .tip {
      width: 289px;
      line-height: 22px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #79797e;
      .blue {
        color: #37aade;
      }
    }
  }
}
</style>
