<!--
 * @Author: korealu
 * @Date: 2022-03-04 14:37:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-04 15:52:52
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/ordinary-recommend/components/anniver.vue
-->
<template>
  <div class="even-components">
    <div class="chose-bg-img">
      <img :src="bgImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <!-- 标题 -->
    <div class="pose-title">
      <img :src="titleImg" alt="" referrerpolicy="no-referrer" />
    </div>
    <!-- 图片区域 -->
    <div class="item-wrap">
      <template v-for="(item, index) in list">
        <div
          class="item"
          :style="{ marginRight: index % 2 === 0 ? '4px' : '0px' }"
          :key="item.id"
          @click="handleClick(item.id)"
        >
          <img :src="item.img" alt="" referrerpolicy="no-referrer" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
export default {
  data() {
    return {
      bgImg: BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/youhui-bg.png",
      titleImg:
        BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/youhui-title.png",
      list: [
        {
          id: "two",
          img:
            BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/youhui-one.png",
        },
        {
          id: "three",
          img:
            BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/youhui-two.png",
        },
        {
          id: "four",
          img:
            BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/youhui-three.png",
        },
        {
          id: "five",
          img:
            BASE_IMAGE_ANNIVERSARY_URL + "/ordinary-recommend/youhui-four.png",
        },
      ],
    };
  },
  methods: {
    handleClick(el) {
      this.$emit("goAnchor", el);
    },
  },
};
</script>

<style lang="less" scoped>
.even-components {
  position: relative;
  margin-bottom: 30px;
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
      width: 287px;
      height: 100%;
    }
  }
  .item-wrap {
    width: 100%;
    position: absolute;
    flex-wrap: wrap;
    top: 80px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      width: 151px;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .pose-chose {
    width: 100%;
    position: absolute;
    top: 125px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 257px;
      height: 100%;
    }
  }
  .btn-wrap {
    width: 100%;
    position: absolute;
    top: 240px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
    .btn {
      width: 100%;
      height: 100%;
      img {
        width: 146px;
        height: 100%;
      }
    }
  }
  .pose-mini {
    position: absolute;
    top: 320px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding: 0 14px;
    width: 100%;
    img {
      width: 293px;
      height: 100%;
    }
  }
  .user-info {
    position: absolute;
    top: 70px;
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
        // margin-bottom: 6px;
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
