# Inquirer Checkbox Plus Prompt

A plugin for [Inquirer](https://github.com/SBoudrias/Inquirer.js), similar to the original checkbox with extra features.

[![npm](https://img.shields.io/npm/v/inquirer-checkbox-plus-prompt.svg)](https://www.npmjs.com/package/inquirer-checkbox-plus-prompt)
[![npm](https://img.shields.io/npm/l/inquirer-checkbox-plus-prompt.svg)](https://github.com/faressoft/inquirer-checkbox-plus-prompt/blob/master/LICENSE)

![Demo](/demo.gif?raw=true)

# Installation

```
npm install -g inquirer-checkbox-plus-prompt
```

# Usage

You can name it with any name other than `checkbox-plus`, just change the string `'checkbox-plus'` to anything else.

```js
inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));

inquirer.prompt({
  type: 'checkbox-plus',
  ...
})
```

# Options

Takes `type`, `name`, `message`, `source`[, `filter`, `validate`, `default`, `pageSize`, `highlight`, `searchable`] properties.

The extra options that this plugin provides are:

* **source**: (Function) a method that called to return a promise that should be resolved with a list of choices in a similar format as the `choices` option in the original `checkbox` prompt of `Inquirer`.
* **highlight**: (Boolean) if `true`, the current selected choice gets highlighted. Default: `false`.
* **searchable**: (Boolean) if `true`, allow the user to filter the list. The `source` function gets called everytime the search query is changed. Default: `false`.

# Example

Check [example.js](/example.js?raw=true) for a more advanced example.

```js
var inquirer = require('inquirer');
var fuzzy = require('fuzzy');

inquirer.registerPrompt('checkbox-plus', require('./index'));

var colors = ['red', 'green', 'blue', 'yellow'];

inquirer.prompt([{
  type: 'checkbox-plus',
  name: 'colors',
  message: 'Enter colors',
  pageSize: 10,
  highlight: true,
  searchable: true,
  default: ['yellow', 'red'],
  source: function(answersSoFar, input) {

    input = input || '';

    return new Promise(function(resolve) {

      var fuzzyResult = fuzzy.filter(input, colors);

      var data = fuzzyResult.map(function(element) {
        return element.original;
      });

      resolve(data);
      
    });

  }
}]).then(function(answers) {

  console.log(answers.colors);

});
```

# License

This project is under the MIT license.
