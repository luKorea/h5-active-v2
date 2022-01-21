/*
 * @Author: your name
 * @Date: 2022-01-13 17:43:39
 * @LastEditTime: 2022-01-21 11:15:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/vue.config.js
 */
module.exports = {
  publicPath: "./",
  devServer: {
    hot: true,
    open: true,
    compress: true,
    proxy: {
      "^/api": {
        target: "https://test.pofi.pro",
        // target: "http://192.168.28.45:18001",
        // pathRewrite: {
        //   "^/api": "",
        // },
        changeOrigin: true,
      },
    },
  },
};
