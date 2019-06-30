var webpack = require('webpack')
var path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            'env',
          ],
          plugins: [
            // 插件：不使用插件打包注释掉该行即可
            ['my-import', { libararyName: 'element-ui' }]
          ]
        }
      }
    }]
  }
};