/* eslint-disable import/no-extraneous-dependencies */
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

const shouldUseSourceMap = process.env.NODE_ENV !== 'production';

exports.minifyJavaScript = () =>
  new TerserPlugin({
    cache: true,
    parallel: true,
    sourceMap: true, // Must be set to true if using source-maps in production
    terserOptions: {
      // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions,
      ecma: undefined,
      warnings: false,
      parse: { ecma: 8 },
      compress: {
        drop_console: true,
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2
      },
      mangle: true, // Note `mangle.properties` is `false` by default.
      module: false,
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true
      },
      toplevel: false,
      nameCache: null,
      ie8: false,
      keep_classnames: undefined,
      keep_fnames: false,
      safari10: false,
    }
  });

exports.minifyCss = () => new OptimizeCSSAssetsPlugin({
  cssProcessorOptions: {
    parser: safePostCssParser,
    map: shouldUseSourceMap
      ? {
        inline: false,
        annotation: true
      }
      : false
  }
});
