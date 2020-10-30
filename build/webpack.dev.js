const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const CopyRightWebpackPlugin = require('../plugin/copyright-webpack-plugin');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyRightWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 9910,
    // watchContentBase: true,
    // watchOptions: {
    //   poll: true
    // }
    proxy: {
      '/home': {
        // target: 'http://10.188.40.142:8082',
        // target: 'http://10.188.40.141:8097', // test
        // target: 'http://10.188.40.205:8082', // test
        target: 'http://localhost:9999', // node test
        changeOrigin: true,
      },
    },
  },
}

module.exports = merge(commonConfig, devConfig);