const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { dll_output_path } = require('./build.config')

module.exports = {
  mode: 'production',
  entry: {
    dll_vendor: ['vue', 'vuex', 'vue-router', 'axios'],
  },
  output: {
    path: dll_output_path,
    filename: '[name]_[hash:8].js',
    library: '[name]_lib',
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        test: /antdv\.plugin\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@vue/cli-plugin-babel/preset'],
            plugin: [
              [
                'import',
                {
                  libraryName: 'ant-design-vue',
                  libraryDirectory: 'es',
                  style: 'css',
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.resolve(dll_output_path, 'dll.mainfest.json'),
      context: process.cwd(),
      name: '[name]_lib',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css',
      ignoreOrder: false,
    }),
  ],
}
