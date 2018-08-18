let path = require('path')
let glob = require('glob')
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = [],
		basename, tmp, pathname, appname;

	glob.sync(globPath).forEach(function(entry) {
		basename = path.basename(entry, path.extname(entry));
		tmp = entry.split('/').splice(-3);
		pathname = basename; // 正确输出js和html的路径
		entries.push({
			js: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js',
			html: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
			name: tmp[2]
		});
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.html');
console.log(pages)

module.exports = pages;