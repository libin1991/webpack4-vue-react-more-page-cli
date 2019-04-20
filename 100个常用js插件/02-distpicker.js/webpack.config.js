var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var env = process.env.WEBPACK_ENV;
var name = require("./package.json").name;

module.exports = {
  entry: {
    [name]: ['./app.js'],
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: name + "/" + name + ".js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ["es2015"]
        },
        include: [path.resolve(__dirname, "../")]
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')({browsers: ['>0.5%']})]
              }
            }, {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(name + "/" + name + ".css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  devtool: "inline-source-map"
};
