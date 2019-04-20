var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var env = process.env.WEBPACK_ENV;
var name = require("./package.json").name;

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: name + "/" + name + ".js",
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }
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
    new UglifyJSPlugin({ uglifyOptions: {
      compress: {
        warnings: false
      }
    }})
  ],
  devtool: "inline-source-map"
};
