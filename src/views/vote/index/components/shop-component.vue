<!--
 * @Author: your name
 * @Date: 2022-04-21 11:44:24
 * @LastEditTime: 2022-04-21 18:00:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/views/vote/index/components/shop-component.vue
-->
<template>
  <div class="content-wrap">
    <div class="shop-wrap">
      <div class="shop-bg">
        <img :src="imgInfo.bgImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="shop-title">
        <img :src="imgInfo.titleImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="shop-tip">
        <span
          >截止<span class="block"> 2022年5月5日23:59 </span
          >，在以下两个渠道买实体人偶
        </span>
        <span>享满减优惠与礼品卡赠品优惠！</span>
      </div>
      <div class="shop-banner">
        <img :src="imgInfo.bannerImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="shop-btn">
        <div class="btn" @click="openPage(1)">
          <img :src="imgInfo.superImg" alt="" referrerpolicy="no-referrer" />
        </div>
        <div class="btn" @click="openPage(0)">
          <img :src="imgInfo.redbookImg" alt="" referrerpolicy="no-referrer" />
        </div>
      </div>
      <div class="shop-info">
        <div class="tip">
          *五一假期期间订单将统一在5月6日之后按照订单先后顺序用中通快递发出，敬请留意！
        </div>
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
import { BASE_IMAGE_VOTE_URL } from "@/request/config";
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";
export default {
  name: "shopComponent",
  data() {
    return {
      qrCode: require("@/assets/image/qrcode-drawer.jpeg"),
      showDialog: false,
      imgInfo: {
        bgImg: BASE_IMAGE_VOTE_URL + "/shop-bg.png",
        titleImg: BASE_IMAGE_VOTE_URL + "/shop-title.png",
        bannerImg: BASE_IMAGE_VOTE_URL + "/shop-banner.png",
        superImg: BASE_IMAGE_VOTE_URL + "/shop-supermarket.png",
        redbookImg: BASE_IMAGE_VOTE_URL + "/shop-redbook.png",
      },
    };
  },
  methods: {
    openPage(type) {
      if (type) {
        this.showDialog = true;
      } else openUrl(urlLink.redBookLink);
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-img {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.shop-wrap {
  width: 100%;
  position: relative;
  .shop-bg {
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
  .shop-title {
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
  .shop-tip {
    position: absolute;
    top: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    .block {
      background: #bcdc95;
      border-radius: 6px;
      padding: 2px;
    }
    span {
      font-size: 11px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #136a19;
      line-height: 22px;
    }
  }
  .shop-banner {
    position: absolute;
    top: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 305px;
      height: 100%;
    }
  }
  .shop-btn {
    position: absolute;
    top: 340px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 159px;
      height: 100%;
    }
  }
  .shop-info {
    position: absolute;
    top: 390px;
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
    }
  }
}
</style>
