<!--
 * @Author: korealu
 * @Date: 2022-03-02 11:39:56
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-02 16:08:40
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
          <div class="btn" @click="changeImg(1)">BJD 夏娃</div>
          <div class="btn" @click="changeImg(2)">BJD 亚当</div>
          <div class="btn" @click="changeImg(3)">BJD 队长</div>
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
              @click="handleSelectItem(item)"
            >
              <div class="img">
                <img :src="item.img" alt="" referrerpolicy="no-referrer" />
              </div>
              <div class="title">{{ item.title }}</div>
              <div class="originalPrice">{{ item.originalPrice }}P币</div>
              <div class="presentPrice">
                <div class="price">
                  <span class="big">{{ item.presentPrice }}</span>
                  <span class="small">P币</span>
                </div>
                <div class="radio">
                  <input
                    id="item"
                    type="radio"
                    name="item"
                    :value="item.title"
                    :checked="selectItem === item.id"
                  />
                  <label for="item"></label>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <pose-chose ref="pose-chose" :info="selectInfo" />
  </div>
</template>

<script>
import { BASE_IMAGE_ANNIVERSARY_URL } from "@/request/config";
import PoseChose from "./chose.vue";
export default {
  components: {
    PoseChose,
  },
  data() {
    return {
      status: 1, // 1. BJD 夏娃 2. BJD 亚当 3. BJD 队长 点击不同项雀环不同背景
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
      selectInfo: {
        img: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-chose-img.png",
        title: "Pose 库·舞蹈动作·孔雀舞动作 500 款",
      },
      list: [
        {
          id: 1,
          title: "Pose 库·舞蹈动作·孔雀舞动作 500 款",
          img:
            BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-chose-img.png",
          originalPrice: 18,
          presentPrice: 1,
        },
        {
          id: 2,
          title: "Pose 库·舞蹈动作·孔雀舞动作 666 款",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/img-one.png",
          originalPrice: 18,
          presentPrice: 1,
        },
        {
          id: 3,
          title: "Pose 库·舞蹈动作·孔雀舞动作 777 款",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/img-two.png",
          originalPrice: 18,
          presentPrice: 1,
        },
        {
          id: 4,
          title: "Pose 库·舞蹈动作·孔雀舞动作 400 款",
          img:
            BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-chose-img.png",
          originalPrice: 18,
          presentPrice: 1,
        },
        {
          id: 5,
          title: "Pose 库·舞蹈动作·孔雀舞动作 300 款",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/img-one.png",
          originalPrice: 18,
          presentPrice: 1,
        },
        {
          id: 6,
          title: "Pose 库·舞蹈动作·孔雀舞动作 200 款",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/img-two.png",
          originalPrice: 18,
          presentPrice: 1,
        },
        {
          id: 7,
          title: "Pose 库·舞蹈动作·孔雀舞动作 100 款",
          img:
            BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/pose-chose-img.png",
          originalPrice: 18,
          presentPrice: 1,
        },
        {
          id: 8,
          title: "Pose 库·舞蹈动作·孔雀舞动作 600 款",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/img-one.png",
          originalPrice: 18,
          presentPrice: 1,
        },
      ],
    };
  },
  methods: {
    changeImg(status) {
      this.selectItem = 0;
      if (status === this.status) return;
      switch (status) {
        case 1:
          this.defaultSelectImg = this.selectOneImg;
          this.status = status;
          break;
        case 2:
          this.defaultSelectImg = this.selectTwoImg;
          this.status = status;
          break;
        case 3:
          this.defaultSelectImg = this.selectThreeImg;
          this.status = status;
          break;
      }
    },
    handleSelectItem(item) {
      if (item.id === this.selectItem) return;
      this.selectItem = item.id;
      console.log(item, "用户选中的项目");
      this.$refs["pose-chose"].$el.scrollIntoView({
        behavior: "smooth",
      });
      this.selectInfo = item;
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
    }
  }
}
</style>
