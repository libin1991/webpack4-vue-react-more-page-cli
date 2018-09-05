let path = require('path')
let glob = require('glob')
 var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = {},
		basename, tmp, pathname, appname;

	glob.sync(globPath).forEach(function(entry) {
		basename = path.basename(entry, path.extname(entry));
		// console.log(entry)
		tmp = entry.split('/').splice(-3);
		console.log(tmp)
		pathname = basename; // 正确输出js和html的路径

		// console.log(pathname)
		entries[pathname] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js',
			template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
			filename: tmp[2]
		};
	});
	console.log(entries)
	return entries;

}

function resolve(dir) {
	return path.join(__dirname, dir)
}
//let htmls = getEntry('./src/pages/**/*.html');

module.exports = {
	lintOnSave: false, //禁用eslint
	configureWebpack: {
		plugins: [
			process.env.NODE_ENV === "production"?function(){}:new BundleAnalyzerPlugin()
		]
	},
	 
}