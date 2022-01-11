<!-- 可自定义内容弹框 -->
<template>
  <van-dialog
    v-model="isShow"
    v-bind="dialogOptions"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <slot name="content"></slot>
  </van-dialog>
</template>

<script>
export default {
  name: "koreaDialogs",
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
    dialogOptions: {
      type: Object,
      default: () => ({
        title: "添加用户",
        showConfirmButton: true, // 显示确认按钮
        showCancelButton: true, // 显示关闭按钮
        confirmButtonText: "确认", // 确认按钮文字
        confirmButtonColor: "", // 	确认按钮颜色
        cancelButtonText: "取消", // 取消按钮文案
        cancelButtonColor: "", //	取消按钮颜色
      }),
    },
  },
  computed: {
    isShow: {
      get() {
        return this.showDialog;
      },
      set(newValue) {
        console.log(newValue);
      },
    },
  },
  methods: {
    handleConfirm() {
      this.$emit("confirm", false);
    },
    handleCancel() {
      this.$emit("cancel", false);
    },
  },
};
</script>

<style scoped></style>
