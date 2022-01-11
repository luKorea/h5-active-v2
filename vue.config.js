module.exports = {
  publicPath: "./",
  devServer: {
    hot: true,
    open: false,
    proxy: {
      "^/api": {
        target: "http://www.baidu.com",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
};
