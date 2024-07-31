const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } },
          { loader: 'sass-loader' }
        ]
      }
    ]
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
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    port: 8080
  },

  plugins: [
    new CleanWebpackPlugin()
  ]
})
