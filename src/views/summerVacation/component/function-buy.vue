<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-11 17:29:02
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-14 18:02:52
 * @FilePath: /h5-active-v2/src/views/summerVacation/component/function-buy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="fun-buy">
    <div class="wrap-content">
      <img :src="headerImg" alt="" referrerpolicy="no-referrer" />
      <div class="user-info1">
        <user-info-component
          @handleLoginDialog="handleLoginDialog"
        ></user-info-component>
      </div>
      <!-- Pro区域 -->
      <template>
        <div class="pro-wrap">
          <template v-if="showProList && showProList.length > 0">
            <div
              class="pro-item"
              v-for="(item, index) in showProList"
              :key="item.id"
            >
              <img
                v-if="!item.have"
                style="padding: 0"
                :src="selectProIndex === index ? item.selectImg : item.img"
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
            v-if="!pageConfig.joinPro || pageConfig.joinPro === 0"
            :src="buyImg"
            alt=""
            @click="handlePayProInfo"
            referrerpolicy="no-referrer"
          />
          <img
            v-if="pageConfig.joinPro && pageConfig.joinPro === 1"
            :src="nothingImg"
            alt=""
            referrerpolicy="no-referrer"
          />
        </div>
        <!-- 介绍区域 -->
        <div
          class="desc-wrap"
          v-if="!pageConfig.joinPro || pageConfig.joinPro === 0"
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
      <!-- SVIP区域 -->
      <template>
        <div class="vip-wrap">
          <template v-if="showVipList && showVipList.length > 0">
            <div
              class="vip-item"
              v-for="(item, index) in showVipList"
              :key="item.id"
            >
              <img
                v-if="!item.have"
                style="padding: 0"
                :src="selectVipIndex === index ? item.selectImg : item.img"
                alt=""
                @click="handleChangeSelectVip(item, index)"
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
        <!--购买SVIP -->
        <div class="vip-btn">
          <img
            v-if="!pageConfig.joinSvip || pageConfig.joinSvip === 0"
            :src="buyImg"
            alt=""
            @click="handlePayVipInfo"
            referrerpolicy="no-referrer"
          />
          <img
            v-if="pageConfig.joinSvip && pageConfig.joinSvip === 1"
            :src="nothingImg"
            alt=""
            referrerpolicy="no-referrer"
          />
        </div>
        <!-- 介绍区域 -->
        <div
          class="vip-desc-wrap"
          v-if="!pageConfig.joinSvip || pageConfig.joinSvip === 0"
        >
          <van-checkbox
            v-model="checkedVip"
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
    </div>
  </div>
</template>

<script>
import { BASE_IMAGE_SUMMARY_URL } from "@/request/config";
import userInfoComponent from "../common/user-info/user-info.vue";
import { getPoseList } from "@/api/summary";
import { errorInfo } from "@/utils";
export default {
  name: "function-buy",
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
      headerImg: BASE_IMAGE_SUMMARY_URL + "/fun-bg.png",
      buyImg: BASE_IMAGE_SUMMARY_URL + "/buy-btn.png",
      nothingImg: BASE_IMAGE_SUMMARY_URL + "/nothing-buy.png",
      checked: true,
      checkedVip: true,
      proList: [
        {
          hasImg: BASE_IMAGE_SUMMARY_URL + "/has-yadan.png",
          selectImg: BASE_IMAGE_SUMMARY_URL + "/select-yadan.png",
          img: BASE_IMAGE_SUMMARY_URL + "/yadan.png",
          defaultImg: BASE_IMAGE_SUMMARY_URL + "/yadan.png",
          id: "SFUNC_PRO_365D_A",
          title: "充值Pro专业版将支付88元",
          subTitle: "可获得专业版一年+BJD亚当",
        },
        {
          hasImg: BASE_IMAGE_SUMMARY_URL + "/has-xiawa.png",
          selectImg: BASE_IMAGE_SUMMARY_URL + "/select-xiawa.png",
          img: BASE_IMAGE_SUMMARY_URL + "/xiawa.png",
          defaultImg: BASE_IMAGE_SUMMARY_URL + "/xiawa.png",
          id: "SFUNC_PRO_365D_B",
          title: "充值Pro专业版将支付88元",
          subTitle: "可获得专业版一年+BJD夏娃",
        },
        {
          hasImg: BASE_IMAGE_SUMMARY_URL + "/has-pb.png",
          selectImg: BASE_IMAGE_SUMMARY_URL + "/select-pbi.png",
          img: BASE_IMAGE_SUMMARY_URL + "/pb.png",
          defaultImg: BASE_IMAGE_SUMMARY_URL + "/pb.png",
          id: "SFUNC_PRO_365D_C",
          title: "充值Pro专业版将支付88元",
          subTitle: "可获得专业版一年+18P币",
        },
      ],
      selectProIndex: -1,
      svipList: [
        {
          hasImg: BASE_IMAGE_SUMMARY_URL + "/has-yadan.png",
          selectImg: BASE_IMAGE_SUMMARY_URL + "/select-yadan.png",
          img: BASE_IMAGE_SUMMARY_URL + "/yadan.png",
          id: "SFUNC_SVIP_365D_A",
          title: "充值SVIP套餐将支付218元",
          subTitle: "全功能12个月+128P币+BJD亚当",
        },
        {
          hasImg: BASE_IMAGE_SUMMARY_URL + "/has-xiawa.png",
          selectImg: BASE_IMAGE_SUMMARY_URL + "/select-xiawa.png",
          img: BASE_IMAGE_SUMMARY_URL + "/xiawa.png",
          id: "SFUNC_SVIP_365D_B",
          title: "充值SVIP套餐将支付218元",
          subTitle: "全功能12个月+128P币+BJD夏娃",
        },
        {
          hasImg: BASE_IMAGE_SUMMARY_URL + "/has-pb.png",
          selectImg: BASE_IMAGE_SUMMARY_URL + "/select-pbi.png",
          img: BASE_IMAGE_SUMMARY_URL + "/pb.png",
          id: "SFUNC_SVIP_365D_C",
          title: "充值SVIP套餐将支付218元",
          subTitle: "全功能12个月+128P币+18P币",
        },
      ],
      selectVipIndex: -1,
      list: [],
      info: {},
      vipInfo: {},
    };
  },
  computed: {
    showProList() {
      return this.proList.map((item) => {
        const { haveAdam, haveEve } = this.pageConfig;
        if (haveAdam && item.id === "SFUNC_PRO_365D_A") {
          item["have"] = true;
        } else if (haveEve && item.id === "SFUNC_PRO_365D_B") {
          item["have"] = true;
        } else item["have"] = false;
        return {
          ...item,
        };
      });
    },
    showVipList() {
      return this.svipList.map((item) => {
        const { haveAdam, haveEve } = this.pageConfig;
        if (haveAdam && item.id === "SFUNC_SVIP_365D_A") {
          item["have"] = true;
        } else if (haveEve && item.id === "SFUNC_SVIP_365D_B") {
          item["have"] = true;
        } else item["have"] = false;
        return {
          ...item,
        };
      });
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getPoseList().then((res) => {
        if (res.state) {
          this.list = res.data;
        }
      });
    },
    handleLoginDialog() {
      this.$emit("handleLoginDialog");
    },
    handleChangeSelect(info, index) {
      if (this.selectProIndex === index) return;
      this.selectProIndex = +index;
      this.info = info;
    },
    handleChangeSelectVip(info, index) {
      if (this.selectVipIndex === index) return;
      this.selectVipIndex = +index;
      this.vipInfo = info;
    },
    handlePayProInfo() {
      if (!this.info.id) {
        errorInfo("请先选择赠品");
        return;
      } else if (!this.checked) {
        errorInfo("请先同意协议");
        return;
      } else this.$emit("handlePayDialog", this.info);
    },
    handlePayVipInfo() {
      if (!this.vipInfo.id) {
        errorInfo("请先选择赠品");
        return;
      } else if (!this.checkedVip) {
        errorInfo("请先同意协议");
        return;
      } else this.$emit("handlePayDialog", this.vipInfo);
    },
    showText() {
      this.$emit("showText");
    },
    showRule() {
      this.$emit("showRule");
    },
  },
};
</script>

<style lang="less" scoped>
.fun-buy {
  margin-top: 42px;
  img {
    width: 100%;
    height: 100%;
  }
  // width: 100%;
  .pro-wrap {
    position: absolute;
    top: 320px;
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
    top: 510px;
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
    top: 560px;
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
  .vip-wrap {
    position: absolute;
    bottom: 130px;
    display: flex;
    justify-content: center;
    width: 100%;
    .vip-item {
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
  .vip-btn {
    position: absolute;
    bottom: 80px;
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
  .vip-desc-wrap {
    position: absolute;
    bottom: 50px;
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
}
</style>
