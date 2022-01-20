<template>
  <div class="welfare-one-wrap" id="welfareOne">
    <div class="bg-img">
      <img :src="bgImg" alt="" />
    </div>

    <div class="user-info" v-show="uid">
      <div class="common-user-id">
        <div class="left-text">当前用户</div>
        <div class="right-white">
          <div class="left-circle"></div>
          <div class="right-text">POfi ID: {{ uid }}</div>
        </div>
      </div>
    </div>
    <div class="send-money">
      <div class="send-info" @click="showPayDialog">立即充值</div>
    </div>
    <div class="join-us">
      <div class="user-join-wrap">
        <!-- 初始情况 -->
        <template v-if="eventOne">
          <div
            class="user-join-item"
            v-for="(item, index) in 2"
            :key="index"
            @click="copyLink"
          >
            <div class="item-add"></div>
            <div class="item-title">邀请好友</div>
          </div>
        </template>
        <!-- 只有一个用户 -->
        <template v-if="eventTwo">
          <div class="user-join-item">
            <div class="user-icon">
              <img :src="groupInfo.record.userInfo[0].iconUrl" alt="" />
            </div>
            <div class="item-title">
              {{ groupInfo.record.userInfo[0].nickName }}
            </div>
          </div>
          <div class="user-join-item" @click="copyLink">
            <div class="item-add"></div>
            <div class="item-title">邀请好友</div>
          </div>
        </template>
        <!-- 组队数目大于二的情况 -->
        <template v-if="eventThree">
          <div
            class="user-join-item"
            v-for="(item, index) in groupInfo.record.userInfo"
            :key="index"
          >
            <div class="user-icon">
              <img :src="item.iconUrl" alt="" />
            </div>
            <div class="item-title">{{ item.nickName }}</div>
          </div>
        </template>
      </div>
    </div>

    <div class="join-success">
      <div class="user-join-success">
        组队成功！现在可以开始选择奖品方案啦！
      </div>
    </div>
  </div>
</template>

<script>
import { copyShareLink } from "@/utils";
import { mapState } from "vuex";

export default {
  name: "welfare-one",
  props: {
    groupData: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      bgImg: require("@/assets/image/welfare-bg-one.png"),
    };
  },
  computed: {
    ...mapState(["uid", "groupConfig", "userInfo"]),
    groupInfo() {
      return this.groupData;
    },
    eventOne() {
      return !this.groupInfo || this.groupInfo.record === null;
    },
    eventTwo() {
      return (
        this.groupInfo &&
        this.groupInfo.record !== null &&
        this.groupInfo.record.userInfo.length === 1
      );
    },
    eventThree() {
      return (
        this.groupInfo &&
        this.groupInfo.record !== null &&
        this.groupInfo.record.userInfo.length >= 2
      );
    },
  },
  methods: {
    showPayDialog() {
      this.$emit("handleDialog", "fuliOne");
    },
    copyLink() {
      if (this.uid) {
        copyShareLink(`${window.location.href}?uid=${this.uid}&ref=one`, this);
      } else this.$emit("handleLoginDialog", true);
    },
  },
};
</script>

<style scoped lang="less">
.welfare-one-wrap {
  width: 100%;
  position: relative;
  margin-top: 20px;
  .bg-img {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user-info {
    position: absolute;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .send-money {
    position: absolute;
    top: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    .send-info {
      width: 153px;
      height: 39px;
      line-height: 39px;
      text-align: center;
      background: #ffffff;
      box-shadow: 0 3px 4px 1px rgba(0, 0, 0, 0.35);
      border-radius: 14px;
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ba2b2a;
    }
  }
  .join-us {
    position: absolute;
    top: 520px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .join-success {
    position: absolute;
    top: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
