<!--
 * @Author: your name
 * @Date: 2022-04-21 11:45:45
 * @LastEditTime: 2022-04-27 17:29:05
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
        <span>点击下图填写问卷，提交您对Pofi的建议与反馈吧！</span>
      </div>
      <div class="question-banner" @click="goPage">
        <img :src="imgInfo.bannerImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="question-btn" @click="goPage">
        <img :src="imgInfo.btnImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_VOTE_URL } from "@/request/config";
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";
export default {
  name: "questionComponent",
  data() {
    return {
      imgInfo: {
        bgImg: BASE_IMAGE_VOTE_URL + "/question-bg.png",
        titleImg: BASE_IMAGE_VOTE_URL + "/question-title1.png",
        bannerImg: BASE_IMAGE_VOTE_URL + "/question-banner1.png",
        btnImg: BASE_IMAGE_VOTE_URL + "/question-btn1.png",
      },
    };
  },
  methods: {
    goPage() {
      openUrl(urlLink.questionLink);
    },
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
