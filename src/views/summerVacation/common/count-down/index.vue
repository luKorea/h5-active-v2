<!--
 * @Author: korealu
 * @Date: 2022-03-02 10:01:28
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-07 15:32:26
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/common/count-down/index.vue
-->
<template>
  <div class="count-wrap">
    <div class="count-down">
      <div class="img">
        <!-- <img :src="bgImg" alt="" referrerpolicy="no-referrer" /> -->
      </div>
      <div class="time-info">
        <div class="tip">距离活动结束还有</div>
        <div class="date one">{{ day }}</div>
        <div class="text">天</div>
        <div class="date two">{{ hour }}</div>
        <div class="text">时</div>
        <div class="date three">{{ min }}</div>
        <div class="text">分</div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_ACTIVE_URL } from "@/request/config";
import dayjs from "dayjs";
export default {
  name: "activeTimerPage",
  props: {
    // 结束时间，由外部传入
    curStartTime: {
      type: Number,
      default: 1648742399,
    },
  },
  data() {
    return {
      bgImg: BASE_IMAGE_ACTIVE_URL + "/timer.png",
      // curStartTime: 1648742399, // 结束时间
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
  justify-content: center;
  align-items: center;
  // padding: 20px;
  width: 100%;
  height: 57px;
  // margin-top: -30px;
  margin-bottom: 20px;
  position: relative;
  top: 13px;
  .count-down {
    position: relative;
    height: 57px;
    width: 342px;
    .img {
      width: 100%;
      height: 100%;
      position: relative;
      background-color: rgba(67, 159, 134, 1);
      border: 2px solid #1e1e1e;
      border-radius: 8px;
      box-sizing: border-box;
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
      width: 100%;
      height: 100%;
      .tip {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #fff;
        padding-left: 10px;
        padding-right: 8px;
        box-sizing: border-box;
      }
      .date {
        font-size: 26px;
        font-family: "korea-number", Source Han Sans CN;
        font-weight: bold;
        color: #fff;
        // border-bottom: 1px solid #b2b2b3;
        // margin-left: px;
        line-height: 28px;
        height: 26px;
        position: relative;
        display: inline-block;
        background-color: RGBA(51, 57, 84, 0.8);
        padding: 0 2px;
        // text-decoration: line-through;
        // &::before {
        //   content: "-";
        //   position: absolute;
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   width: 100%;
        //   color: #404040;
        //   // background-color: #404040;
        // }
      }
      .text {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #fff;
        margin: 0 6px;
      }
    }
  }
}
</style>
