var path = require("path");

module.exports = {
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
