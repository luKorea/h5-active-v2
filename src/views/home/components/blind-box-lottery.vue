<template>
  <div class="blind-wrap">
    <div class="blind-img animate__animated animate__fadeIn">
      <img ref="blind" :src="showImg" alt="" />
    </div>
    <!--抽奖区域-->
    <template v-if="status === 1">
      <div class="init-content">
        <div class="img-wrap">
          <div class="img img1" @click="changeStatus(2)">
            <img :src="initLeftImg" alt="" />
          </div>
          <div class="img img2" @click="changeStatus(3)">
            <img :src="initRightImg" alt="" />
          </div>
        </div>
      </div>
    </template>
    <template v-if="status === 2">
      <div class="three-one-wrap">
        <van-radio-group
          style="margin-left: 0"
          direction="horizontal"
          v-model="threeToOneSelect"
          class="animate__animated animate__fadeIn"
        >
          <template v-if="threeToOneNameList && threeToOneNameList.length > 0">
            <van-radio
              v-for="(item, index) in threeToOneNameList"
              :name="item.name"
              :key="index"
              checked-color="#D8986E"
              >{{ item.name }}</van-radio
            >
          </template>
        </van-radio-group>
      </div>
    </template>
    <template v-if="status === 3">
      <div class="six-one-wrap animate__animated animate__fadeIn">
        <div class="six-one-item">
          <template v-if="sixToOneImageList && sixToOneImageList.length > 0">
            <div
              class="item"
              v-for="(item, i) in sixToOneImageList"
              :key="i"
              :style="{ marginRight: i === 2 || i === 5 ? '0px' : '4px' }"
            >
              <img
                class="item-img"
                :src="item.url"
                :class="{ active_move: index == i }"
                alt=""
              />
            </div>
          </template>
        </div>
      </div>
    </template>
    <div
      class="btn-wrap"
      :style="{
        top: status === 1 ? '10px' : '8px',
      }"
    >
      <div class="btn" @click="changeStatus(2)">自选三选一</div>
      <div class="btn" @click="changeStatus(3)">盲盒六抽一</div>
    </div>
    <div class="btn-link">
      <div class="btn-change" @click="getPrize">
        {{ status === 3 ? "抽取" : "领取" }}
      </div>
    </div>
  </div>
</template>

<script>
import { errorInfo } from "@/utils";

export default {
  name: "blind-box-lottery",
  data() {
    return {
      initImg: require("@/assets/image/init-state.png"),
      initLeftImg: require("@/assets/image/init-left.png"),
      initRightImg: require("@/assets/image/init-right.png"),
      threeToOne: require("@/assets/image/three-to-one.png"),
      threeToOneNameList: [
        {
          id: 1,
          name: "BJD大Q",
        },
        {
          id: 2,
          name: "BJD小Q",
        },
        {
          id: 3,
          name: "人鱼大Q",
        },
      ],
      threeToOneSelect: "",
      sixToOne: require("@/assets/image/six-to-one.png"),
      sixToOneImageList: [
        { id: 1, url: require("@/assets/image/prize/pro.png") },
        { id: 2, url: require("@/assets/image/prize/p8.png") },
        { id: 3, url: require("@/assets/image/prize/qb.png") },
        { id: 4, url: require("@/assets/image/prize/big.png") },
        { id: 5, url: require("@/assets/image/prize/small.png") },
        { id: 6, url: require("@/assets/image/prize/fihsh.png") },
      ],
      showImg: null,
      status: 1, // 1.初始化显示 2. 选择三选一 3. 盲盒抽取
      activeClassName: "animate__animated animate__fadeIn delay-3s",
      active: false,

      //  盲盒抽奖
      timer: null,
      index: 1, // 当前转动到哪个位置，第一次起点位置0,
      count: 6, // 总共有多少个位置
      times: 0, // 转动跑格子次数,
      cycle: 10, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      speed: 200, // 初始转动速度
      prize: 1,
    };
  },
  mounted() {
    // this.status = 1; // 进入页面初始化状态
    this.changeImg();
  },
  methods: {
    changeImg() {
      if (this.status === 1) {
        this.showImg = this.initImg;
      } else if (this.status === 2) {
        this.showImg = this.threeToOne;
      } else {
        this.showImg = this.sixToOne;
      }
    },
    changeStatus(status) {
      if (this.status !== status) {
        this.status = status;
        this.threeToOneSelect = "";
        this.changeImg();
      }
    },
    openDialog() {
      this.$emit("openDialog");
    },
    getPrize() {
      switch (this.status) {
        case 1:
          this.status = 2;
          this.changeImg();
          break;
        case 2:
          this.getThreeToOne();
          break;
        case 3:
          this.getSixToOne();
          break;
      }
    },
    getThreeToOne() {
      if (this.threeToOneSelect === "") errorInfo("请先选择对应的物品");
      else this.$emit("showDifferentDialog", 1);
    },
    getSixToOne() {
      this.startRoll();
      // this.$emit("showDifferentDialog", 5);
    },
    //  抽奖区域
    // 开始转动
    startRoll() {
      this.times += 1; // 转动次数
      this.oneRoll(); // 转动过程调用的每一次转动方法，这里是第一次调用初始化
      this.usePrize();
    },
    // 每一次转动
    oneRoll() {
      let index = this.index; // 当前转动到哪个位置
      const count = 6; // 总共有多少个位置
      index += 1;
      if (index > count - 1) {
        index = 0;
      }
      this.index = index;
    },
    usePrize() {
      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if (this.times > this.cycle + 10 && this.prize === this.index) {
        clearTimeout(this.timer); // 清除转动定时器
        this.times = 0; // 转动跑格子次数初始化为0，可以开始下次抽奖
        //   根据后台结果返回显示对应弹框
      } else {
        if (this.times < this.cycle - 20) {
          this.speed -= 4; // 加快转动速度
        } else {
          this.speed += 10; // 抽奖即将结束，放慢转动速度
        }
        this.timer = setTimeout(this.startRoll, this.speed); //开始转动
      }
    },
  },
};
</script>

<style>
.van-radio--horizontal {
  margin-right: 16px;
}
.van-radio--horizontal:last-child {
  margin-right: 0;
}
.van-radio__icon .van-icon {
  border-color: #d8986e !important;
}
.van-radio__label {
  color: #d8986e !important;
}
</style>
<style scoped lang="less">
.blind-wrap {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .blind-img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .init-content {
    position: absolute;
    top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    .img-wrap {
      display: flex;
      .img {
        width: 131px;
        &:last-child {
          margin-right: 0;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .img1 {
        margin-left: 2px;
        margin-right: 8px;
      }
      .img2 {
        margin-left: 10px;
      }
    }
  }
  .three-one-wrap {
    position: absolute;
    top: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
  }
  .six-one-wrap {
    position: absolute;
    top: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    .six-one-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      .item {
        width: 84px;
        //height: 81px;
        margin-right: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        .item-img {
          width: 80px;
          box-sizing: border-box;
          img {
            background-size: cover;
          }
        }
      }
      .active_move {
        //border: 5px solid #f14938;
        border-radius: 20%;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
  .btn-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    width: 100%;
    .btn {
      width: 91px;
      height: 27px;
      line-height: 27px;
      text-align: center;
      background: #f14938;
      border-radius: 14px;
      font-size: 13px;
      font-family: Source Han Sans CN;
      font-weight: 800;
      color: #f9f9f9;
    }
  }
  .btn-link {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    top: 240px;
    .btn-change {
      width: 113px;
      height: 33px;
      line-height: 33px;
      background: linear-gradient(0deg, #e84b33 0%, #fc453f 100%);
      border-radius: 12px;
      text-align: center;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
