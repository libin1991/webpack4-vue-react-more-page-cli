var inquirer = require('inquirer');
var ora = require('ora');

const promptList = [{
	type: "checkbox",
	message: "选择颜色:",
	name: "color",
	choices: [
		"red",
		"blur",
		"green",
		"yellow"
	],
	default: ['yellow', 'red'],
	validate: function(answer) {
		if(answer.length == 0) {
			return '一个都没选...';
		}
		return true;
	},
	pageSize: 20 // 设置行数
}];
inquirer.prompt(promptList).then(answers => {

	var spinner = ora('上传中...').start();
	spinner.color = 'red';

	setTimeout(() => {
		//spinner.stop();
		spinner.succeed('上传完成')
		//spinner.fail('出异常了。。。')
		//spinner.warn("警告")
		console.log(answers); // 返回的结果
 	}, 1000);
})