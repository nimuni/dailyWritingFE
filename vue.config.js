var path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
      args[0].title = "DailyWriting - 매일 매일 글쓰기";
        return args;
      });
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_fnames: false,
          },
        }),
      ],
    },
  },
  outputDir: path.resolve(__dirname, "../be/public/"),
  devServer: {
    disableHostCheck: true,
    proxy: {
      // proxyTable 설정
      "/api": {
        target: "http://nimuni.iptime.org:3000/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },

  transpileDependencies: ["vuetify"]
};
