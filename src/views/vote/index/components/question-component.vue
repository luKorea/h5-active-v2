<!--
 * @Author: your name
 * @Date: 2022-04-21 11:45:45
 * @LastEditTime: 2022-04-21 14:44:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/views/vote/index/components/question-component.vue
-->
<template>
  <div class="content-wrap">
    <div class="question-wrap">
      <div class="question-bg">
        <img :src="imgInfo.bgImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="question-title">
        <img :src="imgInfo.titleImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="question-tip">
        <span>点击下图填写问卷，完成任务可获得P币奖励哦！</span>
      </div>
      <div class="question-banner">
        <img :src="imgInfo.bannerImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="question-btn">
        <img :src="imgInfo.btnImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_VOTE_URL } from "@/request/config";
export default {
  name: "questionComponent",
  data() {
    return {
      imgInfo: {
        bgImg: BASE_IMAGE_VOTE_URL + "/question-bg.png",
        titleImg: BASE_IMAGE_VOTE_URL + "/question-title.png",
        bannerImg: BASE_IMAGE_VOTE_URL + "/question-banner.png",
        btnImg: BASE_IMAGE_VOTE_URL + "/question-btn.png",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.question-wrap {
  width: 100%;
  position: relative;
  .question-bg {
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
  .question-title {
    position: absolute;
    top: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 324px;
      height: 39px;
    }
  }
  .question-tip {
    position: absolute;
    top: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    span {
      font-size: 11px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #136a19;
      line-height: 22px;
    }
  }
  .question-banner {
    position: absolute;
    top: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 305px;
      height: 100%;
    }
  }
  .question-btn {
    position: absolute;
    top: 330px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 316px;
      height: 100%;
    }
  }
}
</style>
