<!--
 * @Author: korealu
 * @Date: 2022-03-04 13:48:18
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-07 15:51:51
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/ordinary-recommend/components/shop.vue
-->
<template>
  <div class="pose-component">
    <div class="chose-bg-img">
      <img :src="bgImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <!-- 标题 -->
    <div class="pose-title">
      <img :src="titleImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <div class="pose-chose" @click="openLink('shoppingLink')">
      <img :src="choseImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <!-- 小红书 -->
    <div class="btn-wrap">
      <div class="btn" @click="openDialog">
        <img :src="drawerImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="btn" @click="openLink('redBookLink')">
        <img :src="redBookImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
    <!-- 规则 -->
    <div class="pose-rules">
      <div>活动规则：</div>
      <div>3月14日00:00起，在APP官方商城或小红书pofi官方店铺</div>
      <div>
        下单的前10名用户，将额外获得
        <span class="title-tip" @click="showRules">礼品卡大礼包</span>
      </div>
    </div>
    <van-dialog v-model="showDialog" :show-cancel-button="false">
      <div class="dialog-img">
        <img :src="qrCode" />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
import { Dialog } from "vant";
import urlLink from "@/utils/link";
import { openUrl } from "@/utils";
export default {
  data() {
    return {
      qrCode: require("@/assets/image/qrcode-drawer.jpeg"),
      bgImg: BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/waft-bg.png",
      titleImg:
        BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/waft-title.png",
      choseImg:
        BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/waft-chose.png",
      drawerImg:
        BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/waft-shop.png",
      redBookImg:
        BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/waft-redbook.png",
      showDialog: false,
    };
  },
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    openLink(type) {
      openUrl(urlLink[type]);
    },
    showRules() {
      Dialog.alert({
        title: "礼包详情",
        message: `大礼包包含：BJD大Q礼品卡一张、BJD小Q礼品卡一张、人鱼大Q礼品卡一张、BJD欧尼礼品卡一张、少女与麦克风礼品卡一张、莉莉丝礼品卡一张、桃瑞丝礼品卡一张。获得礼品卡大礼包名单将在3月31日在Pofi无限人偶公众号公布并发货。`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.pose-component {
  position: relative;
  .chose-bg-img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pose-title {
    width: 100%;
    position: absolute;
    top: 15px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 290px;
      height: 100%;
    }
  }
  .pose-chose {
    // width: 100%;
    position: absolute;
    top: 72px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .btn-wrap {
    position: absolute;
    top: 480px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    .btn {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .pose-rules {
    position: absolute;
    top: 540px;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    font-size: 11px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #79797e;
    line-height: 20px;
    .title-tip {
      color: #d4ae82;
      text-decoration: underline;
    }
  }
  .user-info {
    position: absolute;
    top: 66px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .user-avatar {
      width: 43px;
      height: 43px;
      margin-right: 10px;
      img {
        width: 43px;
        height: 43px;
        border: 2px solid #da842e;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }
    .user-tip {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #79797e;
      .user-id {
        margin-bottom: 6px;
      }
      //   justify-content: space-evenly;
    }
  }
  .chose-img {
    position: absolute;
    top: 100px;
    left: 0;
    padding: 16px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .chose-title {
    position: absolute;
    top: 300px;
    left: 0;
    text-align: center;
    width: 100%;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #ffffff;
    line-height: 22px;
  }
  .chose-price {
    position: absolute;
    top: 284px;
    left: 0;
    padding: 30px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .chose-pro-title {
    position: absolute;
    top: 400px;
    left: 0;
    padding: 30px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .chose-pro-wrap {
    position: absolute;
    top: 500px;
    left: 0;
    padding: 16px 14px;
    box-sizing: border-box;
    display: flex;
    .pro {
      width: 90%;
      height: 194px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .svip {
      width: 100%;
      height: 194px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
