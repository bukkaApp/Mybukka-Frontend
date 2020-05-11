require('dotenv').config();

const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const devMode = process.env.NODE_ENV !== 'production';
// const extractTextPlugin = new ExtractTextPlugin('./css/styles.css');
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
  filename: '[name].css',
  chunkFilename: '[id].css',
});

const defineVariablesPlugin = new webpack.DefinePlugin({
  'process.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY),
  'process.env.SECRET': JSON.stringify(process.env.SECRET),
  'process.env.API_SECRET': JSON.stringify(process.env.API_SECRET),
  'process.env.CLOUD_NAME': JSON.stringify(process.env.CLOUD_NAME),
  'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  'process.env.PORT': JSON.stringify(process.env.PORT),
  'process.env.CLOUDINARY_UPLOAD_URL': JSON.stringify(
    process.env.CLOUDINARY_UPLOAD_URL
  ),
  'process.env.CLOUDINARY_UPLOAD_PRESET': JSON.stringify(
    process.env.CLOUDINARY_UPLOAD_PRESET
  )
});

module.exports = {
  entry: [path.join(__dirname, 'client/index.js')],
  devtool: 'eval',
  devServer: {
    contentBase: './client',
    port: 7700,
    hot: true,
    historyApiFallback: true,
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  plugins: [
    MiniCssPlugin,
    HtmlWebpackPluginConfig,
    // extractTextPlugin,
    defineVariablesPlugin,
    ServiceWorkerPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
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
