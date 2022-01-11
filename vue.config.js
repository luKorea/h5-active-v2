module.exports = {
  publicPath: "./",
  devServer: {
    hot: true,
    open: true,
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
