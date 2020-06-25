require('dotenv').config();// CommonsChunkPlugin

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

require('@babel/polyfill');

const MinimizerPlugin = require('./webpack.minimizer');

const isProd = process.env.NODE_ENV === 'production';

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  inject: 'body',
});

const ServiceWorkerPlugin = new ServiceWorkerWebpackPlugin({
  entry: path.join(__dirname, 'src/sw.js'),
  excludes: ['**/.*', '**/*.map', '*.html'],
});

const MiniCssPlugin = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  ignoreOrder: true,
  filename: '[name].[contenthash].css',
  chunkFilename: '[id].css',
});

const defineVariablesPlugin = new webpack.DefinePlugin({
  'process.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY),
  'process.env.SECRET': JSON.stringify(process.env.SECRET),
  'process.env.API_SECRET': JSON.stringify(process.env.API_SECRET),
  'process.env.CLOUD_NAME': JSON.stringify(process.env.CLOUD_NAME),
  'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  'process.env.PORT': JSON.stringify(process.env.PORT),
  'process.env.BACKEND_PROD_URL': JSON.stringify(process.env.BACKEND_PROD_URL),
  'process.env.FACEBOOK_CLIENT_ID': JSON.stringify(process.env.FACEBOOK_CLIENT_ID),
  'process.env.CLOUDINARY_UPLOAD_URL': JSON.stringify(
    process.env.CLOUDINARY_UPLOAD_URL
  ),
  'process.env.CLOUDINARY_UPLOAD_PRESET': JSON.stringify(
    process.env.CLOUDINARY_UPLOAD_PRESET
  ),
});

module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname, 'client/index.js')],
  // devtool: isProd ? undefined : 'eval',
  // devtool: 'source-map',
  devServer: {
    contentBase: './client',
    port: 7700,
    hot: true,
    historyApiFallback: true,
    compress: true
  },
  performance: {
    hints: false
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  optimization: MinimizerPlugin.optimization(),
  plugins: [
    ...(isProd ? MinimizerPlugin.plugins() : []),
    MiniCssPlugin,
    HtmlWebpackPluginConfig,
    defineVariablesPlugin,
    ServiceWorkerPlugin,
  ],
  module: {
    rules: [
      ...(isProd ? MinimizerPlugin.rules() : []),
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          envName: isProd ? 'production' : 'development'
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|gif|png|PNG|svg)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(mp3)$/,
        loader: 'file-loader?name=sounds/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Features: path.resolve(__dirname, 'src/features'),
      Icons: path.resolve(__dirname, 'src/components/icons'),
      Redux: path.resolve(__dirname, 'src/redux'),
      Utilities: path.resolve(__dirname, 'src/utils'),
      Hooks: path.resolve(__dirname, 'src/hooks'),
    },
  },
};

if (!isProd) {
  module.exports.devtool = 'eval';
}
