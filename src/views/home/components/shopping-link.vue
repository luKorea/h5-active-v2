<template>
  <div class="shopping-link" @click="goDetails">
    <div class="shopping-img">
      <img :src="shoppingImg" referrerpolicy="no-referrer" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "shoppingLink",
  data() {
    return {
      shoppingImg: "https://f3.pofiapp.com/draw/xmas_2021/event-20211224_1.png",
      shopUrl:
        'https://www.xiaohongshu.com/vendor/61557aeb9e3eba00017c8b33?naviHidden=yes&xhsshare=CopyLink&appuid=5ed3b46f0000000001006c3d&apptime=1640343152"',
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
