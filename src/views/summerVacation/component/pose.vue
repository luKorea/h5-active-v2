<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-11 17:29:02
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-12 17:16:27
 * @FilePath: /h5-active-v2/src/views/summerVacation/component/function-buy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="pose-buy">
    <div class="wrap-content">
      <img :src="headerImg" alt="" referrerpolicy="no-referrer" />
      <!-- 换一换区域 -->
      <div class="random-wrap" @click="getList">
        <div class="title">换一换</div>
        <van-icon name="replay" />
      </div>
      <!-- 展示区域 -->
      <template v-if="list && list.length > 0">
        <div class="item-wrap">
          <div
            class="item"
            v-for="item in list"
            :key="item.snId"
            @click="goApp(item.url)"
          >
            <div class="bg">
              <img :src="itemImg" alt="" referrerpolicy="no-referrer" />
              <div class="info">
                <div class="item-img">
                  <img :src="item.cover" alt="" referrerpolicy="no-referrer" />
                </div>
                <div class="text">{{ item.name }}</div>
                <div class="item-buy">
                  <img :src="buyImg" alt="" referrerpolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
import { randomPose } from "@/api/summary";
import { openAppUrl } from "@/utils";
export default {
  name: "pose-buy",
  data() {
    return {
      headerImg: BASE_IMAGE_SUMMARY_URL + "/pb-bg.png",
      itemImg: BASE_IMAGE_SUMMARY_URL + "/pose-item.png",
      buyImg: BASE_IMAGE_SUMMARY_URL + "/pose-buy-btn.png",
      list: [],
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    getList() {
      randomPose().then((res) => {
        if (res.state) {
          this.list = res.data;
        }
      });
    },
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
    goApp(url) {
      openAppUrl(url);
    },
  },
};
</script>

<style lang="less" scoped>
.pose-buy {
  margin-top: 60px;
  .random-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 280px;
    width: 90%;
    .title {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #1e1e1e;
      margin-right: 4px;
    }
  }
  .item-wrap {
    display: flex;
    position: absolute;
    top: 304px;
    padding: 0 30px 0 34px;
    .item {
      display: flex;
      flex-direction: column;
      .bg {
        position: relative;
        img {
          width: 100%;
          height: 100%;
          padding: 0;
        }
        .info {
          position: absolute;
          top: 10px;
          padding: 0 10px;
          display: flex;
          flex-direction: column;
          .item-img {
            width: 100%;
            height: 100%;
            margin-bottom: 10px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
          }
          .text {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #1e1e1e;
            line-height: 16px;
            margin-bottom: 10px;
          }
          .item-buy {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
