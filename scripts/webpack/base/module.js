const dirs = require("./dirs");
const cssModule = require("./style");

//创建模块，匹配规则 文档地址：https://webpack.docschina.org/configuration/module
const rules = [
  {
    test: /\.tsx?$/,
    loader: "babel-loader",
    include: dirs.src,
    //文档地址：https://webpack.docschina.org/loaders/babel-loader#options
    //babel配置文档地址：https://babeljs.io/docs/en/options
    options: {
      cacheDirectory: true, //优先读缓存
      cacheCompression: false, //当为true时会使用 Gzip 压缩每个 Babel transform 输出
      compact: false, //在紧凑模式下生成代码时，将省略所有可选的换行符和空格。
    },
  },
  {
    test: /\.(json|conf)$/,
    include: dirs.src,
    exclude: /node_modules/,
    loader: "json-loader",
    type: "javascript/auto",
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: [
      {
        loader: "url-loader",
        options: {
          esModule: false,
          limit: 5 * 1000,
          include: dirs.src,
          name: "images/[path][name].[ext]",
        },
      },
    ],
  },
  {
    test: /\.ejs$/,
    loader: "ejs-loader",
    options: {
      esModule: false,
    },
  },
];

module.exports = {
  strictExportPresence: true, //将缺失的导出提示成错误而不是警告
  rules: rules.concat(cssModule),
};
