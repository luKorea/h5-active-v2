<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 11:10:58
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-02 17:32:51
 * @FilePath: /h5-active-v2/src/views/active/home/home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <count-down :curStartTime="1656259199"></count-down>
    <!-- 顶部大item -->
    <div class="item-wrap">
      <template v-if="itemList && itemList.length > 0">
        <div
          v-for="(item, index) in itemList"
          :key="index"
          class="item"
          @click="openPage(item.id)"
        >
          <img :src="item.imgUrl" alt="" referrerpolicy="no-referrer" />
        </div>
      </template>
    </div>
    <!-- 调查问卷 -->
    <!-- <question-component /> -->
    <!-- 企业微信 -->
    <!-- <wechat-component /> -->
    <!-- 小item区域 -->
    <div class="white-wrap">
      <div class="img-tip">
        <img :src="tipImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="send-link1">
        <div class="img-wrap">
          <template v-if="itemList && itemList.length > 0">
            <template v-for="(item, index) in itemList">
              <div
                :key="index"
                v-if="item.src"
                class="img-item"
                @click="openPage(item.id)"
              >
                <img :src="item.src" alt="" referrerpolicy="no-referrer" />
              </div>
            </template>
          </template>
        </div>
      </div>
      <!-- APP介绍区域 -->
      <app-component />
      <send-link></send-link>
    </div>
  </div>
</template>

<script>
import SendLink from "../common/part";
import CountDown from "../common/count-down";
// import questionComponent from "./components/question-component.vue";
// import wechatComponent from "./components/wechat-component.vue";
import appComponent from "../common/go-app/index.vue";
import { BASE_IMAGE_ACTIVE_URL } from "@/request/config";
export default {
  name: "activeHomePage",
  components: {
    SendLink,
    // questionComponent,
    // wechatComponent,
    appComponent,
    CountDown,
  },
  created() {
    document.title = "Pofi盛夏福利";
  },
  data() {
    return {
      tipImg: BASE_IMAGE_ACTIVE_URL + "/trigon.png",
      itemList: [
        {
          id: 2,
          imgUrl: BASE_IMAGE_ACTIVE_URL + "/home-function.png",
          src: BASE_IMAGE_ACTIVE_URL + "/function-item.png",
        },
        {
          id: 3,
          imgUrl: BASE_IMAGE_ACTIVE_URL + "/home-pay.png",
          src: BASE_IMAGE_ACTIVE_URL + "/pay-item.png",
        },
        {
          id: 4,
          imgUrl: BASE_IMAGE_ACTIVE_URL + "/home-even.png",
          src: BASE_IMAGE_ACTIVE_URL + "/even-item.png",
        },
        {
          id: 5,
          imgUrl: BASE_IMAGE_ACTIVE_URL + "/home-real-even.png",
          src: BASE_IMAGE_ACTIVE_URL + "/real-even-item.png",
        },
        {
          id: undefined,
          imgUrl: BASE_IMAGE_ACTIVE_URL + "/wechat-banner.png",
        },
      ],
    };
  },
  methods: {
    openPage(pageNumber) {
      this.$emit("openPage", pageNumber);
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  background-color: #7a92fe;
  .img-tip {
    width: 100%;
    height: 100%;
    margin-top: 20px;
    // background-image: url("https://f3.pofiapp.com/event/active/trigon.png");
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    width: 100%;
    .item {
      width: 100%;
      height: 100%;
      // margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .white-wrap {
    background-color: #fff;
    width: 100%;
    .send-link1 {
      display: flex;
      justify-content: center;
      align-items: center;
      // margin: 20px 0;
      margin-top: 20px;
      width: 100%;
      .img-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        // width: 80%;
        .img-item {
          width: 171px;
          height: 98px;
          // margin-top: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
