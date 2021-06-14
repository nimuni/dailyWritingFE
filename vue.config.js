var path = require("path");

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "DailyWriting - 매일 매일 글쓰기";
        return args;
      })
  },
  outputDir: path.resolve(__dirname, "../be/public/"),
  devServer: {
    disableHostCheck: true,
    proxy: {
      // proxyTable 설정
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },

  transpileDependencies: ["vuetify"]
};
