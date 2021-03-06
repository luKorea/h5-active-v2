/*
 * @Author: korealu
 * @Date: 2022-01-13 17:43:39
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-12 14:17:03
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
  DropdownMenu,
  DropdownItem,
  Swipe,
  SwipeItem,
  Checkbox,
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
  DropdownMenu,
  DropdownItem,
  Swipe,
  SwipeItem,
  Checkbox,
];

Vue.use(Dialog);
Vue.use(Loading);

export default function (app) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
