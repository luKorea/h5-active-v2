<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-07 17:12:17
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-07 18:12:32
 * @FilePath: /h5-active-v2/src/views/presentTheWork/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEv
-->
<template>
  <div class="present-page">
    <div
      class="item"
      v-for="item in list"
      :key="item.url"
      @click="goPage(item.url)"
    >
      <div class="title">{{ item.name }}</div>
      <div class="img">
        <img :src="item.imgUrl" alt="" referrerpolicy="no-referrer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "presentTheWorkComponent",
  data() {
    return {
      list: [
        {
          name: "Pofi 暑假爆肝活动",
          url: "/summerVacation22",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/newYear'sDay.jpg",
        },
        {
          name: "Pofi 618活动",
          url: "/active",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/advertisement.jpg",
        },
        {
          name: "Pofi 周年庆",
          url: "/Ann2022",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/618.jpg",
        },
        {
          name: "Pofi 投票活动",
          url: "/mayday22",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/vote.jpg",
        },
        {
          name: "Pofi 贺新春日纪",
          url: "/group",
          imgUrl: "https://f3.pofiapp.com/event/pageImage/newYear'sDay.jpg",
        },
      ],
    };
  },
  mounted() {
    document.title = "作品集展示页面";
  },
  methods: {
    goPage(url) {
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
  background-color: rgb(217, 207, 207);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  .item {
    width: 90%;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 40px 10px;
    .title {
      font-family: "宋体";
      font-size: 16px;
      text-align: center;
      margin-bottom: 10px;
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
