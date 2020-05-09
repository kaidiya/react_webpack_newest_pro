const webpack = require('webpack');
const path = require('path');
const htmlWebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyRightWebpackPlugin = require('./plugin/copyright-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './index.js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      algorithm: path.resolve(__dirname, 'src/js/algorithm'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new htmlWebpackplugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyRightWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [{
      test: /(\.js|\.jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      }
    }, {
      test: /(\.css)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
        },
        'postcss-loader'
      ]
    }, {
      test: /(.less)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            less: {
              javascriptEnabled: true
            },
            plugins: [
              autoprefixer(),
            ]
          },
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            lessOptions: {
              javascriptEnabled: true,
            }
          }
        }
      ]
    }]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash:8].js'
  }
}