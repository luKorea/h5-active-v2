<!--
 * @Author: your name
 * @Date: 2022-04-21 11:25:33
 * @LastEditTime: 2022-04-21 15:09:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/views/vote/index/components/vote-component.vue
-->
<template>
  <div class="content-wrap">
    <div class="vote-wrap">
      <div class="vote-bg">
        <img :src="imgInfo.bgImg" alt="" referrerpolicy="no-referrer" />
      </div>

      <div class="vote-title">
        <img :src="imgInfo.titleImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="vote-tip">
        <span> 获得最高票的限定人偶将于 Pofi 「618」活动中</span
        ><span>限时开放 18P币购买！ </span>
        <span
          ><span class="block">凡是参与本次投票者，</span
          >均可获取最高票人偶购买资格。</span
        >
      </div>
      <!-- 人偶区域 -->

      <!-- 投票区域, 区分状态 -->
      <div class="vote-state">
        <img
          :src="imgInfo.startImg"
          alt=""
          referrerpolicy="no-referrer"
          @click="handleOperation('start')"
        />
        <!-- <img :src="imgInfo.refreshImg" alt="" referrerpolicy="no-referrer" /> -->
      </div>
      <!-- 购买字体提示 -->
      <div class="vote-buy">
        <img :src="imgInfo.buyTitleImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <!-- 预约区域, 区分状态 -->
      <div class="vote-subscribe">
        <img
          :src="imgInfo.subscribeImg"
          @click="handleOperation('subscribe')"
          alt=""
          referrerpolicy="no-referrer"
        />
        <!-- <img :src="imgInfo.subscribeSuccessImg" alt="" referrerpolicy="no-referrer" /> -->
      </div>
      <!-- 文字 -->
      <div class="vote-info">
        <div class="tip">
          预约成功后，Pofi将于「限定人偶开放购买活动」开启时向您的手机号发送活动通知短信。如需取消，请点击
          <span class="blue">取消预约</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_VOTE_URL } from "@/request/config";

export default {
  name: "VoteComponent",
  data() {
    return {
      imgInfo: {
        bgImg: BASE_IMAGE_VOTE_URL + "/vote-bg1.png",
        titleImg: BASE_IMAGE_VOTE_URL + "/vote-title.png",
        subTitleImg: BASE_IMAGE_VOTE_URL + "/vote-subTitle.png",
        startImg: BASE_IMAGE_VOTE_URL + "/vote-start-btn.png",
        refreshImg: BASE_IMAGE_VOTE_URL + "/vote-refresh-btn.png",
        buyTitleImg: BASE_IMAGE_VOTE_URL + "/vote-buy-title.png",
        subscribeImg: BASE_IMAGE_VOTE_URL + "/vote-subscribe.png",
        subscribeSuccessImg:
          BASE_IMAGE_VOTE_URL + "/vote-subscribe-success.png",
      },
      bannerList: [
        {
          title: "",
          img: "",
          selectImg: "",
        },
      ],
    };
  },
  methods: {
    handleOperation(type) {
      if (this.token) {
        // 根据不同 type 处理投票还是预约
        console.log(type);
      } else this.$emit("handleLoginDialog");
    },
  },
};
</script>

<style lang="less" scoped>
.vote-wrap {
  width: 100%;
  position: relative;
  .vote-bg {
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
  .vote-title {
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
  .vote-tip {
    position: absolute;
    top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    .block {
      background: #bcdc95;
      border-radius: 6px;
      padding: 2px;
      text-align: center;
    }
    span {
      font-size: 11px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #136a19;
      line-height: 22px;
    }
  }
  .vote-sub-title {
    position: absolute;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 280px;
      height: 100%;
    }
  }
  .vote-state {
    position: absolute;
    top: 540px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 316px;
      height: 100%;
    }
  }
  .vote-buy {
    position: absolute;
    top: 640px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 296px;
      height: 100%;
    }
  }
  .vote-subscribe {
    position: absolute;
    top: 720px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 316px;
      height: 100%;
    }
  }
  .vote-info {
    position: absolute;
    bottom: 20px;
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
