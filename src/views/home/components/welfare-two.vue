<template>
  <div class="welfare-one-wrap" id="welfareTwo">
    <div class="bg-img">
      <img :src="bgImg" alt="" />
    </div>
    <div class="user-info" v-show="uid">
      <div class="common-user-id">
        <div class="left-text">当前用户</div>
        <div class="right-white">
          <div class="left-circle"></div>
          <div class="right-text">Pofi ID : {{ userInfo.nickId }}</div>
        </div>
      </div>
    </div>
    <div class="send-buy">
      <div class="send-info" @click="showPayDialog(1)">立即购买</div>
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

    <div class="user-info-join" v-show="uid">
      <div class="common-user-id">
        <div class="left-text">当前用户</div>
        <div class="right-white">
          <div class="left-circle"></div>
          <div class="right-text">Pofi ID : {{ userInfo.nickId }}</div>
        </div>
      </div>
    </div>

    <!--抽奖区域-->
    <div class="blind-container">
      <blind-box-lottery
        ref="blindBox"
        @showDifferentDialog="openDialog"
        :list-data="listData"
      />
    </div>
    <!--自选盲盒开奖区域，状态逻辑看 status -->
    <korea-dialog
      :bg-img="modalBgImg"
      :show-dialog="showDialog"
      @closeDialog="closeDialog"
      close-btn-top="26px"
    >
      <template #content>
        <div class="prize-content" :style="prizeContentTop">
          <div class="show-modal-title">
            <!--撒花图片-->
            <div class="show-success-img" v-if="showFlower">
              <img :src="successImg" alt="" />
            </div>
            <!--显示标题-->
            <div
              class="show-title"
              :class="
                (status === 3 || status === 4 || status === 6) &&
                'success-title'
              "
            >
              {{ computedInfo.title }}
            </div>
            <!--中间区域显示内容-->
            <div class="show-center-wrap">
              <div
                class="center-img"
                v-if="status === 1 || status === 3 || status === 4"
              >
                <img
                  :src="showDifferentSuccessInfo.url"
                  referrerpolicy="no-referrer"
                  alt=""
                />
              </div>
              <div class="center-arrow-wrap" v-else>
                <!--盲盒兑换区域-->
                <div class="left-img" v-if="status === 5">
                  <img
                    :src="prizeWhiteImg"
                    referrerpolicy="no-referrer"
                    alt=""
                  />
                  <div class="tip">已拥有人偶</div>
                </div>
                <!--兑换区域-->
                <div class="img-shadow" v-else>
                  <div class="shadow"></div>
                  <img
                    :src="showDifferentSuccessInfo.url"
                    referrerpolicy="no-referrer"
                    alt=""
                  />
                </div>
                <div class="middle-img">
                  <img :src="arrowImg" referrerpolicy="no-referrer" alt="" />
                </div>
                <div class="right-img">
                  <img :src="p8Img" referrerpolicy="no-referrer" alt="" />
                </div>
              </div>
              <div class="center-tip">{{ computedInfo.tip }}</div>
            </div>
            <!--底部显示内容-->
            <template v-if="status === 1 || status === 2">
              <div class="show-footer-btn">
                <div class="btn-wrap">
                  <div
                    class="btn"
                    :class="status === 1 && 'active'"
                    @click="receivePrize"
                  >
                    是
                  </div>
                  <div
                    class="btn"
                    :class="status === 2 && 'active'"
                    @click="closeDialog"
                  >
                    否
                  </div>
                </div>
              </div>
            </template>
            <template v-if="status === 5">
              <div class="prize-desc-wrap">
                <div class="desc-btn" @click="receivePrize">
                  我已知晓 开启抽奖
                </div>
              </div>
            </template>
            <template v-if="status === 3 || status === 4 || status === 6">
              <div class="app-wrap">
                <div class="app-img" @click="goApp">
                  <img :src="appImg" referrerpolicy="no-referrer" alt="" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </korea-dialog>
  </div>
</template>

<script>
import koreaDialog from "@/components/korea-dialog/korea-dialog";
import { copyShareLink, errorInfo, openUrl } from "@/utils";
import urlLink from "@/utils/link";
import BlindBoxLottery from "@/views/home/components/blind-box-lottery";
import { mapState } from "vuex";
import { getPrizeToUser, rulePayStatus } from "@/api";
import { Dialog } from "vant";

export default {
  name: "welfare-two",
  components: { BlindBoxLottery, koreaDialog },
  props: {
    groupData: {
      type: Object,
      default: () => {},
    },
    listData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      bgImg: require("@/assets/image/welfare-bg-two.png"),
      modalBgImg: require("@/assets/image/prize-modal.png"),
      successImg: require("@/assets/image/prize-success.png"),
      arrowImg: require("@/assets/image/prize/arrow.png"),
      prizeWhiteImg: require("@/assets/image/prize/white-prize.png"),
      prizeImg: require("@/assets/image/prize/small.png"),
      p8Img: require("@/assets/image/prize/qb.png"),
      appImg: require("@/assets/image/go-app.png"),
      showDialog: false,
      /**
       * 1. 自选：没有该商品，显示是否领取
       * 2. 自选：已有该商品。显示是否兑换成对应的P币
       * 3. 自选：成功领取商品
       * 4. 盲盒：没有该商品，显示恭喜您抽中了
       * 5. 盲盒：抽中的商品已拥有，显示是否开始抽奖，开启抽奖后显示状态
       * 6. 盲盒：抽中已有商品，显示商品转P币
       */
      status: 1,
      showDifferentSuccessInfo: {},
      userPayStatus: false,
    };
  },
  computed: {
    ...mapState(["uid", "groupConfig", "userInfo", "token", "payConfig"]),
    getUserPayTitle() {
      let title = "点击【+】或【立即充值】创建队伍！"; // 默认进入页面看到的文字
      if (this.groupInfo == null) {
        title = "点击【+】或【立即充值】创建队伍！";
      }
      if (
        this.groupInfo &&
        this.groupInfo.record !== null &&
        this.groupInfo.record.inviteCode
      )
        title = "点击右侧【+】生成邀请链接！"; // 开团人已经充值
      if (
        this.$route.query.inviteCode &&
        this.groupInfo &&
        this.groupInfo.record !== null &&
        this.groupInfo.record.userInfo.length === 1
      )
        title = "点击【+】或【立即购买】加入组队！"; // 被邀请人进入页面后看得文字
      if (
        !this.$route.query.inviteCode &&
        this.groupInfo &&
        this.groupInfo.record !== null &&
        this.groupInfo.record.userInfo.length >= 2
      )
        title = "组队成功！现在可以开始选择奖品方案啦！"; // 被邀请人充值后看到的文字
      if (
        this.$route.query.inviteCode &&
        this.groupInfo &&
        this.groupInfo.record !== null &&
        this.groupInfo.record.userInfo.length >= 2
      )
        title = "组队成功！现在可以开始选择奖品方案啦！"; // 被邀请人充值后看到的文字
      return title;
    },
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
    // 文字距离顶部距离
    prizeContentTop() {
      return {
        top:
          this.status === 3 || this.status === 4 || this.status === 6
            ? "4px"
            : "30px",
      };
    },
    // 显示撒花图片
    showFlower() {
      return this.status === 3 || this.status === 4 || this.status === 6;
    },
    computedInfo() {
      let title = "";
      let tip = "";
      let status = this.status;
      switch (status) {
        case 1:
          title = "是否领取当前奖品";
          tip = this.showDifferentSuccessInfo.name ?? "";
          break;
        case 2:
          title = "已拥有该人偶";
          tip = "人偶将转化为18P币，是否领取18P币？";
          break;
        case 3:
          title = "您已成功领取";
          tip = "奖品已发放到您的Pofi帐号中";
          break;
        case 4:
          title = "恭喜您抽中了";
          tip = "奖品已发放到您的Pofi帐号中";
          break;
        case 5:
          title = "是否开启抽奖";
          tip = "若抽到已拥有人偶将转化为18P币，是否确认抽奖？";
          break;
        case 6:
          title = "恭喜您抽中了";
          tip = "奖品已发放到您的Pofi帐号中";
          break;
      }
      return {
        title,
        tip,
      };
    },
  },
  methods: {
    getPrizeSuccess(scheme, force = 0) {
      const data = {
        eid: this.payConfig.fuliTwoEid,
        force: force,
        loginKey: this.token,
        uid: this.uid,
        rewardId: scheme === 1 ? this.showDifferentSuccessInfo.id : 0,
        scheme: scheme,
      };
      getPrizeToUser(data).then((res) => {
        if (res.code === 200) {
          this.showDifferentSuccessInfo = res.data;
          if (scheme === 2) {
            this.$refs["blindBox"].startRoll();
            localStorage.setItem("prizeSuccess", JSON.stringify(res));
            return;
          }
          if (scheme === 1) this.status = 3;
        } else if (res.code === 12) {
          this.status = 2;
        } else errorInfo(res.msg);
      });
    },
    receivePrize() {
      switch (this.status) {
        case 1:
          this.getPrizeSuccess(1);
          break;
        case 2:
          this.getPrizeSuccess(1, 1);
          break;
        case 5:
          this.showDialog = false;
          this.getPrizeSuccess(2);
          break;
      }
    },
    checkOutPayStatus(data) {
      return new Promise((resolve, reject) => {
        rulePayStatus(data).then((res) => {
          if (res.code === 200) {
            resolve(res);
          } else reject(res.msg);
        });
      });
    },
    _isWechat() {
      return navigator.userAgent.match(/micromessenger/i);
    },
    openNewDialog() {
      Dialog.alert({
        message: "链接已复制，请在浏览器中打开",
      }).then(() => {
        console.log(window.location.href, "链接");
        this.$copyText(window.location.href);
      });
    },
    showPayDialog(status) {
      if (this._isWechat() && status === 1) {
        this.openNewDialog();
        return;
      }
      if (!this.uid) {
        this.$emit("handleLoginDialog", true);
      } else if (
        this.$route.query.inviteCode &&
        this.$route.query.ref !== "two"
      ) {
        this.$emit("handleShowOpenNewGroup");
      } else {
        const {
          payConfig: { fuliTwoEid },
          uid,
          token,
        } = this.$store.state;
        const data = {
          eid: fuliTwoEid,
          uid: uid,
          loginKey: token,
          inviteCode: this.$route.query.inviteCode ?? null,
        };
        this.checkOutPayStatus(data)
          .then(() => {
            this.$emit("handleDialog", "fuliTwo");
          })
          .catch((err) => errorInfo(err));
      }
    },
    closeDialog(event) {
      console.log(event, "event");
      this.showDialog = !this.showDialog;
    },
    openDialog(data) {
      if (this.uid) {
        this.showDialog = !this.showDialog;
        this.status = data.type;
        this.showDifferentSuccessInfo = data;
      } else {
        this.$emit("handleLoginDialog", true);
      }
    },
    copyLink() {
      if (
        this.groupInfo.record !== null &&
        this.uid &&
        this.uid === this.groupId
      ) {
        if (this.uid === this.groupId) {
          const href = `${window.location.origin}${window.location.pathname}?inviteCode=${this.groupInfo.record.inviteCode}&ref=two`;
          console.log(href, "链接");
          copyShareLink(href, this);
        } else this.showPayDialog();
      } else if (this.uid !== this.groupId) {
        this.showPayDialog();
      } else this.$emit("handleLoginDialog", true);
    },
    goApp() {
      openUrl(urlLink.appLink);
    },
  },
};
</script>

<style scoped lang="less">
.welfare-one-wrap {
  width: 100%;
  position: relative;
  margin-top: 10px;
  .bg-img {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .blind-container {
    position: absolute;
    top: 920px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
  }
  .user-info {
    position: absolute;
    top: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .user-info-join {
    position: absolute;
    top: 870px;
    left: 90px;
  }
  .send-buy {
    position: absolute;
    top: 290px;
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
    top: 490px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .join-success {
    position: absolute;
    top: 620px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }
}
.prize-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  .show-modal-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .show-success-img {
      width: 147px;
      height: 83px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .show-title {
      font-size: 23px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #dcdcdc;
    }
    .success-title {
      margin-top: -50px;
    }
  }
  .show-center-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .center-img {
      width: 150px;
      height: 115px;
      margin-top: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        //width: 100%;
        height: 100%;
        background-size: cover;
      }
    }
    .center-tip {
      margin-top: 20px;
      font-size: 13px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #b8b8b8;
      line-height: 19px;
    }
    .center-arrow-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 25px;
      .left-img {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 150px;
        height: 115px;
        justify-content: center;
        img {
          width: 62px;
          height: 65px;
          background-size: cover;
        }
        .tip {
          margin-top: 15px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 800;
          color: #ffffff;
        }
      }
      .img-shadow {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 150px;
        height: 115px;
        justify-content: center;
        position: relative;
        img {
          //width: 100%;
          height: 100%;
          background-size: cover;
        }
        .shadow {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          margin: 0 auto;
          width: 120px;
          height: 120px;
          border-radius: 10px;
          background-color: rgba(40, 43, 40, 0.3);
        }
      }
      .middle-img {
        width: 27px;
        height: 23px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right-img {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 150px;
        height: 115px;
        justify-content: center;
        img {
          //width: 100%;
          height: 100%;
          background-size: cover;
        }
      }
    }
  }
  .show-footer-btn {
    position: absolute;
    top: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    .btn-wrap {
      display: flex;
      justify-content: space-around;
      .btn {
        width: 102px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #4c4c4c;
        border-radius: 15px;
        margin-right: 22px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #f9f9f9;
        &:last-child {
          margin-right: 0;
        }
      }
      .active {
        background: #ff264a;
      }
    }
  }
  .app-wrap {
    position: absolute;
    top: 210px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
  }
  .prize-desc-wrap {
    margin-top: 20px;
    width: 153px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ff264a;
    border-radius: 15px;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #f9f9f9;
  }
}
</style>
