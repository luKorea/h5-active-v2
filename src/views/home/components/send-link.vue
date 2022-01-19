<template>
  <div class="send-link">
    <div class="img-wrap">
      <template v-if="list && list.length > 0">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="img-item"
          @click="goPage(item)"
        >
          <img :src="item.imgUrl" alt="" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { openUrl, copyShareLink } from "@/utils";
import urlLink from "@/utils/link";

export default {
  name: "send-link",
  data() {
    return {
      list: [
        {
          imgUrl: require("@/assets/image/weibo.png"),
          url: urlLink.weiboLink,
          type: "weibo",
        },
        {
          imgUrl: require("@/assets/image/red-book.png"),
          url: urlLink.redBookLink,
          type: "redBook",
        },
        {
          imgUrl: require("@/assets/image/contact.png"),
          url: urlLink.qqLink,
          type: "qq",
          urlForWechat: urlLink.wechatOpenQQLink,
        },
        {
          imgUrl: require("@/assets/image/share-copy.png"),
          url: urlLink.shareToFriendLink,
          type: "share",
        },
      ],
    };
  },
  methods: {
    goPage(item) {
      switch (item.type) {
        case "weibo":
          openUrl(item.url);
          break;
        case "redBook":
          openUrl(item.url);
          break;
        case "qq":
          this.isWechat() ? openUrl(item.urlForWechat) : openUrl(item.url);
          break;
        case "share":
          console.log(item.url);
          copyShareLink(`${item.url}?uid=${this.$store.state.uid}`, this);
      }
    },
    openDifferentWebsite(url) {
      window.open(url);
    },
    share() {
      if (this.isWechat()) {
        // 其他操作
      } else {
        console.log("复制文本操作");
      }
    },
    isWechat() {
      return navigator.userAgent.match(/micromessenger/i);
    },
  },
};
</script>

<style scoped lang="less">
.send-link {
  display: flex;
  justify-content: center;
  align-items: center;
  .img-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 60%;
    .img-item {
      width: 97px;
      height: 27px;
      margin-top: 18px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
