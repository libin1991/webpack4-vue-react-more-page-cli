const loaderUtils = require('loader-utils');

module.exports = function (source) {
	//way1
	// console.log(source)
	// return source

	//way2
	// const result = source.replace("jackieli","gangan")
	// return result

	//way3 配置参数
	const options = loaderUtils.getOptions(this);
	const result = source.replace("jackieli",options.name)
	console.log(result)
	return result

}