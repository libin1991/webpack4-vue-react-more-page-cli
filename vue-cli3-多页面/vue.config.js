let path = require('path')
let glob = require('glob')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require('fs-extra')

//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = {};
	glob.sync(globPath).forEach(function(entry) {
		var tmp = entry.split('/').splice(-3);
		console.log(tmp)
		entries[tmp[1]] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/index.js',
			template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
			filename: tmp[1] + '.html'
		};
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.html');
console.log(pages)

module.exports = {
	lintOnSave: false, //禁用eslint
	baseUrl: process.env.NODE_ENV === "production" ? '//my.cdn.com/sxVue/' : '/',
	productionSourceMap: false,
	pages,
	devServer: {
		index: '/', //默认启动serve 打开/页面
		open: process.platform === 'darwin',
		host: '',
		port: 8088,
		https: false,
		hotOnly: false,
		before: app => {
			app.get('/', (req, res, next) => {
				for(let i in pages) {
					res.write(`<a target="_self" href="/${i}.html">/${i}.html</a></br>`);
				}
				res.end()
			});
			app.get('/mock/:goods/:list', (req, res, next) => {  //mock数据
				var json=fs.readJsonSync('./src/mock/index.json')
				var {params,query}=req;
				res.status(299).json({json,params,query}).end();
			})
		}
	},
	chainWebpack: config => {

	},
	configureWebpack: {
		plugins: [
			process.env.NODE_ENV === "production" ? function() {} : new BundleAnalyzerPlugin()
		]
	}
}
