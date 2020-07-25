const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const htmlWebpackplugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../', 'index.js')
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
        process.env.MODE === 'DEVELOP' ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
        },
        'postcss-loader'
      ]
    }, {
      test: /(.less)$/,
      use: [
        process.env.MODE === 'DEVELOP' ? 'style-loader' : MiniCssExtractPlugin.loader,
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
  resolve: {
    extensions: ['.js'],
    alias: {
      algorithm: path.resolve(__dirname, '../', './src/pages/js/algorithm'),
      utils: path.resolve(__dirname, '../', './src/utils'),
    },
  },
  plugins: [
    new htmlWebpackplugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll/vendors.dll.js'),
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll/vendors.manifest.json'),
    }),
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_[hash:8].js',
    publicPath: '/'
  }
}