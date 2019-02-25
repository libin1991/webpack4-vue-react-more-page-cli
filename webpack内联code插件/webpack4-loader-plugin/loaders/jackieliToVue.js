// module.exports = function (source) {
// 	const result = source.replace("jackieli","vue")
// 	return result
// }


// const loaderUtils = require('loader-utils');
// module.exports = function (source) {
// 	const options = loaderUtils.getOptions(this);
// 	const result = source.replace("jackieli",options.name)
// 	return result
// }

//this.callback beta
//console.log('hello jackieli') == > hello vue
const loaderUtils = require('loader-utils');
module.exports = function (source) {
	const options = loaderUtils.getOptions(this);
	const result = source.replace("jackieli",options.name)
	this.callback(null, result)
	return result
}
