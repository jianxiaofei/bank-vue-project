const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const dllPath = 'public/vendor';
module.exports = {
  entry: {
    vendor: ['vue', 'vue-router','axios','vuex'],
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name]_dll_hash.js',
    library: '[name]_[hash]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production',
      },
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'),
      name: '[name]_[hash]',
      content: process.cwd(),
    }),
  ],
}