<!-- 可自定义内容弹框 -->
<template>
  <van-overlay :show="showDialog" z-index="99" :lock-scroll="false">
    <div class="modal-content">
      <div class="modal-info">
        <div class="close-wrap" :style="{ top: closeBtnTop }">
          <div class="close-btn">
            <img @click.stop.prevent="closeDialog" :src="closeBtnImg" alt="" />
          </div>
        </div>
        <div class="bg-img" :style="bgStyle">
          <img :src="bgImg" style="width: 100%; height: 100%" alt="" />
        </div>
        <slot name="content"></slot>
      </div>
    </div>
  </van-overlay>

  <!--  <div class="modal-bg" v-show="showDialog">-->
  <!--    <div class="modal-content">-->
  <!--      <div class="modal-info animate__animated animate__fadeInDown">-->
  <!--        <div class="close-btn" @click.stop="closeDialog"></div>-->
  <!--        <div class="bg-img" :style="bgStyle">-->
  <!--          <img :src="bgImg" style="width: 100%; height: 100%" alt="" />-->
  <!--        </div>-->
  <!--        <slot name="content"></slot>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
export default {
  name: "koreaDialogs",
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    closeBtnTop: {
      type: String,
      default: "20px",
    },
    bgImg: {
      type: String,
      default: require("@/assets/image/modal-bg.png"),
    },
    bgStyle: {
      type: Object,
      default: () => ({
        width: "100%",
        height: "100%",
      }),
    },
  },
  data() {
    return {
      closeBtnImg: require("@/assets/image/close-btn.png"),
    };
  },
  // watch: {
  //   showDialog: {
  //     handler() {
  //       this.showDialog ? this.noSliding() : this.sliding();
  //     },
  //   },
  // },
  methods: {
    bodyScroll(event) {
      event.preventDefault();
    },
    /**禁止页面滑动*/
    noSliding() {
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", this.bodyScroll, false); //禁止页面滑动
    },
    /**允许页面滑动*/
    sliding() {
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", this.bodyScroll, false);
    },
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    handleConfirm() {
      this.$emit("confirm", false);
    },
    handleCancel() {
      this.$emit("cancel", false);
    },
  },
};
</script>

<style scoped lang="less">
.modal-bg {
  z-index: 2001;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal-content {
  z-index: 2002;
  position: fixed;
  top: 45%;
  left: 50%;
  width: 100%;
  overflow: hidden;
  font-size: 16px;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, -webkit-transform;
  transition-property: transform, opacity;
  transition-property: transform, opacity, -webkit-transform;
}
.modal-info {
  position: relative;
  width: 100%;
  .bg-img {
    //width: 100%;
    //height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .close-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    position: absolute;
    .close-btn {
      width: 32px;
      height: 32px;
      margin-right: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
