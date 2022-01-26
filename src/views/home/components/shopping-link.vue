<!--
 * @Author: korealu
 * @Date: 2022-01-13 17:43:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-01-26 16:55:15
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/home/components/shopping-link.vue
-->
<template>
  <div class="shopping-link" @click="goDetails">
    <div class="shopping-img">
      <img :src="shoppingImg" referrerpolicy="no-referrer" alt="" />
    </div>
  </div>
</template>

<script>
import urlLink from "@/utils/link";
export default {
  name: "shoppingLink",
  data() {
    return {
      shoppingImg: require("@/assets/image/shopping.png"),
      shopUrl: urlLink.shoppingLink,
    };
  },
  methods: {
    goDetails() {
      window._czc.push([
        "_trackEvent",
        "2022新春活动",
        "广告点击",
        "2022_spring_ad_click",
      ]);
      window.open(this.shopUrl);
    },
  },
};
</script>

<style scoped lang="less">
.shopping-link {
  margin: 20px;
  .shopping-img {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
