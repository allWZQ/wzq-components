const path = require("path");
const dirs = require("./dirs");
const glob = require("glob"); //利用它匹配出我们想要的目录下的一些文件
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成html模版插件 文档地址：https://github.com/jantimon/html-webpack-plugin#options

const entries = {};
const pages = [];

// 压缩、混淆、去掉日志  文档地址：https://github.com/terser/html-minifier-terser#options-quick-reference
const minifyOptions = {
  removeComments: true, //去除 HTML 注释
  collapseWhitespace: true, //去除空白换行
  removeRedundantAttributes: true, //当值与默认值相同时删除该属性
  useShortDoctype: true, //doctype 用短(HTML5) 文档类型替换
  removeEmptyAttributes: true, //删除所有具有纯空格值的属性
  removeStyleLinkTypeAttributes: true, //type="text/css"从style和link标签中删除。其他type属性值保持不变
  keepClosingSlash: true, //在单例元素上保留斜杠
  minifyJS: true, //缩小脚本元素和事件属性中的 JavaScript（使用Terser）
  minifyCSS: true, //缩小样式元素和样式属性中的 CSS（使用clean-css）
  minifyURLs: true, //缩小各种属性中的 URL（使用相关 URL）
};

glob.sync(path.resolve(dirs.src, "./pages/*/index.tsx")).forEach((item) => {
  // 获取文件名
  const name = item.match(/([\w-]+)(?=\/index.tsx)/)[1];

  // 选择模板
  const template = path.resolve(dirs.src, `./pages/common.ejs`);

  // 载入热更新
  entries[name] = [
    require.resolve("react-dev-utils/webpackHotDevClient"),
    item,
  ].filter(Boolean);

  // 配置
  pages.push(
    new HtmlWebpackPlugin({
      title: "webpack", //文档标题
      filename: `${name}.html`, //文件名
      template: template, //模版路径
      inject: true, //注入
      favicon: path.resolve(dirs.src, "favicon.ico"), //文档icon
      chunks: [name], //块（单元测试）
      minify: minifyOptions, //压缩规则
    })
  );
});

module.exports = { entries, pages };
