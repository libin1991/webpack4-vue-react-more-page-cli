"use strict";

const loaderUtils = require('loader-utils');
const { tag, prefixTag } = require('./tag-map');

function replaceTag(source, tagMap) {
    Object.keys(tagMap).forEach(i => {
        source = source.replace(new RegExp(`<${i}(?!-)`, 'g'), `<${tagMap[i]}`)
            .replace(new RegExp(`<\/${i}>`, 'g'), `<\/${tagMap[i]}>`);
    })
    return source;
}

module.exports = function (source) {
    const options = loaderUtils.getOptions(this);

    this.cacheable();

    let newSource = source;
    newSource = replaceTag(newSource, tag);

    if ('prefix' in options && options.prefix) {
        newSource = replaceTag(newSource, prefixTag);
    }

    return newSource;
};