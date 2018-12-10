var path = require('path');
var fs = require('fs');
const child = require('child_process')

const exec = function (cmd) {
	var str = child.execSync(cmd)
	return str.toString();
};
// 在83上拉取最新的release_h5
process.chdir('/usr/home/libin16/release_h5');
exec("git pull")
// js推测试cdn
exec("publishs3 movietest  -msg 'publishhall' music/")

// 强行复制html文件
exec("cp -f ~/release_h5/music/*.phtml ~/tingtest2/application/modules/Music/views/asia/mobilepage/");
process.chdir('/usr/home/libin16/tingtest2');
console.log("----")


var result = fs.readdirSync('/usr/home/libin16/tingtest2/application/modules/Music/views/asia/mobilepage/');
console.log(process.cwd())

let baseurl = "/usr/home/libin16/tingtest2/application/modules/Music/views/asia/mobilepage/"

result.forEach(function (val) {
	 
//	let reg = /\.html$/g;
//	var newname=(baseurl+val).replace(reg, '.phtml');
//	console.log(newname);
//	fs.renameSync(baseurl+val, newname); 
	//更新php模板文件
	exec("publish tingtest2 application/modules/Music/views/asia/mobilepage/" + val);
})