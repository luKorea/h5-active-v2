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
          <div class="right-text">Pofi ID : {{ uid }}</div>
        </div>
      </div>
    </div>
    <div class="send-buy">
      <div class="send-info" @click="showPayDialog">立即购买</div>
    </div>

    <div class="join-us">
      <div class="user-join-wrap">
        <!-- 初始情况 -->
       <template v-if="!groupInfo || groupInfo.record === null">
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
        <template
          v-if="
            groupInfo &&
            groupInfo.record !== null &&
            groupInfo.record.length === 1
          "
        >
          <div class="user-join-item">
            <div class="user-icon">
              <img :src="groupInfo.record[0].iconUrl" alt="" />
            </div>
            <div class="item-title">{{ groupInfo.record[0].nickName }}</div>
          </div>
          <div class="user-join-item" @click="copyLink">
            <div class="item-add"></div>
            <div class="item-title">邀请好友</div>
          </div>
        </template>
        <!-- 组队数目大于二的情况 -->
        <template
          v-if="
            groupInfo &&
            groupInfo.record !== null &&
            groupInfo.record.length >= 2
          "
        >
          <div
            class="user-join-item"
            v-for="(item, index) in groupInfo.record"
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

    <div class="user-info-join" v-show="uid">
      <div class="common-user-id">
        <div class="left-text">当前用户</div>
        <div class="right-white">
          <div class="left-circle"></div>
          <div class="right-text">Pofi ID : {{ uid }}</div>
        </div>
      </div>
    </div>

    <!--抽奖区域-->
    <div class="blind-container">
      <blind-box-lottery ref="blindBox" @showDifferentDialog="openDialog" />
    </div>
    <!--自选盲盒开奖区域，状态逻辑看 status -->
    <korea-dialog
      :bg-img="modalBgImg"
      :show-dialog="showDialog"
      @closeDialog="closeDialog"
      close-btn-top="26px"
    >
      <template #content>
        <div
          class="prize-content"
          :style="{
            top: status === 3 || status === 4 || status === 6 ? '4px' : '30px',
          }"
        >
          <div class="show-modal-title">
            <!--撒花图片-->
            <div
              class="show-success-img"
              v-if="status === 3 || status === 4 || status === 6"
            >
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
                <img :src="prizeImg" alt="" />
              </div>
              <div class="center-arrow-wrap" v-else>
                <!--盲盒兑换区域-->
                <div class="left-img" v-if="status === 5">
                  <img :src="prizeWhiteImg" alt="" />
                  <div class="tip">已拥有人偶</div>
                </div>
                <!--兑换区域-->
                <div class="img-shadow" v-else>
                  <div class="shadow"></div>
                  <img :src="prizeImg" alt="" />
                </div>
                <div class="middle-img">
                  <img :src="arrowImg" alt="" />
                </div>
                <div class="right-img">
                  <img :src="p8Img" alt="" />
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
                  <img :src="appImg" alt="" />
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
import { copyShareLink, openUrl } from "@/utils";
import urlLink from "@/utils/link";
import BlindBoxLottery from "@/views/home/components/blind-box-lottery";
import { mapState } from "vuex";

export default {
  name: "welfare-two",
  components: { BlindBoxLottery, koreaDialog },
   props: {
    groupData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      bgImg: require("@/assets/image/welfare-bg-two.png"),
      modalBgImg: require("@/assets/image/prize-modal.png"),
      successImg: require("@/assets/image/prize-success.png"),
      arrowImg: require("@/assets/image/prize/arrow.png"),
      prizeWhiteImg: require("@/assets/image/prize/white-prize.png"),
      prizeImg: require("@/assets/image/prize/small.png"),
      p8Img: require("@/assets/image/prize/p8.png"),
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
    };
  },
  computed: {
    ...mapState(["uid", "groupConfig", "userInfo"]),
    groupInfo() {
      return this.groupData;
    },
    computedInfo() {
      let title = "";
      let tip = "";
      let status = this.status;
      switch (status) {
        case 1:
          title = "是否领取当前奖品";
          tip = "BJD大Q";
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
    receivePrize() {
      if (this.status === 1) {
        this.status = 3;
      }
      if (this.status === 5) {
        // this.status = 4;
        this.showDialog = false;
        this.$refs["blindBox"].startRoll();
      } else this.status = 6;
    },
    showPayDialog() {
      this.$emit("handleDialog", "fuliTwo");
    },
    closeDialog(event) {
      console.log(event, "event");
      this.showDialog = !this.showDialog;
    },
    openDialog(status) {
      if (this.uid) {
        this.showDialog = !this.showDialog;
        this.status = status;
      } else {
        this.$emit("handleLoginDialog", true);
      }
    },
    copyLink() {
      if (this.uid) {
        copyShareLink(`${window.location.href}?uid=${this.uid}&ref=two`, this);
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
