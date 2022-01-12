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
