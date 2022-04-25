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
          <img :src="item.imgUrl" alt="" referrerpolicy="no-referrer" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { openUrl, copyShareLink } from "@/utils";
import urlLink from "@/utils/link";
import { BASE_IMAGE_VOTE_URL } from "@/request/config";

export default {
  name: "send-link",
  data() {
    return {
      list: [
        {
          imgUrl: BASE_IMAGE_VOTE_URL + "/weibo.png",
          url: urlLink.weiboLink,
          type: "weibo",
        },
        {
          imgUrl: BASE_IMAGE_VOTE_URL + "/redbook.png",
          url: urlLink.redBookLink,
          type: "redBook",
        },
        {
          imgUrl: BASE_IMAGE_VOTE_URL + "/qq.png",
          url: urlLink.voteQQLink,
          type: "qq",
          urlForWechat: urlLink.voteQQLink,
        },
        {
          imgUrl: BASE_IMAGE_VOTE_URL + "/share.png",
          url: window.location.origin + window.location.pathname,
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
          copyShareLink(`${item.url}`, this, "链接复制成功，分享给好友吧");
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
  margin-bottom: 20px;
  .img-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    .img-item {
      width: 150px;
      height: 38px;
      margin-top: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
