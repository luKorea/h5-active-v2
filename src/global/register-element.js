/*
 * @Author: korealu
 * @Date: 2022-01-13 17:43:39
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-06-06 09:41:02
 * @Description: file content
 * @FilePath: /h5-active-v2/src/global/register-element.js
 */
import Vue from "vue";
import {
  Button,
  Dialog,
  Popup,
  Image,
  Radio,
  RadioGroup,
  Overlay,
  CountDown,
  Icon,
  Loading,
} from "vant";
import "vant/lib/index.css"; // 全局引入样式

const components = [
  Button,
  Popup,
  Image,
  Radio,
  RadioGroup,
  Overlay,
  CountDown,
  Icon,
];

Vue.use(Dialog);
Vue.use(Loading);

export default function (app) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
