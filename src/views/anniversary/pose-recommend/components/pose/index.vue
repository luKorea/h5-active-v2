<!--
 * @Author: korealu
 * @Date: 2022-03-02 11:39:56
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-11 10:58:03
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/pose-recommend/components/pose/index.vue
-->
<template>
  <div class="content-wrap">
    <div class="pose-one-wrap">
      <!-- 背景 -->
      <div class="pose-one-bg">
        <img :src="bgImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <!-- 标题 -->
      <div class="pose-title">
        <img :src="titleImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="pose-tab-wrap">
        <!-- 背景图 -->
        <div class="tab-img-bg">
          <img :src="defaultSelectImg" alt="" referrerpolicy="no-referrer" />
        </div>
        <!-- 头部文字 -->
        <div class="btn-wrap">
          <template v-if="poseData && poseData.length > 0">
            <div v-for="(item, index) in poseData" :key="item.snId">
              <div class="btn" @click="changeImg(index, item)">
                {{ item.mold.name }}
              </div>
            </div>
          </template>
          <!-- <div class="btn" @click="changeImg(1)">BJD 夏娃</div>
          <div class="btn" @click="changeImg(2)">BJD 亚当</div>
          <div class="btn" @click="changeImg(3)">BJD 队长</div> -->
        </div>
      </div>
      <!-- tab内容区域 -->
      <div class="pose-content">
        <div class="tab-wrap">
          <template v-if="list && list.length > 0">
            <div
              v-for="item in list"
              :key="item.id"
              class="item"
              :class="selectItem === item.snId && 'selectItem'"
              @click="handleSelectItem(item)"
            >
              <div class="img">
                <img :src="item.cover" alt="" referrerpolicy="no-referrer" />
              </div>
              <div class="title">{{ item.name }}</div>
              <div class="originalPrice">{{ item.original }}P币</div>
              <div class="presentPrice">
                <div class="price">
                  <span class="big">{{ item.sale }}</span>
                  <span class="small">P币</span>
                </div>
                <template v-if="!item.isHave">
                  <div class="radio">
                    <input
                      id="item"
                      type="radio"
                      name="item"
                      :value="item.title"
                      :checked="selectItem === item.snId"
                    />
                    <label for="item"></label>
                  </div>
                </template>
                <template v-else>
                  <div class="has">已拥有</div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <pose-chose
      ref="pose-chose"
      @openPayModal="openPayModal"
      :userInfo="userInfo"
      :info="selectInfo"
    />
  </div>
</template>

<script>
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
import PoseChose from "./chose.vue";
import { errorInfo } from "@/utils";
import smoothscroll from "smoothscroll-polyfill";
export default {
  components: {
    PoseChose,
  },
  props: {
    poseData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      status: 0, // 1. BJD 夏娃 2. BJD 亚当 3. BJD 队长 点击不同项雀环不同背景
      bgImg: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-one-bg.png",
      titleImg: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/one-title.png",
      defaultSelectImg:
        BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-chose-one-one.png",
      selectOneImg:
        BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-chose-one-one.png",
      selectTwoImg:
        BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-chose-one-two.png",
      selectThreeImg:
        BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-chose-one-three.png",
      selectItem: 0,
      selectInfo: {},
      list: [],
    };
  },

  // watch: {
  //   list: {
  //     handler() {
  //       return this.poseData.length > 0 && this.poseData[0].preps;
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  mounted() {
    setTimeout(() => {
      for (let i = 0; i < this.poseData.length; i++) {
        const item = this.poseData[i];
        if (item.mold.isHave) {
          if (item.mold.isHave && item.mold.name === "BJD夏娃") {
            this.list = item.preps;
            this.status = i;
            this.defaultSelectImg = this.selectOneImg;
            return;
          } else if (item.mold.isHave && item.mold.name === "BJD亚当") {
            this.list = item.preps;
            this.status = i;
            this.defaultSelectImg = this.selectTwoImg;
            return;
          } else if (item.mold.isHave && item.mold.name === "BJD队长") {
            this.list = item.preps;
            this.status = i;
            this.defaultSelectImg = this.selectThreeImg;
          }
        }
      }
    }, 1000);
  },
  methods: {
    changeImg(status, item) {
      console.log(status, item.mold);
      if (status === this.status) return;
      if (item.mold.isHave) {
        this.selectItem = 0;
        this.selectInfo = {
          choseImg:
            BASE_IMAGE_ANNIVERSARY_URL +
            "/pose-recommend/default-pose-chose.png",
          title: "",
        };
        switch (status) {
          case 0:
            this.defaultSelectImg = this.selectOneImg;
            this.list = item.preps;
            this.status = status;
            break;
          case 1:
            this.defaultSelectImg = this.selectTwoImg;
            this.list = item.preps;
            this.status = status;
            break;
          case 2:
            this.defaultSelectImg = this.selectThreeImg;
            this.list = item.preps;
            this.status = status;
            break;
        }
      } else {
        errorInfo("您还没有该人偶");
      }
    },
    handleSelectItem(item) {
      if (!item.isHave) {
        if (item.snId === this.selectItem) return;
        this.selectItem = item.snId;
        console.log(item, "用户选中的项目");
        this.$nextTick(() => {
          smoothscroll.polyfill();
          this.$refs["pose-chose"].$el.scrollIntoView({
            behavior: "smooth",
          });
        });
        this.selectInfo = {
          ...item,
          title: item.name,
          choseImg: item.cover,
        };
      }
    },
    openPayModal(type, info) {
      this.$emit("openPayModal", type, info);
    },
  },
};
</script>

<style>
input[type="radio"]:checked {
  background-color: #fd8869;
  background-clip: content-box;
  padding: 0.149333rem;
  box-sizing: border-box;
}
</style>
<style lang="less" scoped>
.pose-one-wrap {
  margin-bottom: 50px;
  position: relative;
  .pose-one-bg {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pose-title {
    width: 100%;
    position: absolute;
    top: 10px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 233px;
      height: 100%;
    }
  }
  .pose-tab-wrap {
    position: absolute;
    top: 50px;
    left: 0;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    .tab-img-bg {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .btn-wrap {
      position: absolute;
      top: 20px;
      margin: 0 auto;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      .btn {
        // width: 102px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: #d4ae82;
      }
    }
  }
  .pose-content {
    position: absolute;
    // padding: 10px 22px;
    top: 110px;
    left: 0;
    color: white;
    height: 360px;
    overflow: hidden;
    overflow-y: scroll;
    width: 100%;
    box-sizing: border-box;
    .tab-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 142px;
        height: 157px;
        background: #c9c9c9;
        border-radius: 6px;
        padding: 4px;
        margin: 4px 3px;
        box-sizing: border-box;
        .img {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #0f0f0f;
          line-height: 18px;
        }
        .originalPrice {
          font-size: 7px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          text-decoration: line-through;
          color: #666666;
          line-height: 11px;
          margin-top: 10px;
        }
        .presentPrice {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 3px;
          .price {
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #fd285a;
            line-height: 16px;
            .big {
              font-size: 14px;
            }
            .samll {
              font-size: 11px;
            }
          }
          .has {
            font-size: 12px;
            color: #666666;
          }
          .radio {
            position: relative;
            input[type="radio"] {
              width: 10px;
              height: 10px;
              opacity: 0;
            }

            label {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              border: 1px solid #000000;
            }

            /*设置选中的input的样式*/
            /* + 是兄弟选择器,获取选中后的label元素*/
            // input:checked + label {
            //   background-color: #000000;
            //   border: 1px solid #000000;
            // }

            input:checked + label::after {
              position: absolute;
              content: "";
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              width: 6px;
              height: 6px;
              margin: auto;
              background: #000000;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
            }
          }
        }
      }
      .selectItem {
        border: 2px solid rgb(218, 132, 46);
      }
    }
  }
}
</style>
