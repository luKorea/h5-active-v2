<!--
 * @Author: korealu
 * @Date: 2022-03-02 10:01:28
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-11 09:26:03
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/common/count-down/index.vue
-->
<template>
  <div class="count-wrap">
    <div class="count-down">
      <div class="img">
        <img :src="bgImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="time-info">
        <span class="tip">距离活动结束还有</span>
        <span class="date">{{ day }}</span>
        <span class="text">天</span>
        <span class="date">{{ hour }}</span>
        <span class="text">时</span>
        <span class="date">{{ min }}</span>
        <span class="text">分</span>
        <!-- <span class="date">{{ second }}</span>
        <span class="text">秒</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
import dayjs from "dayjs";
export default {
  data() {
    return {
      bgImg: BASE_IMAGE_ANNIVERSARY_URL + "/countDown.png",
      curStartTime: 1648742399, // 结束时间
      day: "0",
      hour: "00",
      min: "00",
      second: "00",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.countTime();
    });
  },
  methods: {
    countTime() {
      // 获取当前时间
      let now = dayjs(new Date()).valueOf();
      // 设置截止时间
      // let endDate = new Date(this.curStartTime); // this.curStartTime需要倒计时的日期
      let end = this.curStartTime * 1000;
      if (now !== undefined && end !== undefined) {
        // 时间差
        let leftTime = end - now;
        // 定义变量 d,h,m,s保存倒计时的时间
        if (leftTime >= 0) {
          // 天
          this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
          // 时
          let h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
          this.hour = h < 10 ? "0" + h : h;
          // 分
          let m = Math.floor((leftTime / 1000 / 60) % 60);
          this.min = m < 10 ? "0" + m : m;
          // 秒
          let s = Math.floor((leftTime / 1000) % 60);
          this.second = s < 10 ? "0" + s : s;
        } else {
          this.day = 0;
          this.hour = "00";
          this.min = "00";
          this.second = "00";
        }
        // 等于0的时候不调用
        if (
          Number(this.hour) === 0 &&
          Number(this.day) === 0 &&
          Number(this.min) === 0 &&
          Number(this.second) === 0
        ) {
          return;
        } else {
          // 递归每秒调用countTime方法，显示动态时间效果,
          setTimeout(this.countTime, 1000);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.count-wrap {
  display: flex;
  padding: 20px;
  margin-top: -100px;
  .count-down {
    position: relative;
    .img {
      width: 100%;
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .time-info {
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .tip {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #404040;
      }
      .date {
        font-size: 26px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #0f0f0f;
        border-bottom: 1px solid #b2b2b3;
        margin-left: 3px;
        line-height: 26px;
      }
      .text {
        font-size: 13px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #404040;
        margin-bottom: -16px;
        margin-left: 4px;
      }
    }
  }
}
</style>
