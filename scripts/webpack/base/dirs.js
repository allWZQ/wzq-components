const path = require("path");
const root = path.resolve(__dirname, "../../../");

const dirs = {
  // 根目录
  root: root,
  // 源码目录
  src: path.resolve(root, "./src"),
  // 输出目录
  dist: path.resolve(root, "./dist"),
  // 第三方代码模块
  modules: path.resolve(root, "./node_modules"),
  // package配置
  package: path.resolve(root, "./package.json"),
};

module.exports = dirs;
