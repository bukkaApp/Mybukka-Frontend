/* eslint-disable import/no-extraneous-dependencies */
// https://webpack.js.org/configuration/optimization/
// https://webpack.js.org/guides/tree-shaking/
// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
// const autoprefixer = require('autoprefixer');

require('dotenv').config();// CommonsChunkPlugin

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
/* Import copy-webpack-plugin */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');


const shouldUseSourceMap = process.env.NODE_ENV !== 'production';


// path to the folder to be copied
const CopyPlugin = new CopyWebpackPlugin({
  patterns: [{ from: path.resolve(__dirname, 'client/pwa'), }],
});


const minifyJavaScript = () =>
  new TerserPlugin({
    cache: true,
    parallel: true,
  });


const minifyCss = () => new OptimizeCSSAssetsPlugin({
  cssProcessorOptions: {
    parser: safePostCssParser,
    map: shouldUseSourceMap ? { inline: false, annotation: true } : false
  }
});


exports.optimization = () => ({
  minimize: true,
  splitChunks: {
    // chunks: 'all',
    chunks: 'all',
    minSize: 0,
    maxInitialRequests: 20,
    maxAsyncRequests: 20,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name(module, chunks, cacheGroupKey) {
          const packageName = module.context.match(
            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
          )[1];
          return `${cacheGroupKey}.${packageName.replace('@', '')}`;
        }
      },
      common: {
        minChunks: 2,
        priority: -10
      }
    }
  },
  runtimeChunk: 'single',
  minimizer: [minifyJavaScript(), minifyCss()]
});


exports.plugins = () => ([
  new webpack.HashedModuleIdsPlugin({
    context: __dirname,
    hashFunction: 'sha256',
    hashDigest: 'hex',
    hashDigestLength: 20
  }),
  new CompressionPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: true,
  }),
  new BrotliPlugin({
    filename: '[path].br[query]',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg)$/,
    compressionOptions: { level: 11 },
    threshold: 10240,
    minRatio: 0.7,
    deleteOriginalAssets: true,
  }),
  new CleanWebpackPlugin({ dry: true }),
  CopyPlugin,
]);

exports.rules = () => ([
  { test: /\.gz$/, enforce: 'pre', use: 'gzip-loader' },
]);
