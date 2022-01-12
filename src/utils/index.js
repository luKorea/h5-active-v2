import { Toast } from "vant";

export const openUrl = (url, blank = "_self") => {
  window.open(url, blank);
};

export const successInfo = (message) => Toast.success(message);

export const errorInfo = (message) => Toast.fail(message);

export const goAnchor = (el, instance) => {
  instance.$el.querySelector(el).scrollIntoView();
};

export const copyShareLink = (url, app) => {
  app
    .$copyText(url)
    .then(() => {
      successInfo("复制成功");
    })
    .catch(() => {
      errorInfo("复制失败");
    });
};
