/*
 * @Author: korealu
 * @Date: 2022-01-13 17:43:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-02 10:25:00
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
];

Vue.use(Dialog);

export default function (app) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
