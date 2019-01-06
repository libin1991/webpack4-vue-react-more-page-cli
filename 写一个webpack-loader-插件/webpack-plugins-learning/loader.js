module.exports = function(source) {
	this.cacheable && this.cacheable();
	return source;
};

module.exports.pitch = function(req, prev, source) {
	this.cacheable && this.cacheable();
	this.addDependency(this.resourcePath);

	if(this[__dirname] === undefined) {
		console.log('loader is used without its plugin');
	} else {
		this[__dirname](this.resourcePath);
	}
	return '';
};
