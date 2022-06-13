const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const basic = require('./webpack.base');
const { dirs, pages } = require('./base');
const { greatrcProcess } = require('../config');
const appName = require(dirs.package).name;

const plugins = [].concat(pages);
const define = require(dirs.root + `/.greatrc.${process.env.RUN_ENV}`);
let injectedProcessEnvData = {
  ...define,
};
plugins.push(new webpack.DefinePlugin({ ...greatrcProcess(injectedProcessEnvData) }));

const config = {
  ...basic,
  mode: 'production', //为模块和 chunk 启用确定性的混淆名称
  devtool: false,
  //文档地址：https://webpack.docschina.org/configuration/output/
  output: {
    path: dirs.dist, //输出路径
    filename: 'js/[name].[chunkhash:8].js', //此选项决定了每个输出 bundle 的名称
    publicPath: '/', //按需加载path
    jsonpFunction: `webpackJsonp${appName}`,
    globalObject: 'this', //为了使 UMD 构建在浏览器和 Node.js 上均可用，应将 output.globalObject 选项设置为 'this'
  },
  plugins: plugins.concat([
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ]),
};

module.exports = config;
