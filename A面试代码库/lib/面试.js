1、 快速扰乱数组排序
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.sort(function() {
	return Math.random() - 0.5;
})
console.log(arr);
2、 JS判断设备来源

function deviceType() {
	var ua = navigator.userAgent;
	var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	for(var i = 0; i < len, len = agent.length; i++) {
		if(ua.indexOf(agent[i]) > 0) {
			break;
		}
	}
}
deviceType();
window.addEventListener('resize', function() {
	deviceType();
})

微信的 有些不太一样

function isWeixin() {
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
3、 audio元素和video元素在ios和andriod中实现自动播放
原因： 因为各大浏览器都为了节省流量， 做出了优化， 在用户没有行为动作时（ 交互） 不予许自动播放；

	/
	音频， 写法一 <
	audio src = "music/bg.mp3"
autoplay loop controls > 你的浏览器还不支持哦 < /audio>

	//音频，写法二
	<
	audio controls = "controls" >
	<
	source src = "music/bg.ogg"
type = "audio/ogg" > < /source> <
	source src = "music/bg.mp3"
type = "audio/mpeg" > < /source>
优先播放音乐bg.ogg， 不支持在播放bg.mp3 <
	/audio>

//JS绑定自动播放（操作window时，播放音乐）
$(window).one('touchstart', function() {
	music.play();
})

//微信下兼容处理
document.addEventListener("WeixinJSBridgeReady", function() {
	music.play();
}, false);

//小结
//1.audio元素的autoplay属性在IOS及Android上无法使用，在PC端正常；
//2.audio元素没有设置controls时，在IOS及Android会占据空间大小，而在PC端Chrome是不会占据任何空间；
//3.注意不要遗漏微信的兼容处理需要引用微信JS；
4、 让文本不可复制
	-
	webkit - user - select: none; -
ms - user - select: none; -
moz - user - select: none; -
khtml - user - select: none;
user - select: none;
添加版权信息思路：
1、 答案区域监听copy事件， 并阻止这个事件的默认行为。
2、 获取选中的内容（ window.getSelection()） 加上版权信息， 然后设置到剪切板（ clipboarddata.setData()）。
5、 水平垂直居中
1、 定位 盒子宽高已知， position: absolute;
left: 50 % ;
top: 50 % ;
margin - left: -自身一半宽度;
margin - top: -自身一半高度;

2、 table - cell布局 父级 display: table - cell;
vertical - align: middle;
子级 margin: 0 auto;

3、 定位 + transform;
适用于 子盒子 宽高不定时；（ 这里是本人常用方法）

position: relative / absolute;
/*top和left偏移各为50%*/
top: 50 % ;
left: 50 % ;
/*translate(-50%,-50%) 偏移自身的宽和高的-50%*/
transform: translate(-50 % , -50 % );
注意这里启动了3D硬件加速哦 会增加耗电量的（ 至于何是3D加速 请看浏览器进程与线程篇）

4、 flex 布局
父级：
/*flex 布局*/
display: flex;
/*实现垂直居中*/
align - items: center;
/*实现水平居中*/
justify - content: center;

再加一种水平方向上居中： margin - left: 50 % ;
transform: translateX(-50 % );
5、 改变placeholder的字体颜色
	**
	* 只适用于pc端
input::-webkit - input - placeholder {
	/* WebKit browsers */
	font - size: 14 px;
	color: #333;
    } 
    input::-moz-placeholder { 
        /* Mozilla Firefox 19+ */ 
        font-size:14px;
        color: # 333;
}
input: -ms - input - placeholder {
		/* Internet Explorer 10+ */
		font - size: 14 px;
		color: #333;
    }

