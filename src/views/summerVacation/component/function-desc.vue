<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-07 15:02:56
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-11 16:52:09
 * @FilePath: /h5-active-v2/src/views/summerVacation/component/function-desc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="function-wrap">
    <div class="img-wrap">
      <img :src="pageOne.bgImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <!-- pofi 专业版 -->
    <div class="img-wrap">
      <div class="two">
        <img :src="pageTwo.bgImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="two-btn" @click="goAnchor('one')">
        <img :src="pageTwo.btnImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
    <!-- 充值送人偶 -->
    <div class="img-wrap">
      <div class="three">
        <img :src="pageThree.bgImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="three-btn" @click="goAnchor('two')">
        <img :src="pageThree.btnImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
    <!-- pose半价 -->
    <div class="img-wrap">
      <div class="four">
        <img :src="pageFour.bgImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="four-btn" @click="goAnchor('three')">
        <img :src="pageFour.btnImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
    <!-- 下载区域 -->
    <div class="img-wrap download" @click="goAnchor('download')">
      <img :src="downloadBtn" alt="" referrerpolicy="no-referrer" />
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
export default {
  name: "functionDescPage",
  data() {
    return {
      pageOne: {
        bgImg: BASE_IMAGE_SUMMARY_URL + "/page-one.png",
        btnImg: BASE_IMAGE_SUMMARY_URL + "/page-one.png",
      },
      pageTwo: {
        bgImg: BASE_IMAGE_SUMMARY_URL + "/page-two.png",
        btnImg: BASE_IMAGE_SUMMARY_URL + "/page-two-btn.png",
      },
      pageThree: {
        bgImg: BASE_IMAGE_SUMMARY_URL + "/page-three.png",
        btnImg: BASE_IMAGE_SUMMARY_URL + "/page-three-btn.png",
      },
      pageFour: {
        bgImg: BASE_IMAGE_SUMMARY_URL + "/page-four.png",
        btnImg: BASE_IMAGE_SUMMARY_URL + "/page-four-btn.png",
      },
      downloadBtn: BASE_IMAGE_SUMMARY_URL + "/download-btn.png",
    };
  },
  methods: {
    goAnchor(ele) {
      this.$emit("goAnchor", ele);
    },
  },
};
</script>

<style lang="less" scoped>
.function-wrap {
  margin-top: 36px;
}
.img-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .two {
    margin-top: 32px;
  }
  .two-btn {
    position: absolute;
    left: 0;
    bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 148px;
      height: 35px;
    }
  }
  .three {
    margin-top: 32px;
  }
  .three-btn {
    position: absolute;
    left: 0;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 148px;
      height: 35px;
    }
  }
  .four {
    margin-top: 43px;
  }
  .four-btn {
    position: absolute;
    left: 0;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 148px;
      height: 35px;
    }
  }
}
.download {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35px 0;
  img {
    width: 151px;
    height: 121px;
  }
}
</style>
