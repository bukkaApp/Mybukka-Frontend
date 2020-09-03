require('dotenv').config();// CommonsChunkPlugin

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* Import copy-webpack-plugin */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinimizerPlugin = require('./webpack.minimizer');

const CopyPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      // path to the folder to be copied
      from: path.resolve(__dirname, 'client/pwa'),
    },
  ],
});

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
  chunkFilename: './styles/[id].css',
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

const shouldUseSourceMap = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: [path.join(__dirname, 'client/index.js')],
  // devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval',
  // entry: ['@babel/polyfill', path.join(__dirname, 'client/index.js')],
  devServer: {
    contentBase: './client',
    port: 7700,
    hot: true,
    historyApiFallback: true,
    compress: true
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `./dependecies/npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
    minimize: true,
    minimizer: [
      MinimizerPlugin.minifyJavaScript(),
      MinimizerPlugin.minifyCss()
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin({
      context: __dirname,
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new CleanWebpackPlugin({ dry: true, }),
    MiniCssPlugin,
    HtmlWebpackPluginConfig,
    defineVariablesPlugin,
    ServiceWorkerPlugin,
    CopyPlugin,
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
        use: [{
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

if (shouldUseSourceMap) {
  module.exports.devtool = 'eval';
}
