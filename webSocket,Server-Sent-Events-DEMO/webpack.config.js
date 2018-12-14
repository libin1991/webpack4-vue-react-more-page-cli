const glob = require('glob')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const purifyCSSPlugin = require('purifycss-webpack')
module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/script/main.min.js',
    // publicPath: 'http://127.0.0.1:6788/dist' // 绝对路径
  },
  module: {
    rules: [
      { // es6
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        },
        exclude: /node_modules/
      },
      { // 处理js引入的css
        test: /\.css$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
        /*use: [
          {loader: 'style-loader'},
          {loader: 'css-loader' }
        ]*/
      },
      { // 图片路径
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 800,  // Base64
            name: '/assets/images/[hash].[ext]'
          }
        }]
      },
      { // img标签路径
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      },
      { // sass编译
        test: /\.sass$/,
        use: extractTextWebpackPlugin.extract({
          use: [
            {loader: 'css-loader'}, 
            {loader: 'sass-loader'}
          ],
          fallback: 'style-loader'
        })
      },
      /*{ // C3加前缀
        test: /\.css$/,
        use: extractTextWebpackPlugin.extract({
          use: [
            {loader: 'css-loader' },
            {loader: 'postcss-loader'}
          ],
          fallback: 'style-loader'
        })
      }*/
    ]
  },
  plugins: [
    // 编译html模板
    new htmlWebpackPlugin({
      minify: {
        removeAttributeQuotes: true  // 却掉属性的双引号。
      },
      hash: true, // 混入hash避免缓存JS。
      inject: 'body', 
      template: './src/index.html', //模版
      filename: './index.html'
    }),
    // css独立抽离成文件
    new extractTextWebpackPlugin('./assets/style/style.css'),
    // 忽略无效css
    new purifyCSSPlugin({
       paths: glob.sync(path.join(__dirname, 'src/*.html'))
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'), // server目录
    host: '127.0.0.1',
    compress: true,  // server压缩
    port: 8888,
    hot: true    // 热加载
  }
}