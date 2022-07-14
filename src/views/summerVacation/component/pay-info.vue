<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-11 17:29:02
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-14 10:51:54
 * @FilePath: /h5-active-v2/src/views/summerVacation/component/function-buy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="pay-wrap">
    <div class="wrap-content">
      <img :src="headerImg" alt="" referrerpolicy="no-referrer" />
      <div class="user-info1">
        <user-info-component
          @handleLoginDialog="handleLoginDialog"
        ></user-info-component>
        <!-- 购买128 -->
        <template>
          <div class="pro-wrap">
            <template v-if="showList && showList.length > 0">
              <div
                class="pro-item"
                v-for="(item, index) in showList"
                :key="item.id"
              >
                <img
                  v-if="!item.have"
                  style="padding: 0"
                  :src="selectIndex === index ? item.selectImg : item.img"
                  alt=""
                  @click="handleChangeSelect(item, index)"
                  referrerpolicy="no-referrer"
                />
                <img
                  v-else
                  style="padding: 0"
                  :src="item.hasImg"
                  alt=""
                  referrerpolicy="no-referrer"
                />
              </div>
            </template>
          </div>
          <!--购买pro -->
          <div class="pro-btn">
            <img
              v-if="!pageConfig.joinPB || pageConfig.joinPB === 0"
              :src="buyImg"
              alt=""
              @click="handlePayInfo"
              referrerpolicy="no-referrer"
            />
            <img
              v-if="pageConfig.joinPB && pageConfig.joinPB === 1"
              :src="nothingImg"
              alt=""
              referrerpolicy="no-referrer"
            />
          </div>
          <!-- 介绍区域 -->
          <div
            class="desc-wrap"
            v-if="!pageConfig.joinPB || pageConfig.joinPB === 0"
          >
            <van-checkbox
              v-model="checked"
              checked-color="#000"
              icon-size="14px"
            ></van-checkbox>
            <div class="text">
              同意
              <span class="o" @click="showText">《Pofi无限人偶用户协议》</span>
              <span class="o" @click="showRule">《活动规则》</span>
            </div>
          </div>
        </template>
        <!-- pose库展示 -->
        <template v-if="poseList && poseList.length > 0">
          <div class="pose-wrap">
            <div class="pose-item" v-for="item in poseList" :key="item.cover">
              <img :src="item.cover" alt="" referrerpolicy="no-referrer" />
            </div>
          </div>
        </template>
        <!-- 打开APP -->
        <div class="pose-btn">
          <img
            @click="goApp"
            :src="appImg"
            alt=""
            referrerpolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
import userInfoComponent from "../common/user-info/user-info.vue";
import { errorInfo, openUrl } from "@/utils";
import { getPoseList } from "@/api/summary";
import urlLink from "@/utils/link";

export default {
  name: "pay-info",
  components: {
    userInfoComponent,
  },
  props: {
    pageConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      checked: true,
      selectIndex: -1,
      headerImg: BASE_IMAGE_SUMMARY_URL + "/pay-bg.png",
      buyImg: BASE_IMAGE_SUMMARY_URL + "/buy-btn.png",
      appImg: BASE_IMAGE_SUMMARY_URL + "/go-app.png",
      nothingImg: BASE_IMAGE_SUMMARY_URL + "/nothing-buy.png",
      list: [
        {
          hasImg: BASE_IMAGE_SUMMARY_URL + "/has-minuo.png",
          selectImg: BASE_IMAGE_SUMMARY_URL + "/select-minuo.png",
          img: BASE_IMAGE_SUMMARY_URL + "/minuo.png",
          id: "SRCG12800_A",
          title: " 充值128P币",
          subTitle: "可获得128P币+BJD米诺",
        },
        {
          hasImg: BASE_IMAGE_SUMMARY_URL + "/has-ouni.png",
          selectImg: BASE_IMAGE_SUMMARY_URL + "/select-ouni.png",
          img: BASE_IMAGE_SUMMARY_URL + "/ouni.png",
          id: "SRCG12800_C",
          title: " 充值128P币",
          subTitle: "可获得128P币+BJD欧尼",
        },
        {
          hasImg: BASE_IMAGE_SUMMARY_URL + "/has-pb.png",
          selectImg: BASE_IMAGE_SUMMARY_URL + "/select-pbi.png",
          img: BASE_IMAGE_SUMMARY_URL + "/pb.png",
          id: "SRCG12800_B",
          title: "充值128P币",
          subTitle: "可获得128P币+18P币",
        },
      ],
      poseList: [],
      info: {},
    };
  },
  computed: {
    showList() {
      return this.list.map((item) => {
        const { haveMino, haveOmnic } = this.pageConfig;
        if (haveMino && item.id === "SRCG12800_A") {
          item["have"] = true;
        } else if (haveOmnic && item.id === "SRCG12800_C") {
          item["have"] = true;
        } else item["have"] = false;
        return {
          ...item,
        };
      });
    },
  },
  mounted() {
    this.getPose();
  },

  methods: {
    getPose() {
      getPoseList().then((res) => {
        if (res.state) {
          this.poseList = res.data;
        }
      });
    },
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
    handleChangeSelect(info, index) {
      if (this.selectIndex === index) return;
      this.selectIndex = +index;
      this.info = info;
    },
    handlePayInfo() {
      if (!this.info.id) {
        errorInfo("请先选择赠品");
        return;
      } else if (!this.checked) {
        errorInfo("请先同意协议");
        return;
      } else this.$emit("handlePayDialog", this.info);
    },
    showText() {
      this.$emit("showText");
    },
    showRule() {
      this.$emit("showRule");
    },
    goApp() {
      openUrl(urlLink.appLink);
    },
  },
};
</script>

<style lang="less" scoped>
.pay-wrap {
  margin-top: 53px;

  .pro-wrap {
    position: absolute;
    top: 270px;
    display: flex;
    justify-content: center;
    width: 100%;
    .pro-item {
      width: 98px;
      height: 174px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 3px;
      &:last-child {
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 100%;
        padding: 0;
      }
    }
  }
  .pro-btn {
    position: absolute;
    top: 460px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 148px;
      padding: 0;
      height: 35px;
    }
  }
  .desc-wrap {
    position: absolute;
    top: 510px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      margin-left: 4px;
      color: rgba(153, 153, 153, 1);
      font-size: 12px;
      .o {
        color: rgba(251, 152, 51, 1);
      }
    }
  }

  .pose-wrap {
    position: absolute;
    top: 640px;
    width: 91%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 200px;
    overflow: hidden;
    overflow-y: scroll;
    .pose-item {
      width: 138px;
      height: 76px;
      margin: 4px;
      img {
        width: 100%;
        height: 100%;
        padding: 0;
        border-radius: 4px;
      }
    }
  }
  .pose-btn {
    position: absolute;
    top: 876px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 149px;
      height: 36px;
      padding: 0;
    }
  }
}
</style>
