const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './demo/src/entry.js'],
  output: {
    path: path.resolve(__dirname, 'demo/dist'),
    filename: 'demo.bundle.js'
  },
  resolve: {
    alias: {
      'vue-daum-map': path.resolve(__dirname, 'src/VueDaumMap.vue')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            esModule: true
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "demo"),
    publicPath: '/dist',
    compress: true,
    port: 8086
  }
};
