let path = require('path')
let glob = require('glob')
let mock = require('./src/mock/index.json');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = {};
	glob.sync(globPath).forEach(function(entry) {
		var tmp = entry.split('/').splice(-3);
		entries[tmp[1]] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.js',
			template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.html',
			filename: tmp[1]
		};
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.html');
console.log(pages)
//配置end

module.exports = {
	lintOnSave: false, //禁用eslint
	baseUrl: process.env.NODE_ENV === "production" ? 'https://www.baidu.com/' : '/',
	productionSourceMap: false,
	pages,
	devServer: {
		index: '/', //默认启动serve 打开page1页面
		open: process.platform === 'darwin',
		host: '',
		port: 9527,
		https: false,
		hotOnly: false,
		proxy: {
			'/xrf/': {
				target: 'http://reg.tool.hexun.com/',
				changeOrigin: true,
				pathRewrite: {
					'^/xrf': ''
				}
			},
		}, // 设置代理
		before: app => {     //mock数据
			app.get('/', (req, res, next) => {
				for(let i in pages){
					res.write(`<a target="_self" href="/${i}">/${i}</a></br>`);
				}
				res.end()
			});
			app.get('/goods/list', (req, res, next) => {
				res.status(299).json(mock)
			})
		}
	},
	chainWebpack: config => {
		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => {
				// 修改它的选项...
				options.limit = 100
				return options
			})
		Object.keys(pages).forEach(entryName => {
			config.plugins.delete(`prefetch-${entryName}`);
		});
		if(process.env.NODE_ENV === "production") {
			config.plugin("extract-css").tap(() => [{
				path: path.join(__dirname, "./dist"),
				filename: "css/[name].[contenthash:8].css"
			}]);
		}
	},
	configureWebpack: config => {
		//		if(process.env.NODE_ENV === "production") {
		//			config.output = {
		//				path: path.join(__dirname, "./dist"),
		//				filename: "js/[name].[contenthash:8].js"			
		//			};
		//		}
	}
}