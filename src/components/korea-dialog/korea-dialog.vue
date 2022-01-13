<!-- 可自定义内容弹框 -->
<template>
  <div class="modal-bg" v-show="showDialog">
    <div class="modal-content">
      <div class="modal-info animate__animated animate__fadeInDown">
        <div class="close-btn" @click="closeDialog"></div>
        <div class="bg-img" :style="bgStyle">
          <img :src="bgImg" style="width: 100%; height: 100%" alt="" />
        </div>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "koreaDialogs",
  props: {
    showDialog: {
      type: Boolean,
      required: true,
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
  methods: {
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

  .close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border-radius: 50%;
    //background: #ff264a;
  }
}
</style>
