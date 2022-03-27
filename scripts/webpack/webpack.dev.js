const webpack = require('webpack');
const basic = require('./webpack.base');
const { dirs, pages, injectedParams } = require('./base');
const path = require('path');
const plugins = [].concat(pages);
const define = require(dirs.root + `/.greatrc.${process.env.RUN_ENV}`);
const CopyPlugin = require('copy-webpack-plugin')
let injectedProcessEnvData = {
  ...define,
  ...{
    IS_DEVELOP: !!process.env.IS_DEVELOP,
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

const config = {
  ...basic,

  mode: 'development',

  output: {
    path: dirs.dist,
    publicPath: '/',
    filename: 'js/bundle_[name].js',
  },

  devtool: '#source-map',

  plugins: plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([]),
  ]),
};

module.exports = config;
