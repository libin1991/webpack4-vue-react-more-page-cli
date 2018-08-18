/* eslint-disable */
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path')
const fs = require('fs');
 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pageConfig = require('./src/page.config.js');

var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //webpack 启动后自动打开浏览器
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //webpack可视化

var PORT=require("./package.json").myConfig.port

 
 
const isDev = process.env.NODE_ENV === 'development'
console.log(isDev)

function resolve(dir) {
	return path.join(__dirname, dir)
}
let webpackConfig = {
	mode: 'development',
	// 配置入口  
	entry: {},
	// 配置出口  
	output: {
		path: path.join(__dirname, "./dist/"),
		filename: 'js/[name].[hash:7].js',
		publicPath: '/',
	},
	resolve: {
		extensions: [".js", ".css", ".json", ".vue"],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},

	module: {
		rules: [{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: ExtractTextPlugin.extract({
							use: ['css-loader?minimize&sourceMap=false']
						}),
						less: ExtractTextPlugin.extract({
							use: ['css-loader?minimize&sourceMap=false', "less-loader"]
						})
					}
				}
			},
			// html中的img标签
			{
				test: /\.html$/,
				loader: 'html-withimg-loader',
				include: [path.join(__dirname, "./src")],
				options: {
					limit: 10000,
					name: 'img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [path.join(__dirname, "./src")]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'media/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[hash:7].[ext]'
				}
			},

			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader?minimize&sourceMap=false', "postcss-loader"], //这种方式引入css文件就不需要style-loader了
				})

			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader?minimize&sourceMap=false', 'less-loader', "postcss-loader"],
				})
			},
		]
	},

	plugins: [
		new VueLoaderPlugin(),
		new webpack.ProvidePlugin({

		}),
		new ExtractTextPlugin({
			filename: 'css/[name].[hash:7].css'
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:' + PORT
		}), //自动打开浏览器
		new BundleAnalyzerPlugin(),
		//设置每一次build之前先删除dist  
		new CleanWebpackPlugin(
			['dist/*', ], 　 //匹配删除的文件  
			{
				root: __dirname, //根目录  
				verbose: true, //开启在控制台输出信息  
				dry: false //启用删除文件  
			}
		)
	],
	// 起本地服务
	devServer: {
		compress: true, // 服务器返回浏览器的时候是否启动gzip压缩
		contentBase: "./dist/",
		historyApiFallback: true,
		inline: true,
		hot: true,
		overlay: true,
		host: '127.0.0.1',
		port: PORT
	}
};

if(pageConfig && Array.isArray(pageConfig)) {
	pageConfig.map(page => {
		webpackConfig.entry[page.name] = `./${page.js}`;
		webpackConfig.plugins.push(new HtmlWebpackPlugin({
			filename: path.join(__dirname, `/dist/${page.name}`),
			template: path.join(__dirname,  page.html),
			inject: true,
			chunks: [page.name],
			inlineSource: '.(js|css)$',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency'
		}))
	})
}

module.exports = webpackConfig;