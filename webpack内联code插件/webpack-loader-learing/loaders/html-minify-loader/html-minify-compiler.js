var Minimize = require('minimize');
var loaderUtils = require('loader-utils');

module.exports = function (source) {
    var callback = this.async();
    if (this.cacheable) {
        this.cacheable();
    }
    var opts = loaderUtils.getOptions(this) || {};
    var minimize= new Minimize(opts);
    minimize.parse(source, callback);
}