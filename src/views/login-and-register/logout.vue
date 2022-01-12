<template>
  <korea-dialog
    :bg-img="logoutImg"
    :show-dialog="showDialog"
    @closeDialog="closeDialog"
  >
    <template #content>
      <div class="logout-content">
        <div class="title">用户登录</div>
        <div class="btn-wrap">
          <div class="yes" @click="logout">是</div>
          <div class="no" @click="closeDialog">否</div>
        </div>
      </div>
    </template>
  </korea-dialog>
</template>

<script>
import koreaDialog from "@/components/korea-dialog/korea-dialog";

export default {
  name: "logout",
  components: { koreaDialog },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logoutImg: require("@/assets/image/logout.png"),
      appImg: require("@/assets/image/go-app.png"),
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    logout() {
      this.closeDialog();
      this.$emit("logout");
    },
  },
};
</script>

<style lang="less" scoped>
.logout-content {
  position: absolute;
  top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #f9f9f9;
  .title {
    font-size: 23px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #c9c9c9;
  }
  .btn-wrap {
    display: flex;
    margin-top: 22px;
    .yes {
      width: 67px;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #4c4c4c;
      border-radius: 22px;
      margin-right: 47px;
      font-size: 21px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #f9f9f9;
    }
    .no {
      width: 67px;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ff264a;
      border-radius: 22px;
      font-size: 21px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #f9f9f9;
    }
  }
}
</style>
