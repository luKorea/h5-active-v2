<!--
 * @Author: your name
 * @Date: 2022-01-13 17:43:39
 * @LastEditTime: 2022-01-21 15:14:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/views/home/components/desc.vue
-->
<template>
  <div class="desc-wrap">
    <template v-if="list && list.length > 0">
      <div v-for="(item, index) in list" :key="index">
        {{ index + 1 }}. {{ item }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "descComponent",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="less">
.desc-wrap {
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 300;
  color: #efefef;
  line-height: 25px;
  margin: 20px 40px 30px 40px;
}
</style>
