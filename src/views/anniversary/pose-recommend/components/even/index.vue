<!--
 * @Author: korealu
 * @Date: 2022-03-02 11:39:56
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-10 17:09:47
 * @Description: file content
 * @FilePath: /h5-active-v2/src/views/anniversary/pose-recommend/components/even/index.vue
-->
<template>
  <div class="content-wrap">
    <div class="even-one-wrap">
      <!-- 背景 -->
      <div class="even-one-bg">
        <img :src="bgImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <!-- 标题 -->
      <div class="even-title">
        <img :src="titleImg" alt="" referrerpolicy="no-referrer" />
      </div>
      <div class="even-wrap">
        <template v-if="evenData && evenData.length > 0">
          <div
            class="item"
            v-for="(item, index) in evenData"
            :key="item.mold.snId"
            @click="changeSelectImg(item.mold, index)"
          >
            <div class="img-wrap">
              <img
                :src="
                  selectItemIndex === index
                    ? item.mold.selectImg
                    : item.mold.verticalImg
                "
                alt=""
                referrerpolicy="no-referrer"
              />
            </div>
          </div>
        </template>
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
import smoothscroll from "smoothscroll-polyfill";
export default {
  components: {
    PoseChose,
  },
  props: {
    evenData: {
      type: Array,
      default: () => [],
    },
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      bgImg:
        BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/even/even-one-bg.png",
      titleImg: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/one-title.png",
      selectInfo: {
        choseImg:
          BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/even/chose-xiawa.png",
        title: "Pofi虚拟女性人偶-BJD夏娃",
      },
      selectItemIndex: 0, // 默认选中的人偶
      list: [
        // img 默认图。selectImg 选中图 choseImg 下方展示图
        {
          id: 1,
          title: "Pofi虚拟女性人偶-BJD夏娃",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/even/xiawa.png",
          selectImg:
            BASE_IMAGE_ANNIVERSARY_URL +
            "/pose-recommend/even/select-xiawa.png",
          choseImg:
            BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/even/chose-xiawa.png",
        },
        {
          id: 2,
          title: "Pofi虚拟男性人偶-BJD亚当",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/even/yadan.png",
          selectImg:
            BASE_IMAGE_ANNIVERSARY_URL +
            "/pose-recommend/even/select-yadan.png",
          choseImg:
            BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/even/chose-yadan.png",
        },
        {
          id: 3,
          title: "Pofi虚拟男性人偶-BJD队长",
          img: BASE_IMAGE_ANNIVERSARY_URL + "/pose-recommend/even/duizhang.png",
          selectImg:
            BASE_IMAGE_ANNIVERSARY_URL +
            "/pose-recommend/even/select-duizhang.png",
          choseImg:
            BASE_IMAGE_ANNIVERSARY_URL +
            "/pose-recommend/even/chose-duizhang.png",
        },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      const item = this.evenData ? this.evenData[0].mold : {};
      this.selectInfo = {
        ...item,
        choseImg: item.cover,
        title: item.name,
      };
    }, 1000);
  },
  methods: {
    changeSelectImg(item, index) {
      if (index === this.selectItemIndex) return;
      this.selectItemIndex = index;
      this.$nextTick(() => {
        smoothscroll.polyfill();
        this.$refs["pose-chose"].$el.scrollIntoView({
          behavior: "smooth",
        });
      });
      this.selectInfo = {
        ...item,
        choseImg: item.cover,
        title: item.name,
      };
    },
    openPayModal(type, info) {
      this.$emit("openPayModal", type, info);
    },
  },
};
</script>
<style lang="less" scoped>
.even-one-wrap {
  margin-bottom: 50px;
  position: relative;
  .even-one-bg {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .even-title {
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
  .even-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 10px;
    top: 70px;
    .item {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
