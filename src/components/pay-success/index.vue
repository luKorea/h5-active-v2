<!--
 * @Author: korealu
 * @Date: 2022-03-03 16:03:30
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-07 15:23:40
 * @Description: file content
 * @FilePath: /h5-active-v2/src/components/go-app/index.vue
-->
<template>
  <korea-dialog
    :show-dialog="showDialog"
    @closeDialog="closeDialog"
    @confirm="handleConfirm"
    @cancel="handleCancel"
    :bgImg="bgImg"
  >
    <template #content>
      <div class="pay-wrap">
        <div class="pay-tip">
          <van-icon name="passed" class="pay-icon" />
          <div class="pay-text">支付成功!</div>
        </div>
        <div class="pay-info">
          <div class="pay-tip">
            <img :src="titleImg" referrerpolicy="no-referrer" />
          </div>
          <div class="item-wrap">
            <template v-if="itemList && itemList.length > 0">
              <div
                :key="item.id"
                class="item"
                v-for="item in itemList"
                @click="openPage(item.id)"
              >
                <img :src="item.src" referrerpolicy="no-referrer" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </korea-dialog>
</template>

<script>
import KoreaDialog from "@/components/korea-dialog/korea-dialog.vue";
import { clearRouterQuery, openUrl } from "@/utils";
import urlLink from "@/utils/link";
import { BASE_IMAGE_ACTIVE_URL } from "@/request/config";
export default {
  name: "appModal",
  components: {
    KoreaDialog,
  },
  props: {
    title: {
      type: String,
      default: "请前往Pofi无限人偶App购买",
    },
  },
  data() {
    return {
      showDialog: false,
      bgImg: BASE_IMAGE_ACTIVE_URL + "/pay-success.png",
      titleImg: BASE_IMAGE_ACTIVE_URL + "/pay-title.png",
      appImg: require("@/assets/image/go-app.png"),
      itemList: [
        {
          id: 2,
          imgUrl: BASE_IMAGE_ACTIVE_URL + "/home-function.png",
          src: BASE_IMAGE_ACTIVE_URL + "/function-item.png",
        },
        {
          id: 3,
          imgUrl: BASE_IMAGE_ACTIVE_URL + "/home-pay.png",
          src: BASE_IMAGE_ACTIVE_URL + "/pay-item.png",
        },
        {
          id: 4,
          imgUrl: BASE_IMAGE_ACTIVE_URL + "/home-even.png",
          src: BASE_IMAGE_ACTIVE_URL + "/even-item.png",
        },
        {
          id: 5,
          imgUrl: BASE_IMAGE_ACTIVE_URL + "/home-real-even.png",
          src: BASE_IMAGE_ACTIVE_URL + "/real-even-item.png",
        },
      ],
    };
  },
  methods: {
    handleConfirm(e) {
      this.showDialog = e;
    },
    handleCancel(e) {
      this.showDialog = e;
    },
    closeDialog() {
      this.showDialog = false;
      clearRouterQuery(this);
    },
    goApp() {
      openUrl(urlLink.appLink);
      this.closeDialog();
    },
    openPage(pageNumber) {
      this.$emit("openPage", pageNumber);
      clearRouterQuery(this);
    },
  },
};
</script>

<style lang="less" scoped>
.pay-wrap {
  position: absolute;
  top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  .pay-tip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    .pay-icon {
      font-size: 48px;
      color: #c9c9c9;
      margin-bottom: 40px;
    }
    .pay-text {
      height: 22px;
      font-size: 23px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #c9c9c9;
    }
  }
  .pay-title {
    height: 27px;
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #c1c1c1;
    line-height: 16px;
    width: 190px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
  }
  .pay-img {
    width: 165px;
    height: 30px;
    margin-top: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pay-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 322px;
    height: 243px;
    background: #666666;
    border-radius: 28px;
    margin-top: 50px;
    .pay-tip {
      width: 254px;
      height: 45px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .item-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      .item {
        width: 144px;
        height: 83px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
