module.exports = {
  publicPath: "./",
  devServer: {
    hot: true,
    open: true,
    proxy: {
      "^/api": {
        target: "https://test.pofi.pro",
        // pathRewrite: {
        //   "^/api": "",
        // },
        changeOrigin: true,
      },
    },
  },
};
