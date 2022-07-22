<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-07 17:12:17
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-22 10:21:26
 * @FilePath: /h5-active-v2/src/views/presentTheWork/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEv
-->
<template>
  <div class="present-page">
    <van-dropdown-menu class="fixed-top" active-color="#1989fa">
      <van-dropdown-item
        @change="handleChangePage"
        v-model="pageOne"
        :options="list"
      />
      <van-dropdown-item
        @change="handleChangePage"
        v-model="pageTwo"
        :options="list2"
      />
    </van-dropdown-menu>
    <div class="wrap">
      <template v-for="item in list">
        <template v-if="item.imgUrl">
          <div class="item" :key="item.value" @click="toRouter(item.value)">
            <div class="title">{{ item.text }}</div>
            <div class="img">
              <img :src="item.imgUrl" alt="" referrerpolicy="no-referrer" />
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "presentTheWorkComponent",
  data() {
    return {
      pageOne: 0,
      pageTwo: 0,
      list: [
        {
          text: "活动落地页",
          value: 0,
        },
        {
          text: "海外下载页",
          url: "https://event.pofi.art/pofiDownload",
        },
        {
          text: "翎夕活动",
          url: "https://event.pofi.art/pofiActive",
        },
        {
          text: "暑假爆肝活动",
          value: "/summerVacation22",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/newYear'sDay.jpg",
        },
        {
          text: "618活动",
          value: "/active",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/618.jpg",
        },
        {
          text: "周年庆",
          value: "/advertisement",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/advertisement.jpg",
        },
        {
          text: "投票活动",
          value: "/mayday22",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/vote.jpg",
        },
        {
          text: "贺新春日纪",
          value: "/group",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/newYear'sDay.jpg",
        },
      ],
      list2: [
        {
          text: "抽奖页面",
          value: 0,
        },
        {
          text: "暑假爆肝活动",
          value: "/summerVacation22",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/newYear'sDay.jpg",
        },
        {
          text: "618活动",
          value: "/active",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/618.jpg",
        },
        {
          text: "周年庆",
          value: "/advertisement",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/advertisement.jpg",
        },
        {
          text: "投票活动",
          value: "/mayday22",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/vote.jpg",
        },
        {
          text: "贺新春日纪",
          value: "/group",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/newYear'sDay.jpg",
        },
      ],
    };
  },
  mounted() {
    document.title = "作品集展示页面";
  },
  methods: {
    handleChangePage(e) {
      e !== 0 && this.toRouter(e);
    },
    toRouter(url) {
      this.$router.push({
        path: url,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.present-page {
  width: 100%;
  min-height: 100%;
  // background-color: rgb(217, 207, 207);
  // background: linear-gradient(90deg, #dcf8ef, #fee2f8);
  // background: linear-gradient(90deg, #cd9cf2, #f6f3ff);
  // background: linear-gradient(90deg, #1d6fa3, #65fdf0);
  background-image: url("../../assets/image/my-bg.jpeg");
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding: 20px 0;
  .fixed-top {
    width: 100%;
    position: sticky;
    top: 0 !important;
    background: linear-gradient(90deg, #cd9cf2, #f6f3ff) !important;
  }
  .wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .item {
    width: 90%;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 40px 10px;
    .title {
      font-family: "宋体";
      font-size: 16px;
      text-align: center;
      margin-bottom: 10px;
      // color: #fff;
    }
    .img {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }
  }
}
</style>
