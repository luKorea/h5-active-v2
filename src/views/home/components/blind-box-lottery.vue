<template>
  <div class="blind-wrap">这是抽奖区域</div>
</template>

<script>
export default {
  name: "blind-box-lottery",
  data() {
    return {
      initImg: require(""),
      threeToOne: require(""),
      sixToOne: require(""),
      showImg: null,
      status: 1, // 1.初始化显示 2. 选择三选一 3. 盲盒抽取
    };
  },
  mounted() {
    this.changeImg();
  },
  methods: {
    changeImg() {
      if (this.status === 1) {
        this.showImg = this.initImg;
      } else if (this.status === 2) {
        this.showImg = this.threeToOne;
      } else this.showImg = this.sixToOne;
    },
    openDialog() {
      this.$emit("openDialog");
    },
  },
};
</script>

<style scoped lang="less">
.blind-container {
  position: absolute;
  top: 400px;
}
</style>
