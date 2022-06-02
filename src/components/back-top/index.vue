<!--
 * @Author: korealu 643949593@qq.com
 * @Date: 2022-06-02 17:12:11
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-02 17:14:22
 * @FilePath: /h5-active-v2/src/components/back-top/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <van-button
      color="rgba(0,0,0,.3)"
      round
      class="backTop"
      size="mini"
      @click="backTop"
      v-show="scrollType"
    >
      <van-icon class="icon-backTop" name="arrow-up" size="15" />
    </van-button>
  </div>
</template>

<script>
export default {
  name: "backTop",
  data() {
    return {
      scrollType: false, // 控制按钮显示和隐藏
      timerId: null,
      scrollTop: 0,
    };
  },
  // 组件创建监听scroll此方法
  mounted() {
    window.addEventListener("scroll", this.handleScoll, true);
  },
  // 组件销毁移除监听
  destroyed() {
    window.removeEventListener("scroll", this.handleScoll);
    window.clearInterval(this.timerId);
  },
  methods: {
    backTop() {
      this.timerId = setInterval(() => {
        // 给返回增加动画效果
        const upSpeed = Math.floor(-this.scrollTop / 5);
        document.documentElement.scrollTop = this.scrollTop + upSpeed;
        if (this.scrollTop === 0) {
          clearInterval(this.timerId);
        }
      }, 30);
    },
    handleScoll(ev) {
      console.log(ev);
      // 当滚动的距离大于700 时出现该按钮
      this.scrollTop = window.pageYOffset;
      if (window.pageYOffset / 100 > 7) {
        this.scrollType = true;
      } else {
        this.scrollType = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.backTop {
  position: fixed;
  bottom: 0.4rem;
  right: 0.2rem;
  z-index: 999;
  border: none;
}
</style>
