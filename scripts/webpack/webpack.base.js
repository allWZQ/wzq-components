const path = require("path");
const { dirs, modules, entries } = require("./base");

module.exports = {
  context: dirs.src,
  entry: entries,
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "~": dirs.src,
      "@assets": path.resolve(dirs.src, "./assets"),
    },
  },
  module: modules,
  //规定一个性能指标，当达到该指标提示报错。文档地址：https://webpack.docschina.org/configuration/performance/#performance
  performance: {
    hints: "error", //报错提示
    maxAssetSize: 1024 * 1024 * 10, //此选项根据单个资源体积
    maxEntrypointSize: 1024 * 1024 * 10, //此选项根据入口起点的最大体积
  },
};
