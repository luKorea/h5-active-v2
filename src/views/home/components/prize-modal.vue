<template>
  <div class="bg-1" v-if="showDialog">
    <div class="content-1">
      <div class="modal-info-1 animate__animated animate__fadeInDown">
        <div class="close-wrap-1">
          <div
            class="close-btn-1"
            @click.stop.prevent="closeDialog"
            style="margin-right: 20px !important; margin-top: 20px"
          >
            <img :src="closeBtnImg" alt="" />
          </div>
        </div>
        <div class="bg-img" :style="bgStyle">
          <img :src="showImg" alt="" style="width: 100%; height: 100%" />
        </div>
        <div class="btn-wrap">
          <div
            class="btn"
            :class="status === 1 && 'select'"
            @click="checkoutModal(1)"
          >
            我的奖品
          </div>
          <div
            class="btn"
            :class="status === 2 && 'select'"
            @click="checkoutModal(2)"
          >
            奖品说明
          </div>
        </div>
        <div class="content-wrap">
          <template v-if="status === 1">
            <div class="show-prize animate__animated animate__fadeIn">
              <div class="prize-content">
                <div class="table-row">
                  <div style="margin-right: 80px">到账时间</div>
                  <div style="margin-right: 40px">奖品</div>
                  <div>来源</div>
                </div>
                <template v-if="tableList && tableList.length > 0">
                  <div
                    class="table-col"
                    v-for="(item, index) in tableList"
                    :key="index"
                  >
                    <div style="margin-right: 20px">{{ item.time }}</div>
                    <div style="margin-right: 28px">{{ item.name }}</div>
                    <div>{{ item.form }}</div>
                  </div>
                </template>
              </div>
              <div class="app-img" @click="goApp">
                <img :src="appImg" alt="" />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="show-desc">
              <div class="desc-content animate__animated animate__fadeIn">
                <template v-if="descList && descList.length > 0">
                  <div
                    class="item"
                    v-for="(item, index) in descList"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prizeDesc } from "@/utils/desc";
import { openUrl } from "@/utils";
import urlLink from "@/utils/link";

export default {
  name: "prizeModal",
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      closeBtnImg: require("@/assets/image/close-btn.png"),
      status: 1, // 1. 我的奖品  2. 奖品说明
      prizeImg: require("@/assets/image/prize-me.png"),
      desImg: require("@/assets/image/prize-desc.png"),
      appImg: require("@/assets/image/go-app.png"),
      showImg: null,
      bgStyle: {},
      descList: prizeDesc,
      tableList: [
        {
          time: "2021/11/05/11:22",
          name: "30P币",
          form: "充值128P",
        },
        {
          time: "2021/11/05/11:22",
          name: "30P币",
          form: "购买SVIP",
        },
        {
          time: "2021/11/05/11:22",
          name: "30P币",
          form: "重复人偶",
        },
        {
          time: "2021/11/05/11:22",
          name: "30P币",
          form: "组队成功",
        },
        {
          time: "2021/11/05/11:22",
          name: "30P币",
          form: "充值128P",
        },
        {
          time: "2021/11/05/11:22",
          name: "30P币",
          form: "充值128P",
        },
        {
          time: "2021/11/05/11:22",
          name: "30P币",
          form: "充值128P",
        },
        {
          time: "2021/11/05/11:22",
          name: "30P币",
          form: "充值128P",
        },
      ],
    };
  },
  mounted() {
    this.showDifferentImg();
  },
  methods: {
    showDifferentImg() {
      if (this.status === 1) {
        this.showImg = this.prizeImg;
        this.bgStyle = {
          width: "100%",
          height: "100%",
        };
      } else {
        this.showImg = this.desImg;
        this.bgStyle = {
          marginTop: "100px",
        };
      }
    },
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    checkoutModal(status) {
      this.status = +status;
      this.showDifferentImg();
    },
    goApp() {
      openUrl(urlLink.appLink);
    },
  },
};
</script>

<style lang="less" scoped>
.bg-1 {
  z-index: 2001;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  .content-1 {
    position: fixed;
    top: 45%;
    left: 50%;
    width: 100%;
    padding-bottom: 20px;
    //width: 320px;
    //overflow: hidden;
    font-size: 16px;
    border-radius: 16px;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    -webkit-transition-property: opacity, -webkit-transform;
    transition-property: opacity, -webkit-transform;
    transition-property: transform, opacity;
    transition-property: transform, opacity, -webkit-transform;
  }
  .modal-info-1 {
    position: relative;
    .close-wrap-1 {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      position: absolute;
      //top: 20px;
      .close-btn-1 {
        width: 32px;
        height: 32px;
        margin-right: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .btn-wrap {
      position: absolute;
      top: 26px;
      margin: 0 auto;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      .btn {
        width: 102px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #313131;
        border-radius: 15px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: #535353;
      }
      .select {
        background: #ff264a;
        color: #f9f9f9;
      }
    }
    .show-desc {
      position: absolute;
      top: 78px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      width: 100%;
      .desc-content {
        width: 314px;
        height: 600px;
        background: #737373;
        border-radius: 18px;
        padding: 26px;
        box-sizing: border-box;
        .item {
          display: flex;
          flex-direction: column;
          font-size: 13px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: #efefef;
          line-height: 22px;
        }
      }
    }
    .show-prize {
      position: absolute;
      top: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: auto;
      width: 100%;
      .prize-content {
        display: flex;
        flex-direction: column;
        //justify-content: center;
        //align-items: center;
        width: 314px;
        height: 130px;
        overflow: hidden;
        overflow-y: scroll;
        background: #737373;
        border-radius: 18px;
        padding: 12px 0;
        box-sizing: border-box;
        .table-row {
          display: flex;
          //justify-content: space-around;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: #c9c9c9;
          margin-bottom: 8px;
          margin-left: 20px;
        }
        .table-col {
          display: flex;
          //justify-content: space-around;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: #c9c9c9;
          margin-left: 20px;
          margin-bottom: 6px;
        }
      }
      .app-img {
        width: 165px;
        height: 30px;
        margin-top: 26px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .show-prize {
      position: absolute;
      top: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: auto;
      width: 100%;
      .prize-content {
        display: flex;
        flex-direction: column;
        //justify-content: center;
        //align-items: center;
        width: 314px;
        height: 130px;
        overflow: hidden;
        overflow-y: scroll;
        background: #737373;
        border-radius: 18px;
        padding: 12px 0;
        box-sizing: border-box;
        .table-row {
          display: flex;
          //justify-content: space-around;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: #c9c9c9;
          margin-bottom: 8px;
          margin-left: 20px;
        }
        .table-col {
          display: flex;
          //justify-content: space-around;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: #c9c9c9;
          margin-left: 20px;
          margin-bottom: 6px;
        }
      }
      .app-img {
        width: 165px;
        height: 30px;
        margin-top: 26px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
