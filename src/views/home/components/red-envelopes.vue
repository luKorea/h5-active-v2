<template>
  <div class="red-envelopes">
    <div class="red-title">
      <img :src="titleImg" alt="" />
    </div>
    <div class="red-black">
      <div class="bg">
        <img :src="bgImg" alt="" />
      </div>
      <div class="img-wrap">
        <div class="welfareOne" @click="goAnchorWelfare('one')">
          <img :src="welfareOne" alt="" />
        </div>
        <div class="welfareTwo" @click="goAnchorWelfare('two')">
          <img :src="welfareTwo" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "red-envelopes",
  data() {
    return {
      titleImg: require("@/assets/image/red-title.png"),
      bgImg: require("@/assets/image/red-bg.png"),
      welfareOne: require("@/assets/image/welfare-one.png"),
      welfareTwo: require("@/assets/image/welfare-two.png"),
    };
  },
  methods: {
    goAnchorWelfare(el) {
      this.$emit("anchor", el);
    },
  },
};
</script>

<style scoped lang="less">
.red-envelopes {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  .red-title {
    height: 81px;
    padding: 0 47px 0 47px;
    img {
      width: 100%;
      height: 100%;
      background-position: center;
    }
  }
  .red-black {
    width: 100%;
    margin-top: 20px;
    position: relative;
    .bg {
      width: 100%;
      height: 279px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img-wrap {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      .welfareOne {
        width: 149px;
        height: 263px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .welfareTwo {
        width: 149px;
        height: 263px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
