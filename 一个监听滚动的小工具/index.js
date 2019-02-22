'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/TinyScrollListener.min.js');
} else {
  module.exports = require('./dist/TinyScrollListener.js');
}