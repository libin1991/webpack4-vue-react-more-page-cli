#!/usr/bin/env node

var program = require('commander');
var argv = require('yargs').argv;
program
	.allowUnknownOption() //取消这个自动报错机制
	.version('0.0.1')
	.description('创建我的命令')
	.option('-r, --resume', '简历')
	.option('-d, --no-database [db]', '自定义数据') //后面可以选择是否跟参数值,no-*时默认值为false
	.option('-m, --mylove [db]', '我的最爱') //后面可以选择是否跟参数值,不加no-*时默认值为true
	.option('-l, --language <lang>', 'JS是我擅长的语言。') //<lang> required参数，使用时后边必须跟参数值, 否则程序会报错
	.action(option => {
        console.log('\n option回调:');
        console.log(JSON.stringify(option));
     })
	.on('--help', function() {
		console.log('---------------------------------------------------------------------------------------------')
		console.log('  自定义的例子: ')
		console.log('')
		console.log('    输出命令  sx -d')
		console.log('    输出命令  sx -l node')
		console.log('')
	})
	.parse(process.argv)

 
if(program.resume) {
	console.log('简历' + program.resume + '这个是我的简历！');
}

if(program.language) console.log('我擅长的语言language: `' + program.language + '`');
if(program.database) console.log('我擅长的数据库`' + program.database + '`');
if(program.mylove) console.log('我的最爱`' + program.mylove + '`');

console.log('\n program回调:');
//console.log(program)
console.log(JSON.stringify(program))

console.log('\n argv回调:');
console.log(JSON.stringify(argv))