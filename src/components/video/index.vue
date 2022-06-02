<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-06-02 10:03:08
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-02 10:18:56
 * @FilePath: /h5-active-v2/src/components/video/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <video-player class="video" ref="videoPlayer" :options="options">
  </video-player>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";

export default {
  name: "koreaVideo",
  props: {
    options: {
      type: Object,
      require: true,
    },
  },
  components: {
    videoPlayer,
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
};
</script>

<style>
.vjs-poster,
.video-js {
  width: 100%;
  height: 100%;
  background-color: RGBA(145, 144, 143, 1);
  border-radius: 20px;
  z-index: 1;
}
.video-js .vjs-big-play-button {
  visibility: hidden;
}
</style>
<style lang="less" scoped>
.video {
  width: 338px;
  height: 490px;
}
</style>
