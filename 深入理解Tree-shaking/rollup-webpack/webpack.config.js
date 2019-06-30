var webpack = require('webpack')
var path = require('path')

module.exports = {
  // 入口文件地址，不需要写完，会自动查找
  entry: path.join(__dirname, 'src/main.js'),
  output: {filename: 'webpack.bundle.js'},
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        collapse_vars: true,
        reduce_vars: true
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
