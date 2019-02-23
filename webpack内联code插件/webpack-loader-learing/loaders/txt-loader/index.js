const { getOptions } = require('loader-utils');
const validateOptions = require('schema-utils');

const schema = require('./options');

module.exports = function rawLoader(source) {
  const options = getOptions(this) || {};
  console.log("----------------------------------------")
  console.log(options)
  console.log(source+'\n\n123456') 
  console.log("----------------------------------------")
  validateOptions(schema, options, 'Raw Loader');

  const json = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return `module.exports = ${json}`;
};