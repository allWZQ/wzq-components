const webpack = require('webpack');
const basic = require('./webpack.base');
const { dirs, pages } = require('./base');
const { greatrcProcess } = require('../config');
const plugins = [].concat(pages);
const define = require(dirs.root + `/.greatrc.${process.env.RUN_ENV}`);
let injectedProcessEnvData = {
  ...define,
};
plugins.push(new webpack.DefinePlugin({ ...greatrcProcess(injectedProcessEnvData) }));

const config = {
  ...basic,

  mode: 'development',

  output: {
    path: dirs.dist,
    publicPath: '/',
    filename: 'js/bundle_[name].js',
  },

  devtool: '#source-map',

  plugins: plugins.concat([new webpack.HotModuleReplacementPlugin()]),
};

module.exports = config;
