const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { createCompiler, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const { dirs } = require('./webpack/base');
const config = require('./webpack/webpack.dev');
const { PORT, HOST } = require('./config');
const envUrl = require(dirs.root + `/.greatrc.${process.env.RUN_ENV}`);

try {
  const devServerConfigs = {
    hot: true,
    overlay: false,
    quiet: true,
    host: HOST,
    port: PORT,
    historyApiFallback: true,
    contentBase: dirs.dist,
    watchContentBase: true,
    transportMode: 'ws',
    injectClient: false,
    watchOptions: {
      ignored: ignoredFiles(dirs.src)
    },
    proxy: {
      '/api': {
        // target: 'http://52.81.3.63:85',
        target: envUrl.API_HOST,
        // pathRewrite: { '^/api': '/api' },
        changeOrigin: true,
      }
    }
  };

  const appName = require(dirs.package).name;
  const urls = prepareUrls('http', HOST, PORT, '');
  const devSocket = {
    warnings: (warnings) => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
    errors: (errors) => devServer.sockWrite(devServer.sockets, 'errors', errors)
  };

  const compiler = createCompiler({
    appName,
    config,
    webpack,
    urls,
    devSocket
  });
  const devServer = new WebpackDevServer(compiler, devServerConfigs);
  devServer.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
      return console.log(err);
    }
  });
} catch (err) {
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
}
