<template>
  <div class="flex-wrap">
    <div class="flex-btn">
      <template v-if="list && list.length > 0">
        <div
          class="flex-item"
          v-for="(item, index) in list"
          :key="index"
          @click="goPage(item.url)"
        >
          <div :class="index === 0 ? 'img1' : index === 1 ? 'img2' : 'img3'">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="item-name">{{ item.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";

export default {
  name: "flex-btn",
  data() {
    return {
      list: [
        {
          imgUrl: require("@/assets/image/icon-user.png"),
          url: "login",
          name: "登录账号",
        },
        {
          imgUrl: require("@/assets/image/icon-people.png"),
          url: urlLink.appLink,
          name: "打开APP",
        },
        {
          imgUrl: require("@/assets/image/icon-fuli.png"),
          url: "prize",
          name: "我的奖品",
        },
      ],
    };
  },
  methods: {
    goPage(type) {
      if (type === "login") {
        this.$emit("handleLoginDialog", true);
      } else if (type === "prize") {
        this.$emit("handlePrizeDialog", true);
      } else openUrl(type);
    },
  },
};
</script>

<style scoped lang="less">
.flex-wrap {
  position: fixed;
  right: 6px;
  top: 280px;
  z-index: 99;
  .flex-btn {
    display: flex;
    flex-direction: column;
    .flex-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 14px;
      width: 60px;
      background: linear-gradient(270deg, #81221d 26%, #fef6ea 100%);
      opacity: 0.45;
      border-radius: 22px;
      padding: 4px 2px;
      img {
        width: 100%;
        height: 100%;
      }
      .img1 {
        width: 17px;
        height: 20px;
      }
      .img2 {
        width: 9px;
        height: 22px;
      }
      .img3 {
        width: 16px;
        height: 15px;
      }
      .item-name {
        font-size: 11px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: #ffffff;
        margin-top: 4px;
      }
    }
  }
}
</style>
