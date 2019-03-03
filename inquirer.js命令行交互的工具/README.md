# Inquirer Checkbox Plus Prompt

A plugin for [Inquirer](https://github.com/SBoudrias/Inquirer.js), similar to the original checkbox with extra features.

[![npm](https://img.shields.io/npm/v/inquirer-checkbox-plus-prompt.svg)](https://www.npmjs.com/package/inquirer-checkbox-plus-prompt)
[![npm](https://img.shields.io/npm/l/inquirer-checkbox-plus-prompt.svg)](https://github.com/faressoft/inquirer-checkbox-plus-prompt/blob/master/LICENSE)

### [控制台的性感字体cfonts](https://www.npmjs.com/package/cfonts) 
### [快速扫描CLI标志和参数](https://www.npmjs.com/package/mri)
### [argv是一个nodejs模块，用于执行命令行参数解析](https://www.npmjs.com/package/argv)
### [clui用于绘制漂亮的命令行表，仪表，微调器和迷你图](https://www.npmjs.com/package/clui)
### [figlet中空字体](https://www.npmjs.com/package/figlet)
### [优雅的终端微调器 对号，加载中等](https://www.npmjs.com/package/ora)
### [puppeteer通过DevTools协议控制无头Chrome的高级AP](https://www.npmjs.com/package/puppeteer)
### [强悍的运行命令ShellJS](https://www.npmjs.com/package/shelljs)
### [SuperAgent是一个轻量级、灵活的、易读的、低学习曲线的客户端请求代理模块](https://www.jianshu.com/p/1432e0f29abd)
### wechaty - 微信操作
### node-schedule - 定时任务
### superagent - 爬取页面信息
### cheerio - 抓取页面
### qrcode-terminal - 终端显示二维码
---
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
```js
var inquirer = require('inquirer');
var ora = require('ora');
var chalk = require('chalk');

const boxen = require('boxen');
console.log(boxen('欢迎欢迎，热烈欢迎。。。', {
	padding: 4
}));

const chalkAnimation = require('chalk-animation');
chalkAnimation.rainbow('Lorem ipsum dolor sit amet');

const terminalImage = require('terminal-image');
(async() => {
	console.log(await terminalImage.file('1.png'));
})();

//进度条
//var Gauge = require("gauge")
//var gauge = new Gauge()
//var a = 0;
//var timer = setInterval(() => {
//	a += 0.01;
//	if(a > 1) {
//		clearInterval(timer)
//	}
//	gauge.show("test", a)
//}, 30)

const _cliProgress = require('cli-progress');
const terminal = require('terminal-utilities')
const bar1 = new _cliProgress.Bar({
	//	barCompleteChar: '#',
	//  barIncompleteChar: '.',
	//  fps: 5,
	//  stream: process.stdout,
	//  barsize: 65,
	//  position: 'center'
}, _cliProgress.Presets.shades_classic);
bar1.start(200, 0);
var a = 0
var timer = setInterval(() => {
	a = a + 10
	if(a > 200) {

		bar1.stop();
		//terminal.clear()   //清屏
		clearInterval(timer);
		main();
	}
	bar1.update(a);
}, 300)

function main() {

	const ftpServer = [47, 48, 60, 74, 75, 76, 77, 234];
	inquirer.prompt([{
		type: 'input',
		message: `输入要上传到的FTP服务器(${ftpServer.join(', ')}):`,
		name: 'host',
		default: '',
	}, {
		type: 'input',
		message: '设置一个用户名:',
		name: 'name',
		default: "test_user" // 默认值
	}, {
		type: 'input',
		message: '请输入数字:',
		name: 'phone',
		validate: function(val) {
			if(val.match(/\d{1}/g)) { // 校验位数
				return true;
			}
			return "请输入1位数字";
		}
	}]).then((answer) => {
		console.log(chalk.red(JSON.stringify(answer))); // 返回的结果
		console.log(chalk.blue('Hello') + ' World' + chalk.red('!'))
	})

}
```
# License

This project is under the MIT license.
