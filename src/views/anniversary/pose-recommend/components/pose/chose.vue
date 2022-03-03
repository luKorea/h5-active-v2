<!--
 * @Author: korealu
 * @Date: 2022-03-02 11:39:56
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-03 16:54:56
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/pose-recommend/components/pose/chose.vue
-->
<template>
  <div class="pose-chose">
    <div class="chose-bg-img">
      <img :src="bgImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <!-- 标题 -->
    <div class="pose-title">
      <img :src="titleImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="user-avatar">
        <img :src="userInfo.avatar" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="user-tip">
        <div class="user-id">POFI ID: {{ userInfo.id }}</div>
        <div class="user-tip">
          专业版: {{ userInfo.type ? "已过期" : "不知道" }} 余额:
          {{ userInfo.price }}P
        </div>
      </div>
    </div>
    <!-- 选中的图片 -->
    <div class="chose-img">
      <img :src="info.choseImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <template v-if="info.title !== ''">
      <!-- 选中的标题 -->
      <div class="chose-title">{{ info.title }}</div>
      <!-- 价格区域 -->
      <div class="chose-price">
        <img :src="priceImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </template>
    <!-- 购买区域标题 -->
    <div class="chose-pro-title">
      <img :src="proTitle" alt="" referrerpolicy="no-referrer" />
    </div>
    <!-- 专业版，SVIP套餐 -->
    <div class="chose-pro-wrap">
      <div class="pro" @click="handleChangePayModal('pro')">
        <img :src="proImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="svip" @click="handleChangePayModal('svip')">
        <img :src="svipImg" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
    <!-- 支付弹框 -->
    <pay-component
      ref="payRef"
      @payWechat="payWechat"
      @payAli="payAli"
      :payInfo="payInfo"
      :userInfo="userInfo"
    ></pay-component>
  </div>
</template>

<script>
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
import PayComponent from "@/components/pay";
export default {
  components: {
    PayComponent,
  },
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    userInfo() {
      return {
        avatar: BASE_IMAGE_ANNIVERSARY_URL + "/avatar.png",
        id: "1234567899",
        price: 0,
        type: 1, // 已过期
      };
    },
  },
  data() {
    return {
      payInfo: {},
      bgImg: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-chose-bg.png",
      titleImg: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-title.png",
      priceImg: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-money.png",
      proTitle: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pro-title.png",
      proImg: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pro.png",
      svipImg: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/svip.png",
    };
  },
  methods: {
    handleChangePayModal(type) {
      this.$refs["payRef"].showDialog = true;
      if (type === "pro") {
        this.payInfo = {
          title: "购买专业版",
        };
      } else {
        this.payInfo = {
          title: "购买SVIP",
        };
      }
    },
    payWechat() {},
    payAli() {},
  },
};
</script>

<style lang="less" scoped>
.pose-chose {
  width: 100%;
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
    top: 10px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 251px;
      height: 100%;
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
