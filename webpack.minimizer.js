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


const shouldUseSourceMap = process.env.NODE_ENV === 'production';


// path to the folder to be copied
const CopyPlugin = new CopyWebpackPlugin({
  patterns: [{ from: path.resolve(__dirname, 'client/pwa'), }],
});


// https://survivejs.com/webpack/styling/autoprefixing/
// exports.autoprefixPlugin = () => new webpack.LoaderOptionsPlugin({
//   options: {
//     postcss: [autoprefixer()]
//   }
// });


const minifyJavaScript = () =>
  new TerserPlugin({
    cache: true,
    parallel: true,
    sourceMap: shouldUseSourceMap, // Must be set to true if using source-maps in production
    terserOptions: {
      // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions,
      ecma: undefined,
      warnings: false,
      parse: { ecma: 8 },
      compress: { ecma: 5, warnings: false, comparisons: false, inline: 2 },
      mangle: true, // Note `mangle.properties` is `false` by default.
      module: false,
      output: { ecma: 5, comments: false, ascii_only: true },
      toplevel: false,
      nameCache: null,
      ie8: false,
      keep_classnames: undefined,
      keep_fnames: false,
      safari10: false,
    }
  });


const minifyCss = () => new OptimizeCSSAssetsPlugin({
  cssProcessorOptions: {
    parser: safePostCssParser,
    map: shouldUseSourceMap ? { inline: false, annotation: true } : false
  }
});


exports.optimization = () => ({
  splitChunks: {
    // chunks: 'all',
    chunks: 'async',
    minSize: 30000,
    // minRemainingSize: 0,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 6,
    maxInitialRequests: 4,
    automaticNameDelimiter: '~',
    cacheGroups: {
      defaultVendors: { test: /[\\/]node_modules[\\/]/, priority: -10 },
      default: { minChunks: 2, priority: -20, reuseExistingChunk: true }
    }
  },
  minimize: true,
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
