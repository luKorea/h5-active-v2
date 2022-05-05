<!--
 * @Author: your name
 * @Date: 2022-04-21 11:25:33
 * @LastEditTime: 2022-05-05 16:16:50
 * @LastEditors: korealu 643949593@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/views/vote/index/components/vote-component.vue
-->
<template>
  <div class="content-wrap" style="margin-top: -4px">
    <div class="vote-wrap">
      <div class="vote-bg">
        <img :src="imgInfo.bgImg" alt="" referrerpolicy="no-referrer" />
      </div>

      <div class="vote-title">
        <img :src="imgInfo.titleImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="vote-tip">
        <span> 获得最高票的限定人偶将于 Pofi 「618」活动中</span
        ><span>限时开放 18P币购买！ </span>
        <span
          ><span class="block">凡是参与本次投票者，</span
          >均可获取最高票人偶购买资格。</span
        >
      </div>
      <!-- 人偶区域 -->
      <template v-if="bannerList && bannerList.length > 0">
        <div class="vote-even-wrap">
          <div
            class="even-item"
            v-for="(item, index) in bannerList"
            :key="item.moldid"
            @click="changeSelectEven(item, index)"
          >
            <div class="item-img">
              <img
                :src="
                  selectIndex === index && !isVote ? item.selectImg : item.img
                "
                :class="index === 0 ? 'img1' : index === 1 ? 'img2' : 'img3'"
                alt=""
                referrerpolicy="no-referrer"
              />
            </div>
            <div class="item-info" :class="getClassText(index)">
              <div class="item-tip" @click="openEvenDialog(item)">
                <span class="title">{{ item.title }}</span>
                <van-icon name="info-o" size="12" color="rgb(76 71 71)" />
              </div>
              <div class="item-number">{{ item.votes }}票</div>
              <!-- 区分状态 -->
              <div class="item-btn">
                <span
                  :class="selectIndex === index && !isVote ? 'select' : ''"
                  class="btn-select"
                  v-if="item.state === 0"
                  >选TA!</span
                >
                <span class="btn-end" v-if="item.state === -1">投票关闭</span>
                <span class="btn-check" v-if="item.state === 1">我已投票</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- 投票区域, 区分状态 -->
      <div class="vote-state">
        <img
          :src="imgInfo.startImg"
          alt=""
          referrerpolicy="no-referrer"
          @click="handleOperation('start')"
          v-if="!isVote"
        />
        <img
          :src="imgInfo.refreshImg"
          v-else
          alt=""
          @click="handleOperation('refresh')"
          referrerpolicy="no-referrer"
        />
      </div>
      <!-- 购买字体提示 -->
      <div class="vote-buy">
        <img :src="imgInfo.buyTitleImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <!-- 预约区域, 区分状态 -->
      <div class="vote-subscribe">
        <!-- 没有预约 -->
        <img
          :src="imgInfo.subscribeImg"
          @click="handleOperation('subscribe', 1)"
          alt=""
          referrerpolicy="no-referrer"
          v-if="!token || otherInfo.isBooking === 0"
        />
        <!-- 预约成功 -->
        <img
          :src="imgInfo.subscribeSuccessImg"
          v-if="otherInfo.isBooking === 1"
          alt=""
          referrerpolicy="no-referrer"
        />
      </div>
      <!-- 文字 -->
      <div class="vote-info" v-if="!token || otherInfo.isBooking === 0">
        <div class="tip">
          预约成功后，Pofi将于「限定人偶开放购买活动」开启时向您的手机号发送活动通知短信。如需取消，请点击
          <span class="blue" @click="handleOperation('subscribe', 0)"
            >取消预约</span
          >
        </div>
      </div>
      <div class="vote-info" v-if="otherInfo.isBooking === 1">
        <div class="tip">
          预约成功后，Pofi将于「限定人偶开放购买活动」开启时向您的手机号{{
            this.phone
          }}发送活动通知短信。如需取消，请点击
          <span class="blue" @click="handleOperation('subscribe', 0)"
            >取消预约</span
          >
        </div>
      </div>
    </div>

    <!-- 人偶详情信息展示弹框 -->
    <korea-dialog
      :show-dialog="showDialog"
      :bg-img="imgInfo.voteEvenImg"
      @closeDialog="showDialog = false"
    >
      <template #content>
        <div class="info-wrap">
          <div class="title">{{ selectInfo.title }}</div>
          <div class="desc">{{ selectInfo.desc }}</div>
          <div class="img-title">
            {{
              selectInfo.imgList && selectInfo.imgList.length > 0
                ? "相关Pose库推荐："
                : "暂无该人偶Pose库，敬请期待。"
            }}
          </div>
          <template v-if="selectInfo.imgList && selectInfo.imgList.length > 0">
            <div class="img-wrap">
              <div
                class="item"
                v-for="(item, index) in selectInfo.imgList"
                :key="index"
              >
                <img :src="item" alt="" referrerpolicy="no-referrer" />
              </div>
            </div>
          </template>
        </div>
      </template>
    </korea-dialog>
  </div>
</template>

<script>
import { BASE_IMAGE_VOTE_URL } from "@/request/config";
import koreaDialog from "@/components/korea-dialog/korea-dialog";
import { errorInfo, successInfo } from "@/utils";
import { mapState } from "vuex";
import { voteState, voteToUser } from "@/api/vote";
import localCache from "@/utils/cache";
export default {
  name: "VoteComponent",
  components: {
    koreaDialog,
  },
  props: {
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
    isVote: {
      type: Boolean,
      default: false,
    },
    selectValue: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState({
      token: (state) => state.voteModule.token,
      uid: (state) => state.voteModule.uid,
    }),
    phone() {
      return localCache.getCache("phoneStr");
    },
  },
  data() {
    return {
      imgInfo: {
        bgImg: BASE_IMAGE_VOTE_URL + "/vote-bg1.png",
        titleImg: BASE_IMAGE_VOTE_URL + "/vote-title.png",
        subTitleImg: BASE_IMAGE_VOTE_URL + "/vote-subTitle.png",
        startImg: BASE_IMAGE_VOTE_URL + "/vote-start-btn.png",
        refreshImg: BASE_IMAGE_VOTE_URL + "/vote-refresh-btn.png",
        buyTitleImg: BASE_IMAGE_VOTE_URL + "/vote-buy-title.png",
        subscribeImg: BASE_IMAGE_VOTE_URL + "/vote-subscribe.png",
        subscribeSuccessImg:
          BASE_IMAGE_VOTE_URL + "/vote-subscribe-success.png",
        voteEvenImg: BASE_IMAGE_VOTE_URL + "/vote-even-bg.png",
      },
      bannerList: [
        {
          title: "人鱼大Q",
          moldid: "M200821309",
          img: BASE_IMAGE_VOTE_URL + "/vote-even-one.png",
          selectImg: BASE_IMAGE_VOTE_URL + "/vote-even-select-one.png",
          state: 0, // 	-1:投票关闭 0:可以投票 1:已投票
          info: {
            title: "人鱼大Q",
            desc: "「此可动人偶含97个人鱼系统初始动作」按BJD大Q的五官与身体制作的人鱼系列人偶，有着BJD大Q同样精致的面容与上半身结构，从腰延伸出优雅纤长却又流畅逼真的鱼尾，腰间还点缀有特殊的有如裙摆的海藻装饰。该人偶能为绘制优雅的海中人鱼与童话人鱼公主等题材作品提供形象特征与动作参考。",
            imgList: [BASE_IMAGE_VOTE_URL + "/vote-img1-fish.png"],
          },
        },
        {
          title: "BJD大Q",
          moldid: "M191001241",
          img: BASE_IMAGE_VOTE_URL + "/vote-even-two.png",
          selectImg: BASE_IMAGE_VOTE_URL + "/vote-even-select-two.png",
          state: 0, // 	-1:投票关闭 0:可以投票 1:已投票
          info: {
            title: "BJD大Q",
            desc: "「此可动人偶含2种表情、22个系统初始动作」 6头身比例的BJD大Q，拥有睁眼与闭眼2种可替换表情，恬静的表情，修长的睫毛，可爱的身材，非常适合绘制各类少女角色。",
            imgList: [
              BASE_IMAGE_VOTE_URL + "/vote-img1.png",
              BASE_IMAGE_VOTE_URL + "/vote-img2.png",
              BASE_IMAGE_VOTE_URL + "/vote-img3.png",
              BASE_IMAGE_VOTE_URL + "/vote-img4.png",
            ],
          },
        },
        {
          title: "BJD小Q",
          moldid: "M210201478",
          img: BASE_IMAGE_VOTE_URL + "/vote-even-three.png",
          selectImg: BASE_IMAGE_VOTE_URL + "/vote-even-select-three.png",
          state: 0, // 	-1:投票关闭 0:可以投票 1:已投票
          info: {
            title: "BJD小Q",
            desc: "「此可动人偶含3种表情、22个系统初始动作」3头身比例的BJD小Q，拥有日系素模脸与BJD脸双面孔，丰富细节的关节与手脚，精致可爱的身材满足大部分Q版绘画的参考需求。",
            imgList: [],
          },
        },
      ],
      selectIndex: -1,
      selectInfo: {},
      selectEvent: "",
      showDialog: false,
    };
  },
  methods: {
    getClassText(index) {
      let className = "";
      if (+index === 0) {
        className = "text1";
      }
      if (+index === 1) {
        className = "text2";
      }
      if (+index === 2) {
        className = "text3";
      }
      if (this.selectIndex === +index && !this.isVote) {
        className += " selectText";
      }
      return className;
    },
    voteStateAction(state) {
      if (state === 0 && this.otherInfo.isBooking === 0) {
        errorInfo("请先预约");
        return;
      }
      voteState(
        {
          uid: this.uid,
          loginKey: this.token,
        },
        state
      ).then((res) => {
        if (res.code === 200) {
          successInfo(res.msg);
          this.$emit("getData");
        } else errorInfo(res.msg);
      });
    },
    handleOperation(type, state) {
      if (this.token) {
        // 投票
        if (type === "start") {
          if (!this.selectEvent) {
            errorInfo("请先选择人偶");
          } else {
            voteToUser({
              uid: this.uid,
              loginKey: this.token,
              moldId: this.selectEvent,
            }).then((res) => {
              if (res.code === 200) {
                successInfo(res.msg);
                this.$emit("getData");
              } else errorInfo(res.msg);
            });
          }
        } else if (type === "refresh") {
          this.$emit("getData");
        } else {
          // 预约
          this.voteStateAction(state);
        }
      } else this.$emit("handleLoginDialog");
    },
    changeSelectEven(item, index) {
      if (this.selectIndex === index) return;
      this.selectEvent = item.moldid;
      this.selectIndex = index;
      this.$nextTick(() => {
        this.$bus.$emit(item.moldid);
      });
    },
    openEvenDialog(item) {
      this.selectInfo = item.info;
      this.showDialog = true;
    },
  },
};
</script>

<style lang="less" scoped>
.vote-wrap {
  width: 100%;
  position: relative;
  .vote-bg {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .vote-title {
    position: absolute;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 300px;
      height: 39px;
    }
  }
  .vote-tip {
    position: absolute;
    top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    .block {
      background: #bcdc95;
      border-radius: 6px;
      padding: 2px;
      text-align: center;
    }
    span {
      font-size: 11px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #136a19;
      line-height: 22px;
    }
  }
  .vote-sub-title {
    position: absolute;
    top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 280px;
      height: 100%;
    }
  }
  .vote-state {
    position: absolute;
    top: 540px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 316px;
      height: 100%;
    }
  }
  .vote-buy {
    position: absolute;
    top: 640px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 296px;
      height: 100%;
    }
  }
  .vote-subscribe {
    position: absolute;
    top: 720px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 316px;
      height: 100%;
    }
  }
  .vote-info {
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .tip {
      width: 289px;
      line-height: 22px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #79797e;
      .blue {
        color: #37aade;
      }
    }
  }
  .vote-even-wrap {
    position: absolute;
    top: 150px;
    display: flex;
    justify-content: center;
    // align-items: center;
    width: 100%;
    box-sizing: border-box;
    .even-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      // top: 160px;
      .item-img {
        width: 120px;
        height: 368px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .img1 {
          width: 100%;
          height: 100%;
        }
        .img2 {
          width: 100%;
          height: 100%;
        }
        .img3 {
          width: 100%;
          height: 100%;
        }
      }
      .item-info {
        // width: 100%;
        position: absolute;
        z-index: 21;
        top: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .item-tip {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
          .title {
            font-size: 13px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #000000;
            margin-right: 3px;
          }
        }
        .item-number {
          font-size: 10px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #787878;
          margin-bottom: 4px;
        }
        .item-btn {
          .btn-select {
            background-color: #ffff;
            border-radius: 10px;
            padding: 2px;
            text-align: center;
            width: 67px;
            display: block;
          }
          .btn-end {
            color: #787878;
            background-color: rgba(0, 0, 0, 0);
            border-radius: 10px;
            padding: 2px;
            text-align: center;
            width: 67px;
            display: block;
          }
          .btn-check {
            background-color: #dbd4d4;
            border-radius: 10px;
            padding: 2px;
            text-align: center;
            width: 67px;
            display: block;
            color: #a39c9c;
          }
        }
      }
      .text1 {
        margin-left: 40px;
      }
      .text2 {
        margin-left: 24px;
      }
      .text3 {
        margin-left: 6px;
      }
      .selectText {
        .item-tip {
          .title {
            color: #fff;
          }
        }
        .item-number {
          color: #c3d7aa;
        }
      }
    }
  }
}
.info-wrap {
  position: absolute;
  top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  .title {
    font-size: 23px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #f9f9f9;
    margin-bottom: 20px;
  }
  .desc {
    font-size: 12px;
    line-height: 20px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #f9f9f9;
    width: 316px;
    margin-top: 20px;
  }
  .img-title {
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #f9f9f9;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .img-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 89%;
    // justify-content: center;
    // margin-left: px;
    .item {
      width: 158px;
      height: 89px;
      margin: 4px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
