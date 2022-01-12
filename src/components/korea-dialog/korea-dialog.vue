<!-- 可自定义内容弹框 -->
<template>
  <div class="modal-bg" v-show="showDialog">
    <div class="modal-content">
      <div class="modal-info animate__animated animate__fadeInDown">
        <div class="close-btn" @click="closeDialog"></div>
        <div class="bg-img" :style="bgStyle">
          <img :src="bgImg" alt="" />
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
.modal-info {
  position: relative;
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
  }
}
</style>
