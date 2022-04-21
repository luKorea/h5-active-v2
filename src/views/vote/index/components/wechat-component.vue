<!--
 * @Author: your name
 * @Date: 2022-04-21 11:45:45
 * @LastEditTime: 2022-04-21 14:39:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/views/vote/index/components/wechat-component.vue
-->
<template>
  <div class="content-wrap">
    <div class="wechat-wrap">
      <div class="wechat-bg">
        <img :src="imgInfo.bgImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="wechat-title">
        <img :src="imgInfo.titleImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="wechat-tip">
        <span>扫码添加首席福利官的企业微信领取任务，</span>
        <span>完成任务可获得P币奖励哦！</span>
      </div>
      <div class="wechat-code">
        <img :src="imgInfo.qrcodeImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_VOTE_URL } from "@/request/config";
export default {
  name: "WechatComponent",
  data() {
    return {
      imgInfo: {
        bgImg: BASE_IMAGE_VOTE_URL + "/wechat-bg.png",
        titleImg: BASE_IMAGE_VOTE_URL + "/wechat-title.png",
        qrcodeImg: BASE_IMAGE_VOTE_URL + "/wechat-code.png",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.wechat-wrap {
  width: 100%;
  position: relative;
  .wechat-bg {
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
  .wechat-title {
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
  .wechat-tip {
    position: absolute;
    top: 100px;
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
  .wechat-code {
    position: absolute;
    top: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 190px;
      height: 190px;
    }
  }
}
</style>
