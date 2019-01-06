let path=require("path");
let HtmlWebpackPlugin=require("html-webpack-plugin");
let ExtractTextWebpackPlugin=require("extract-text-webpack-plugin");
let CleanWebpackPlugin=require("clean-webpack-plugin");
let webpack=require("webpack");
let VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports={
    entry:"./src/index.js",
    output:{
        filename:"bundle.[hash:4].js",
        path:path.resolve("dist")
    },
    resolveLoader: {
        modules: [
            path.resolve(__dirname, 'loaders'),
            'node_modules'
        ]
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:ExtractTextWebpackPlugin.extract({
                    use:"css-loader",
                    publicPath:"../"
                })
            },
            {
                test:/\.less$/,
                use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"},
                    {loader:"less-loader"}
                ]
            },
            {
                test:/\.(jpe?g|png|gif)$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:8192,
                            outputPath:"images/"
                        }
                    }
                ]
            },
            {
                test:/\.(htm|html)$/,
                use:"html-withimg-loader"
            },
            {
                test:/\.(eot|ttf|woff|svg)$/,
                use:"file-loader"
            },
            {
                test:/\.js$/,
                include:/src/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-env"]
                    }
                }
            },
            {
                test:/\.vue$/,
                use:"vue-loader"
            },
            {
		        test: /\.txt$/,
		        use: {
		            loader:'txt-loader',
		            options:{
                       
                    }
		        }
		      }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            hash:true
        }),
        new ExtractTextWebpackPlugin("css/style.css"),
        new CleanWebpackPlugin("dist"),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    devServer:{
        contentBase:"./dist",
        host:"localhost",
        port:8888,
        open:true,
        hot:true
    }
};