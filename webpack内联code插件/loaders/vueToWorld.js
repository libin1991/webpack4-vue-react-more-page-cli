// module.exports = function (source) {
// 	const result = source.replace("vue","world")
// 	return result
// }

// const loaderUtils = require('loader-utils');
// module.exports = function (source) {
// 	const options = loaderUtils.getOptions(this);
// 	const result = source.replace("vue",options.name)
// 	return result
// }

//this.callback beta
const loaderUtils = require('loader-utils');
module.exports = function (source) {
	const options = loaderUtils.getOptions(this);
	const result = source.replace("vue",options.name)
	this.callback(null, result)
	return result
}




//this.async() beta 不能正确处理顺序 
//本地是同步 用在 fs 网络请求时候 异步构建不阻塞 打包速度加快

// const loaderUtils = require('loader-utils');
// module.exports = function (source) {
// 	const options = loaderUtils.getOptions(this);
// 	const result = source.replace("vue",options.name)
// 	const callback = this.async();
//     console.log('loader async');
//     callback(null, source);
// 	return result
// }