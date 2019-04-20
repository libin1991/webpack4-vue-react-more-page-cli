const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const autoprefixer = require("autoprefixer");
const { CheckerPlugin } = require('awesome-typescript-loader')
const env = process.env.WEBPACK_ENV;
const name = 'scrollView';

module.exports = {
  cache: false,
  entry: {
    main: "./src/index.ts"
  },
  output: {
    path: path.join(__dirname, "docs"),
    filename: name + "/" + name + ".js",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "awesome-typescript-loader"
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: {
                safe: true
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: "sass-loader",
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new MiniCssExtractPlugin({
      filename: name + "/" + name + ".css"
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    })
  ]
};
