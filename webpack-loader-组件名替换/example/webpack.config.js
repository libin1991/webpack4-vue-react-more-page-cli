const webpack = require("webpack");

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
        rules: [{
            test: /\.vue$/,
            use: [
                {
                    loader: "html-loader"
                },
                {
                    loader: require.resolve("../index.js"),
                    options: {
                        prefix: true
                    }
                }
            ]
        }]
    }
};


