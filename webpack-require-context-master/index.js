'use strict';

module.exports = function(context, from, to) {
  var templates = {};
  context.keys().forEach(function(key) {
    templates[from && to ? key.replace(from, to) : key] = context(key);
  });

  return templates;
};
