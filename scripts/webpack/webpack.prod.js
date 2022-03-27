const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const SafePostCssParser = require('postcss-safe-parser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require('copy-webpack-plugin');
const basic = require('./webpack.base');
const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { dirs, pages, injectedParams } = require('./base');
const appName = require(dirs.package).name;

const plugins = [].concat(pages);
const define = require(dirs.root + `/.greatrc.${process.env.RUN_ENV}`);
let injectedProcessEnvData = {
  ...define,
  ...{
    LOG: !!process.env.LOG,
    ...injectedParams,
  },
};
plugins.push(
  new webpack.DefinePlugin({
    ...Object.entries(injectedProcessEnvData).reduce(
      (result, [key, value]) => ({
        ...result,
        [`process.env.${key}`]: JSON.stringify(value),
      }),
      {}
    ),
  })
);
const isANAL = process.env.ANAL === '1';
const isDev = process.env.RUN_ENV !== 'prod';

const config = {
  ...basic,

  mode: 'production',

  devtool: false,

  output: {
    path: dirs.dist,
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    publicPath: '/',
    jsonpFunction: `webpackJsonp${appName}`,
    globalObject: 'this',
  },

  optimization: {
    minimize: !isDev,
    // 自动分割公共部分代码
    splitChunks: {
      chunks: 'all',
      name: true,
    },
    runtimeChunk: {
      name: (entrypoint) => {
        return `runtime-${entrypoint.name}`;
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 3,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            // 支持safari
            safari10: true,
          },
          keep_classnames: false,
          keep_fnames: false,
          output: {
            ecma: 5,
            comments: false,
            // 关闭的时候对emoji有影响
            ascii_only: true,
          },
        },
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parse: SafePostCssParser,
          map: false,
          cssProcessorPluginOptions: {
            preset: ['default', { minifyFontValues: { removeQuotes: false } }],
          },
        },
      }),
    ],
  },

  plugins: plugins.concat(
    [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].chunk.css',
      }),
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      isANAL &&
        new BundleAnalyzerPlugin({
          analyzerPort: 8088,
          openAnalyzer: false,
        }),
      new CopyPlugin([]),
    ].filter(Boolean)
  ),
};

module.exports = config;
