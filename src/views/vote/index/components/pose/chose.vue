<!--
 * @Author: korealu
 * @Date: 2022-03-02 11:39:56
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-07 16:39:22
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
        <img :src="userInfo.iconUrl" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="user-tip">
        <div class="user-id">POFI ID: {{ userInfo.nickId }}</div>
        <div class="user-tip">
          专业版:
          {{ new Date().getTime() > resetTime ? "已过期" : "未过期" }} 余额:
          {{
            userInfo.pocket && userInfo.pocket.gold
              ? userInfo.pocket.gold / 100
              : 0
          }}P
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
  </div>
</template>

<script>
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
export default {
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    userInfo: {
      type: Object,
      default: () => {},
    },
    resetTime: {
      type: String,
      default: "",
    },
  },
  computed: {
    proState() {
      const state = this.userInfo?.vips.forEach((item) => {
        if (item.func === "pro") {
          console.log(item);
        }
      });
      return state;
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
      this.$emit("openPayModal", type, this.info);
    },
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
