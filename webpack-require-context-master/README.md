# Webpack require context module

#### Api
```javascript
// import plugin
var requireContext = require('webpack-require_context');

// create folder context
var filesContext = require.context('./templates');

// define regular expression options for files names replacement
var replaceFrom = /\.\/(\w+)\.jade/;
var replaceWith = '$1';

// import all files from filesContext and replace files names with regexp
var files = requireContext(filesContext, replaceFrom, replaceWith);
```

#### Examples

Import all files from ```./templates``` folder:
```javascript
var templates = requireContext(require.context('./templates'));

console.log(templates);
// -> {./module.js: function() {}, ./template.jade: function() {}, ...}
```

Import all ```*.jade``` templates from ```./templates``` and format list:
```javascript
let templatesContext = require.context('./templates', true, /\.jade$/);
let templates = requireContext(templatesContext, /\.\/(\w+)\.jade/, '$1');

console.log(templates);
// -> {template: function() {}, template2: function() {}, ...}
```

#### Installation
```javascript
npm i --save-dev webpack-require_context
```
