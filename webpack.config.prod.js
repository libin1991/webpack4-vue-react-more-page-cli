/* eslint-disable */
const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const HappyPack = require('happypack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin') //显示打包进度条时间
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
	size: os.cpus().length
})

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pageConfig = require('./src/page.config.js');

var CDN = require("./package.json").myConfig.CDN

function resolve(dir) {
	return path.join(__dirname, dir)
}
class ChunksFromEntryPlugin {
	apply(compiler) {
		compiler.hooks.emit.tap('ChunksFromEntryPlugin', compilation => {
			compilation.hooks.htmlWebpackPluginAlterChunks.tap(
				'ChunksFromEntryPlugin',
				(_, {
					plugin
				}) => {
					// takes entry name passed via HTMLWebpackPlugin's options
					const entry = plugin.options.entry;
					const entrypoint = compilation.entrypoints.get(entry);
					return entrypoint.chunks.map(chunk =>
						({
							names: chunk.name ? [chunk.name] : [],
							files: chunk.files.slice(),
							size: chunk.modulesSize(),
							hash: chunk.hash
						})
					);
				}
			);
		});
	}
}

let webpackConfig = {
	mode: 'production',
	// 配置入口  
	entry: {},
	devtool: false,
	// 配置出口  
	output: {
		path: path.join(__dirname, "./dist/"),
		filename: 'js/[name].[hash:7].js',
		publicPath: CDN
	},
	resolve: {
		extensions: [".js", ".css", ".json", ".vue"], //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
		alias: { // 配置别名可以加快webpack查找模块的速度
			vue$: 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},
	module: {
		rules: [{
				test: /\.js$/,
				loader: 'happypack/loader?id=happy-babel-js', // 增加新的HappyPack构建loader
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
				exclude: /node_modules/
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
						}),
						stylus: ExtractTextPlugin.extract({
							use: ['css-loader?minimize&sourceMap=false', "stylus-loader"]
						}),
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
					// min:false,
					min: true,
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
			{
				test: /\.stylus$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader?minimize&sourceMap=false', 'stylus-loader'],
				})
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.ProvidePlugin({

		}),
		new UglifyJsPlugin({
			sourceMap: false,
			parallel: true
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].[hash:7].css'
		}),
		//设置每一次build之前先删除dist  
		new CleanWebpackPlugin(
			['dist/*', ], 　 //匹配删除的文件  
			{
				root: __dirname, //根目录  
				verbose: true, //开启在控制台输出信息  
				dry: false //启用删除文件  
			}
		),
		new HappyPack({
			id: 'happy-babel-js',
			loaders: ['babel-loader?cacheDirectory=true'],
			threadPool: happyThreadPool
		}),
		new ProgressBarPlugin({
			clear: false
		}),
		new ChunksFromEntryPlugin(),
		//默认添加NODE_ENV为production
		new webpack.DefinePlugin({ //默认添加NODE_ENV为production
			"process.env.NODE_ENV": JSON.stringify("production")
		})
	],
	performance: {
		hints: 'warning',
		maxAssetSize: 250000, //单文件超过250k，命令行告警
		maxEntrypointSize: 250000, //首次加载文件总和超过250k，命令行告警
	},
	optimization: {
		minimize: process.env.NODE_ENV === 'production' ? true : false, //是否进行代码压缩 ,取代 new UglifyJsPlugin(/* ... */)
		splitChunks: {
			chunks: "all",   // 必须三选一： "initial" | "all"(默认就是all) | "async" 
			minSize: 30000,  // 最小尺寸，默认0
			minChunks: 1,   // 最小 chunk ，默认1
			maxAsyncRequests: 5,  // 最大异步请求数， 默认1
			maxInitialRequests: 3,   // 最大初始化请求书，默认1
			automaticNameDelimiter: '-',
			name: true,   // 名称，此选项可接收 function
			cacheGroups: {    // key 为entry中定义的 入口名称
				vendors: {   //抽离第三插件
					test: /[\\/]node_modules[\\/]/,  //test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
					chunks:'initial',   // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    name: 'vendor',  // 要缓存的 分隔出来的 chunk 名称 
					priority: -10   //优先级
				},
				commons: {  //抽离公共的js
					name: "commons",
					chunks: "initial",
					minChunks: 2  //只要超出2字节就生成新的公共的包
				}
			}
		}
	}
};

if(pageConfig && Array.isArray(pageConfig)) {
	pageConfig.map(page => {
		webpackConfig.entry[page.name] = `./src/pages/${page.js}`;
		webpackConfig.plugins.push(new HtmlWebpackPlugin({
			filename: path.join(__dirname, `/dist/${page.name}.html`),
			template: path.join(__dirname, `/src/pages/${page.html}`),
			inject: true,
			entry: page.name,
			chunks: [page.name],
			inlineSource: '.(js|css)$',
			// minify:false,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			chunksSortMode: 'dependency'
		}))
	})
}
console.log(process.env.NODE_ENV)
module.exports = webpackConfig;