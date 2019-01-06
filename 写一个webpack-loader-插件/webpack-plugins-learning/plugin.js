var fs = require('fs');
var RawSource = require('webpack-core/lib/RawSource');

module.exports = TestPlugin;

function TestPlugin() {
	this.imports = [];
}

TestPlugin.prototype.apply = function(compiler) {
	var imports = this.imports;

	compiler.plugin('this-compilation', function(compilation) {
		compilation.plugin('normal-module-loader', function(loaderContext, module) {
			loaderContext[__dirname] = function(file) {
				if(imports.indexOf(file) === -1) {
					imports.push(file);
				}
			};
		});
	});

	compiler.plugin('after-compile', function(compilation, callback) {
		var filename = 'out.txt';
		var content = imports.map(function(file) {
			return fs.readFileSync(file);
		}).join('\n');
		console.log(content);
		compilation.assets[filename] = new RawSource(content);
		callback();
	});
};