<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-05-30 11:10:58
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-30 11:13:39
 * @FilePath: /h5-active-v2/src/views/active/home/home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- 调查问卷 -->
    <question-component />
    <!-- 企业微信 -->
    <wechat-component />
    <send-link></send-link>
    <!-- APP介绍区域 -->
    <app-component />
  </div>
</template>

<script>
import SendLink from "../common/part";
import questionComponent from "./components/question-component.vue";
import wechatComponent from "./components/wechat-component.vue";
import appComponent from "./components/go-app.vue";
export default {
  name: "activeHomePage",
  components: {
    SendLink,
    questionComponent,
    wechatComponent,
    appComponent,
  },
};
</script>

<style lang="less" scoped></style>
