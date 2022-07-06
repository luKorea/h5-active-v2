<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 10:52:32
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-01 17:11:11
 * @FilePath: /h5-active-v2/src/views/active/index/components/go-app.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: your name
 * @Date: 2022-04-26 15:07:37
 * @LastEditTime: 2022-04-26 16:31:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/views/vote/index/components/go-app.vue
-->
<template>
  <div class="content-wrap" style="margin-bottom: 0">
    <div class="app-wrap">
      <div class="app-bg" @click="goPage">
        <img :src="imgInfo.bannerImg" alt="" referrerpolicy="no-referrer" />
        <!-- <img :src="imgInfo.bgImg" alt="" referrerpolicy="no-referrer" /> -->
      </div>
      <!-- <div class="app-banner" @click="goPage">
        <img :src="imgInfo.bannerImg" alt="" referrerpolicy="no-referrer" />
      </div> -->
      <!-- <div class="app-btn" @click="goPage">
        <img :src="imgInfo.btnImg" alt="" referrerpolicy="no-referrer" />
      </div> -->
    </div>
  </div>
</template>

<script>
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";
import { BASE_IMAGE_VOTE_URL, BASE_IMAGE_ACTIVE_URL } from "@/request/config";
export default {
  name: "activeAppPageComponent",
  data() {
    return {
      imgInfo: {
        bgImg: BASE_IMAGE_VOTE_URL + "/app-bg.png",
        bannerImg: BASE_IMAGE_ACTIVE_URL + "/app-banner.png",
        btnImg: BASE_IMAGE_ACTIVE_URL + "/app-btn.png",
      },
    };
  },
  methods: {
    goPage() {
      openUrl(urlLink.appLink);
    },
  },
};
</script>

<style lang="less" scoped>
.app-wrap {
  width: 100%;
  position: relative;
  background-color: #fff;
  .app-bg {
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
  .app-title {
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
  .app-tip {
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
  .app-banner {
    position: absolute;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 320px;
      height: 100%;
    }
  }
  .app-btn {
    position: absolute;
    top: 498px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 153px;
      height: 100%;
    }
  }
}
</style>
