import { Button, Dialog, Popup } from "vant";
import "vant/lib/index.css"; // 全局引入样式

const components = [Button, Popup, Dialog];

export default function (app) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
