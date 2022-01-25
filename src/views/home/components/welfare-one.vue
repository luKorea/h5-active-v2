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
            <div class="item-title">
              {{ index === 0 ? "创建队伍" : "邀请好友" }}
            </div>
          </div>
        </template>
        <!-- 只有一个用户 -->
        <template v-if="eventTwo">
          <div class="user-join-item">
            <div class="user-icon">
              <img
                :src="groupInfo.record.userInfo[0].iconUrl"
                alt=""
                referrerpolicy="no-referrer"
              />
            </div>
            <div class="item-title">
              {{ groupInfo.record.userInfo[0].nickName }}
            </div>
          </div>
          <div class="user-join-item" @click="copyLink">
            <div class="item-add"></div>
            <div class="item-title">
              {{ $route.query.inviteCode ? "加入组队" : "邀请好友" }}
            </div>
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
              <img :src="item.iconUrl" alt="" referrerpolicy="no-referrer" />
            </div>
            <div class="item-title">{{ item.nickName }}</div>
          </div>
        </template>
      </div>
    </div>

    <div class="join-success">
      <div class="user-join-success">{{ getUserPayTitle }}</div>
    </div>
  </div>
</template>

<script>
import { copyShareLink, errorInfo } from "@/utils";
import { mapState } from "vuex";
import { rulePayStatus } from "@/api";

export default {
  name: "welfare-one",
  props: {
    groupData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      bgImg: require("@/assets/image/welfare-bg-one.png"),
    };
  },
  computed: {
    ...mapState(["uid", "groupConfig", "userInfo"]),
    groupId() {
      return this.groupInfo.record?.userInfo[0].uid;
    },
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
    getUserPayTitle() {
      let title = "点击【+】或【立即充值】创建队伍！"; // 默认进入页面看到的文字
      if (
        this.groupInfo &&
        this.groupInfo.record !== null &&
        this.groupInfo.record.inviteCode
      )
        title = "点击右侧【+】生成邀请链接！"; // 开团人已经充值
      if (
        this.$route.query.inviteCode &&
        this.groupInfo &&
        this.groupInfo.record !== null
      )
        title = "点击【+】或【立即充值】加入组队！"; // 被邀请人进入页面后看得文字
      if (
        this.$route.query.inviteCode &&
        this.groupInfo &&
        this.groupInfo.record !== null &&
        this.groupInfo.record.userInfo.length >= 2
      )
        title = "组队成功！奖品已发放到双方对应Pofi账号！"; // 被邀请人充值后看到的文字
      return title;
    },
  },
  methods: {
    checkOutPayStatus(data) {
      return new Promise((resolve, reject) => {
        rulePayStatus(data).then((res) => {
          if (res.code === 200) {
            resolve(res);
          } else reject(res.msg);
        });
      });
    },
    showPayDialog() {
      console.log(this.uid, this.$route.query.uid);
      if (!this.uid) {
        this.$emit("handleLoginDialog", true);
      } else if (
        this.$route.query.inviteCode &&
        this.$route.query.ref !== "one"
      ) {
        this.$emit("handleShowOpenNewGroup");
      } else {
        const {
          payConfig: { fuliOneEid },
          uid,
          token,
        } = this.$store.state;
        const data = {
          eid: fuliOneEid,
          uid: uid,
          loginKey: token,
          inviteCode: this.$route.query.inviteCode ?? null,
        };
        this.checkOutPayStatus(data)
          .then(() => {
            this.$emit("handleDialog", "fuliOne");
          })
          .catch((err) => errorInfo(err));
      }
    },
    copyLink() {
      if (
        this.groupInfo.record !== null &&
        this.uid &&
        this.uid === this.groupId
      ) {
        if (this.uid === this.groupId) {
          const href = `${window.location.origin}${window.location.pathname}?inviteCode=${this.groupInfo.record.inviteCode}&ref=one`;
          console.log(href, "链接");
          copyShareLink(href, this);
        } else this.showPayDialog();
      } else if (this.uid !== this.groupId) {
        this.showPayDialog();
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
