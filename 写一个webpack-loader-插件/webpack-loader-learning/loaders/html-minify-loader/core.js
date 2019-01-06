var loaderUtils = require('loader-utils');
var path = require('path')
var minifyCompilerPath = path.resolve(__dirname, 'html-minify-compiler.js');

module.exports = function (source) {
    var filePath = this.resourcePath;
    var result =
        'module.exports = require(' +
        loaderUtils.stringifyRequest(
        this,
        '!!html-loader!' +
            minifyCompilerPath +
            '?raw!' +
            filePath +
            (this.resourceQuery || '')
        ) +
        ');';
    console.log(result);
    return result;
};
