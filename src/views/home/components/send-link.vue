<template>
  <div class="send-link">第三方链接区域</div>
</template>

<script>
export default {
  name: "send-link",
  methods: {
    openDifferentWebsite(url) {
      window.open(url);
    },
    openQQ() {
      if (this.isWechat()) {
        this.openDifferentWebsite(
          "https://work.weixin.qq.com/gm/e13e073d78c03479eb357c7510ee2a2a"
        );
      } else {
        this.openDifferentWebsite("https://jq.qq.com/?_wv=1027&k=defqJUES");
      }
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
  text-align: center;
  color: white;
  font-size: 12px;
}
</style>
