<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-07-07 17:12:17
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-07 17:36:44
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
        },
        {
          name: "Pofi 618活动",
          url: "/active",
        },
        {
          name: "Pofi 周年庆",
          url: "/Ann2022",
        },
        {
          name: "Pofi 投票活动",
          url: "/mayday22",
        },
      ],
    };
  },
  mounted() {},
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
  height: 100%;
  background-color: rgb(217, 207, 207);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .item {
    width: 90%;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 40px 10px;
    font-family: korea-text;
    font-size: 18px;
  }
}
</style>
