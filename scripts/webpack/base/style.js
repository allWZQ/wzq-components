const themes = require('./themes');
const loader = 'style-loader';

module.exports = [
  {
    test: /\.css$/,
    use: [loader, 'css-loader'],
  },
  {
    test: /\.(sa|sc)ss$/,
    use: [
      loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: true,
          modules: {
            localIdentName: '[local]__[name]-[hash:base64:4]',
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          implementation: require('sass'),
        },
      },
    ],
  },
  {
    test: /\.less$/,
    use: [
      loader,
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            modifyVars: themes,
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
];
