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