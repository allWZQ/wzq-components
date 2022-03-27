const dirs = require('./dirs');
const cssModule = require('./style');
const isDev = process.env.RUN_ENV !== 'prod';

const rules = [
  {
    test: /\.(t|j)sx?$/,
    // include: [dirs.src, dirs.modules],
    include: [new RegExp(
      `node_modules/(?=(${[
        // ref: https://github.com/styleguidist/react-styleguidist/pull/1327
        'acorn-jsx',
        'estree-walker',
        'regexpu-core',
        'unicode-match-property-ecmascript',
        'unicode-match-property-value-ecmascript',
        'react-dev-utils',
        'ansi-styles',
        'ansi-regex',
        'chalk',
        'strip-ansi',
        'js-base64',
        '@ctrl'
      ].join('|')})/).*`
    ), dirs.src],
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          compact: !isDev,
        },
      },
    ],
  },
  {
    test: /\.(json|conf)$/,
    include: dirs.src,
    exclude: /node_modules/,
    loader: 'json-loader'
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          esModule: false,
          limit: 5 * 1000,
          include: dirs.src,
          name: 'images/[path][name].[ext]'
        }
      }
    ]
  },
  {
    test: /\.ejs$/,
    loader: 'ejs-loader',
    options: {
      esModule: false
    }
  },
];

module.exports = {
  strictExportPresence: true,
  rules: rules.concat(cssModule)
};
