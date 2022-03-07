import axios from "axios";
import qs from "qs";
import { Toast } from "vant";
// import store from "@/store";

const DEFAULT_LOADING = true;

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
class KoreaRequest {
  instance = "";
  interceptors = {};
  showLoading = false;
  loading = "";

  constructor(config) {
    // 创建axios实例
    this.instance = axios.create(config);
    // 保存基本信息
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    // 单个实例请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    );
    // 单个实例响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.requestInterceptorsCatch
    );
    //  全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading
        if (this.showLoading) {
          // this.loading = "";
          this.loading = Toast.loading({
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner",
            overlay: true,
          });
          console.log(this.loading, "loading");
        }
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        // this.loading?.close();
        console.log("回显数据", response);
        Toast.clear();
        // const { data } = response;
        // if (data.code === 2) {
        //   Dialog.alert({
        //     message: "登录超时，请重新登录",
        //   }).then(() => {
        //     store.dispatch("logoutAction").then(() => {
        //       window.location.reload();
        //     });
        //   });
        // }
        return response.data;
      },
      (error) => {
        // this.loading?.close();
        Toast.clear();
        return error;
      }
    );
  }

  /**
   * @description request 请求
   * @param config
   */
  request(config) {
    return new Promise((resolve, reject) => {
      // 单个请求拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      // 判断是否需要显示loading效果
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request(config)
        .then((res) => {
          // 单个请求对数据处理
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          this.showLoading = DEFAULT_LOADING;
          // 将结果返回
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: "GET" });
  }

  post(config) {
    qs.stringify(config.data);
    return this.request({ ...config, method: "POST" });
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }

  patch(config) {
    return this.request({ ...config, method: "PATCH" });
  }

  put(config) {
    return this.request({ ...config, method: "PUT" });
  }

  options(config) {
    return this.request({ ...config, method: "OPTIONS" });
  }

  purge(config) {
    return this.request({ ...config, method: "PURGE" });
  }

  head(config) {
    return this.request({ ...config, method: "HEAD" });
  }

  link(config) {
    return this.request({ ...config, method: "LINK" });
  }

  unlink(config) {
    return this.request({ ...config, method: "UNLINK" });
  }
}

export default KoreaRequest;
