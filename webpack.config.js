const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  entry: "./src/main/index.tsx",
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: "/public/js",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  devServer: {
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true
    },
    static: {
      directory: './public'
    },
    externals: {
      react: "React",
      'react-dom': "ReactDOM"
    },
    port: 8080
  },

  plugins: [
    new CleanWebpackPlugin()
  ]
})