const webpack = require('webpack');
const path = require('path');
const htmlWebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
    new MiniCssExtractPlugin(),
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
        options: {
          cacheDirectory: true,
        },
      }
    }, {
      test: /(\.css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
        },
        'postcss-loader'
      ]
    }, {
      test: /(.less)$/,
      use: [
        MiniCssExtractPlugin.loader,
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
    minimizer: [new OptimizeCSSAssetsPlugin({}), new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash:8].js'
  }
}