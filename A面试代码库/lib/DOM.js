export default function $(args) {
	return new DOM(args);
}

function DOM(args) {
	// 将elements数组在这里声明，当 new DOM();就会有一份新的数组
	// elements 用来存放 节点数组
	this.elements = [];
	if(typeof args == 'string') {
		// css 模拟  如  $('.cp span').css('color','red');
		// 传进来的 字符串 有包含空格
		if(args.indexOf(' ') != -1) {
			var ele = args.split(' ');
			var childElements = [];
			var node = [];
			for(var i = 0; i < ele.length; i++) {
				if(node.length == 0)
					node.push(document);
				switch(ele[i].charAt(0)) {
					case '#':
						childElements = [];
						childElements.push(this.getId(ele[i].substring(1)));
						node = childElements;
						break;
					case '.':
						childElements = [];
						for(var j = 0; j < node.length; j++) {
							var temps = this.getClassName(ele[i].substring(1), node[j]);
							for(var k = 0; k < temps.length; k++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						break;
					default:
						childElements = [];
						for(var j = 0; j < node.length; j++) {
							// 这里的 node 是上一次的子节点，在这一次变成了父节点来为这次的子节点做遍历！！！
							var temps = this.getTagName(ele[i], node[j]);
							for(var k = 0; k < temps.length; k++) {
								childElements.push(temps[k]);
							}
						}
						// 遍历的子节点变成父节点，供给下一次子节点的子节点用。
						node = childElements;
				}
			}
			this.elements = childElements;
		} else {
			// find 模拟  如  $('.cp')find('span').css('color','red');
			switch(args.charAt(0)) {
				case '#':
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.':
					this.elements = this.getClassName(args.substring(1))
					break;
				default:
					this.elements = this.getTagName(args);
			}
		}
	} else if(typeof args == 'object') {
		// args 是一个对象，对象不存在就是 undefined ，而不是 ‘undefined’，带引号的是对象的类型，
		if(args != undefined) {
			this.elements[0] = args;
		}
	}
}
DOM.prototype.find = function(str) {
	var childElements = [];
	for(var t = 0; t < this.elements.length; t++) {
		switch(str.charAt(0)) {
			case '#':
				// 虽然这么写，但没什么意义，因为 id是唯一的，想得到id不用利用他的父元素再来找id
				childElements.push(this.getId(str.substring(1)));
				break;
			case '.':
				var temp = this.getClassName(str.substring(1), this.elements[t]);
				for(var j = 0; j < temp.length; j++) {
					childElements.push(temp[j]);
				}

				break;
			default:
				var temp = this.getTagName(str, this.elements[t]);
				for(var j = 0; j < temp.length; j++) {
					childElements.push(temp[j]);
				}
		}
	}
	this.elements = childElements;
	return this;
}
// 注意： elements 不能放在 prototype 原型里面，不然参数会共享，
//DOM.prototype.elements = [];
DOM.prototype.getId = function(id) {
	// 创建一个数组 ，用来保存节点，或节点数组
	return document.getElementById(id);
	//this.elements.push(document.getElementById(id));
};
DOM.prototype.getName = function(name) {
	var tags = document.getElementsByName(name);
	for(var t = 0; t < tags.length; t++) {
		//[object HTMLParagraphElement]
		this.elements.push(tags[t]);
	}
};
DOM.prototype.getTagName = function(tagName, parentNode) {
	var node = null;
	var temps = [];
	if(parentNode != undefined) {
		node = parentNode;
		//  node 是 [object HTMLDivElement]  及 id 包含下的 html 片段
	} else {
		node = document;
		//  document   是   [object HTMLDocument]  及所有html 片段  ,typeof document 是 object
	}
	var tags = node.getElementsByTagName(tagName);
	for(var t = 0; t < tags.length; t++) {
		//[object HTMLParagraphElement]
		temps.push(tags[t]);
	}
	return temps;
};
DOM.prototype.getClassName = function(className, parentNode) {
	var node = null;
	var temps = [];
	if(parentNode != undefined) {
		node = parentNode;
		//  node 是 [object HTMLDivElement]  及 id 包含下的 html 片段
	} else {
		node = document;
		//  document   是   [object HTMLDocument]  及所有html 片段  ,typeof document 是 object
	}
	var tags = node.getElementsByClassName(className);
	for(var t = 0; t < tags.length; t++) {
		//[object HTMLParagraphElement]
		if((new RegExp('(\\s|^)' + className + '(\\s|$)')).test(tags[t].className)) {
			temps.push(tags[t]);
		}
	}
	return temps;
};
/**
 * 给节点 添加 class name
 * @param className
 * @returns {DOM}
 */
DOM.prototype.addClass = function(className) {
	for(var i = 0; i < this.elements.length; i++) {
		// 利用正则表达式 判断 添加的 classname 是否已经存在；
		// (\\s|^) 表示 空格或重第一个开始判断， (\\s|$) 表示 空格或 结束
		if(!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
};
DOM.prototype.removeClass = function(className) {
	for(var i = 0; i < this.elements.length; i++) {
		// 先做个正则表达式 判断 是否存在 要替换的 class name ，
		if(this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
			// 如果存在，将 要替换的 name  = 空；再付给 elements[i]
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), '')
		}
	}
	return this;
};
/**
 * 获取 相同 节点 下的 第几个 节点
 *  $().getTagName("p").getElement(1)
 * @param num
 * @returns {DOM}
 */
DOM.prototype.getElement = function(num) {
	var ele = this.elements[num];
	this.elements = [];
	// 清空后 重新赋值 ！！！！
	// 反正 就是 对 elements 进行操作就是了，elements保存了所有节点的信息
	this.elements[0] = ele;
	return this;
};
DOM.prototype.getE = function(num) {
	return this.elements[num];
};
/**
 * 获取 第一个节点
 * @returns {*}
 */
DOM.prototype.firstE = function() {
	return this.elements[0];
};
/**
 * 获取最后一个节点
 * @returns {*}
 */
DOM.prototype.lastE = function() {
	return this.elements[this.elements.length - 1];
};
/**
 * 获取 / 设置 某一个节点的 属性 ，包括自定义属性
 * @param attr
 * @returns {string}
 */
DOM.prototype.arrt = function(attr, value) {
	for(var i = 0; i < this.elements.length; i++) {
		if(arguments.length == 1) {
			return this.elements[i].getAttribute(attr);
		} else if(arguments.length == 2) {
			return this.elements[i].setAttribute(attr, value);
		}
	}
	return this;
};
/**
 * 操作 css
 * @param css_type
 * @param value
 * @returns {DOM}
 */
DOM.prototype.css = function(css_type, value) {
	//  js 调用属性有 两种方法 ，xx.xx 或 xx[xx] ，这里传进的是一个字符串，所以用  xx[xx]
	var tags = this.elements.length;
	for(var t = 0; t < tags; t++) {
		/*// 当只传进一个参数时，css_type，说明目的是为获取css样式，而不是设置，所以返回css 样式
		 // 但这种方法有局限性，只能获取 行内 的 css 样式    <div id="div_id" style="color:red">  div_id  </div>
		 if(arguments.length == 1){
		 return this.elements[t].style[css_type];
		 }*/
		if(typeof css_type == 'object') {
			for(var c in css_type) {
				this.elements[t].style[c] = css_type[c];
			}
		} else {
			//  接下来用第二中方法
			if(arguments.length == 1) {
				return _getStyle(this.elements[t], css_type);
			}
			this.elements[t].style[css_type] = value;
		}
	}
	return this;
};
/**
 * 获取节点元素的 样式 的 值
 * @param element 节点
 * @param attr  样式
 * @returns {*} 样式的值
 */
function _getStyle(element, attr) {

	if(typeof window.getComputedStyle != 'undefined') { // W3C
		return window.getComputedStyle(element, null)[attr];
	} else if(typeof element.currentStyle != 'underfined') { // IE
		return element.currentStyle[attr];
	}
}
/**
 * 获取节点元素的 样式 的 值
 * @param element 节点
 * @param attr  样式
 * @returns {*} 样式的值
 */
DOM.prototype._centerInWindow = function(element, attr) {
	if(typeof window.getComputedStyle != 'undefined') { // W3C
		return window.getComputedStyle(element, null)[attr];
	} else if(typeof element.currentStyle != 'underfined') { // IE
		return element.currentStyle[attr];
	}
};
/**
 * 通过 name 得到表单
 * @param name
 * @returns {DOM}
 */
DOM.prototype.form = function(name) {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i] = this.elements[i][name];
	}
	return this;
};
/**
 * 设置表单字段内容获取
 * @param str
 * @returns {*}
 */
DOM.prototype.value = function(str) {
	for(var i = 0; i < this.elements.length; i++) {
		if(arguments.length == 0) {
			return this.elements[i].value;
		}
		this.elements[i].value = str;
	}
	return this;
};
/**
 *  操作 html
 * @param str
 * @returns {*}
 */
DOM.prototype.html = function(str) {

	for(var t = 0; t < this.elements.length; t++) {

		// 当不传参数 直接 调用 .html（） 时，就 将原本的 innerHTML 返回，而不是设置 innerHTML；
		// 如  $().getTagName("p").html() ；
		if(arguments.length == 0) {
			return this.elements[t].innerHTML;
		}
		// 当有参数时 设置  innerHTML = str;
		this.elements[t].innerHTML = str;
	}
	return this;
};
DOM.prototype.click = function(fun) {
	for(var t = 0; t < this.elements.length; t++) {
		this.elements[t].onclick = fun;
	}
	return this;
};
/**
 * 鼠标的 移入 移出 事件
 * @param over
 * @param out
 * @returns {DOM}
 */
DOM.prototype.hover = function(over, out) {
	for(var t = 0; t < this.elements.length; t++) {
		this.elements[t].onmouseover = over;
		this.elements[t].onmouseout = out;
	}
	return this;
};
/**
 *  将元素  显示 display = "block"
 * @returns {DOM}
 */
DOM.prototype.show = function() {
	for(var t = 0; t < this.elements.length; t++) {
		this.elements[t].style.display = "block";
	}
	return this;
};
/**
 * 将元素 隐藏  display = "none"
 * @returns {DOM}
 */
DOM.prototype.hide = function() {
	for(var t = 0; t < this.elements.length; t++) {
		this.elements[t].style.display = "none";
	}
	return this;
};
/**
 * 设置 div 在 当前窗口的 居中 位置
 * @param width   div 的 宽
 * @param heigh   div 的 高
 * @returns {DOM}
 */
DOM.prototype.centerInWindow = function(width, heigh) {
	var top = (getInner().height - heigh) / 2 + getScroll().top;
	var left = (getInner().width - width) / 2 + getScroll().left;

	for(var t = 0; t < this.elements.length; t++) {
		this.elements[t].style.top = top + "px";
		this.elements[t].style.left = left + "px";
	}
	return this;
};
/**
 * 浏览器 窗口 大小 改变是事件
 * @param fun  事件的方法
 * @returns {DOM}
 */
DOM.prototype.windowResize = function(fun) {
	for(var t = 0; t < this.elements.length; t++) {
		var ele = this.elements[i];
		_addEvent(window, 'resize', function() {
			fun();
			if(ele.offsetLeft > getInner().width + getScroll().left - ele.offsetWidth) {
				ele.style.left = getInner().width + getScroll().left - ele.offsetWidth + 'px';
				if(ele.offsetLeft <= 0 + getScroll().left) {
					ele.style.left = 0 + getScroll().top + 'px';
				}
			}
			if(ele.offsetTop > getInner().height + getScroll().top - ele.offsetHeight) {
				ele.style.top = getInner().height + getScroll().top - ele.offsetHeight + 'px';
				if(ele.offsetTop <= 0 + getScroll().top) {
					ele.style.top = 0 + getScroll().top + 'px';
				}
			}
		})
	}
	return this;
};
/**
 * 将屏幕完全遮住的功能，如登陆弹窗，需要将背景置灰色透明
 * 用法  $().getId("screen")。screenLock（）;
 *
 * @returns {DOM}
 */
DOM.prototype.screenLock = function() {
	for(var t = 0; t < this.elements.length; t++) {
		fixedScroll.top = getScroll().top;
		fixedScroll.left = getScroll().left;
		// 将 宽度 和 高度 设为 当前窗口的 大小
		this.elements[t].style.height = getInner().height + getScroll().top + 'px';
		this.elements[t].style.width = getInner().width + getScroll().left + 'px';
		this.elements[t].style.display = "block";
		document.documentElement.style.overflow = 'hidden';

		_addEvent(this.elements[i], 'mousedown', predef);
		_addEvent(this.elements[i], 'mouseup', predef);
		_addEvent(this.elements[i], 'selectsart', predef);
		_addEvent(window, 'scroll', fixedScroll);
	}
	return this;
};
/**
 * 关闭屏幕遮住功能，配合  screenLock（） 方法使用
 * @returns {DOM}
 */
DOM.prototype.screenUnLock = function() {
	for(var t = 0; t < this.elements.length; t++) {
		this.elements[t].style.display = "none";
		document.documentElement.style.overflow = 'auto';

		_removeEvent(this.elements[i], 'mousedown', predef);
		_removeEvent(this.elements[i], 'mouseup', predef);
		_removeEvent(this.elements[i], 'selectsart', predef);
		_removeEvent(window, 'scroll', fixedScroll);
	}
	return this;
};
/**
 * 给一个 元素添加动画
 * 如  $('#divId').animate('left',10,700,1000);
 * @param attr 样式 ，一般是 left 或 top
 * @param step 移动的距离
 * @param target 移动的终点
 * @param t 每次移动的毫秒
 */
DOM.prototype.animate = function(obj) {
	for(var i = 0; i < this.elements.length; i++) {
		var ele = this.elements[i];
		var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : 'left'; // 给一个默认值，默认 动画左右移动
		var start = obj['start'] != undefined ? obj['start'] : _getStyle(ele, attr); //默认值 默认节点的位置，
		var t = obj['t'] != undefined ? obj['t'] : 50; // 默认动画为 50 ms
		var step = obj['step'] != undefined ? obj['step'] : 10; //默认移动步长 10px
		var target = obj['alter'] + start; // 必选值
		if(step > target)
			step = -step;
		ele.style[attr] = start + 'px';
		clearInterval(window.time);
		var nowPosition = 0;
		var time = setInterval(function() {

			nowPosition = parseInt(_getStyle(ele, attr));
			ele.style[attr] = nowPosition + step + "px";
			// if 判断 放在赋值的后面，会减掉多出来的一个节拍！！
			if(step > 0 && nowPosition >= target) {
				ele.style[attr] = target + 'px';
				clearInterval(time);
			} else if(step < 0 && nowPosition <= target) {
				ele.style[attr] = target + 'px';
				clearInterval(time);
			}
		}, t);
	}
};
/**
 *  插件接口  ，当一些比较不经常用的东西可以以插件的形式载入，避免 zDOM 文件冗余
 *  <script type="text/javascript" src="../js/zDOM_drag.js"></script>
 *  例如 一个 zDOM_drag.js 插件，利用下面函数将插件的 内容加载到 原型函数中
 * @param name   插件函数名
 * @param fun    插件方法
 */
DOM.prototype.extend = function(name, fun) {
	DOM.prototype[name] = fun;
};
/**
 * 设置事件发生器，绑定所有节点的事件，给所有节点添加事件
 * @param event
 * @param fun
 * @returns {DOM}
 */
DOM.prototype.bind = function(event, fun) {
	for(var t = 0; t < this.elements.length; t++) {
		_addEvent(this.elements[t], event, fun);
	}
	return this;
};
/**
 * 封装现代事件 ，因为 存在 IE 的兼容问题，所以在 else 的 地方处理的比较麻烦
 * 添加事件
 * @param obj   元素节点，需要注册事件的 节点
 * @param type  事件类型 click 或 movie
 * @param fun   处理事件的方法
 * @returns {boolean}
 */
function _addEvent(obj, type, fun) {
	if(typeof obj.addEventListener != "undefined") {
		obj.addEventListener(type, fun, false);
	} else {
		// IE 的 现代事件绑定有很多漏洞，所以用原始的事件绑定模拟 现代事件绑定
		//创建一个存放事件的哈希表
		if(!obj.events)
			obj.events = {};
		// 第一次执行时
		if(!obj.events[type]) {
			// 创建一个存放事件处理函数的数组
			obj.events[type] = [];
			// 把第一次事件处理函数添加到第一个位置
			if(obj['on' + type])
				obj.events[type][0] = fun;
		} else {
			// 判断比较是否传进了重复的点击事件，是的话不做处理，跳过
			if(_addEvent.equal(obj.events[type], fun))
				return false;
		}
		// 从第二次开始用事件计数器来存储
		obj.events[type][_addEvent.ID++] = fun;
		// 执行事件处理函数
		obj['on' + type] = _addEvent.exec;
	}
}
// 直接 var ID =  1  为什么不行，因为全局变量是魔鬼 ID是给 addEvent用的，就应该是addEvent的变量
_addEvent.ID = 1;
// 执行事件处理函数
_addEvent.exec = function(e) {
	var e = event || _addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for(var i in es) {
		es[i].call(this, e);
	}
}
_addEvent.equal = function(es, fun) {
	for(var i in es) {
		if(es[i] == fun)
			return true;
	}
	return false;
}
// 把IE 常用的 Event 对象 配对到 W3C 中去 ， 其实也就是 重写 IE 的 默认方法
_addEvent.fixEvent = function(e) {
	//e.preventDefault() 是 w3c 的 方法
	e.preventDefault = _addEvent.fixEvent.preventDefault;
	e.stopPropagation = _addEvent.fixEvent.stopPropagation;
	return e;
}
// IE 阻止默认行为
_addEvent.fixEvent.preventDefault = function() {
	// e.returnValue = false; 是 IE 的 方法
	this.returnValue = false;
}
// IE 取消冒泡
_addEvent.fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
}
/**
 *  移除 事件
 * @param obj   要移除的元素节点，需要移除事件的 节点
 * @param type  事件类型 click 或 movie
 * @param fun   处理事件的方法
 */
function _removeEvent(obj, type, fun) {
	if(typeof obj.removeEventListener != "undefined") {
		obj.removeEventListener(type, fun, false);
	} else {
		for(var i in obj.events[type]) {
			if(obj.events[type][i] == fun) {
				delete obj.events[type][i];
			}
		}
	}
}
/**
 *  跨浏览器获取视口大小
 * @returns {*}
 */
DOM.prototype.getInner = function() {
	if(typeof window.innerWidth != 'undefined') {
		// 直接 返回一个 对象  ，掉调调；
		return {
			width: window.innerWidth, // google 和 IE
			height: window.innerHeight //  在这种 方法下 火狐 有白边，滚动条的白边
		}
	} else {
		return {
			width: document.documentElement.clientWidth, // google  Fixfox
			height: document.documentElement.clientHeight
		}
	}
};
/**
 * 获得 浏览器滚动条的距离
 * @returns {{top: number, left: number}}
 */
DOM.prototype.getScroll = function() {
	return {
		top: document.documentElement.scrollTop || document.body.scrollTop,
		left: document.documentElement.scrollLeft || document.body.scrollLeft
	}
};
/**
 * 删除前后空格
 * @param str
 * @returns {string|void|XML|*}
 */
DOM.prototype.trim = function(str) {
	return str.replace("/(^\s*)|(\s*$)/g,");
};

/**
 * 跨浏览器 获取 html 文本
 * @param element
 * @returns {string}
 */
DOM.prototype.getInnerText = function(element) {
	return(typeof element.textContent == 'strign') ? element.textContent : element.innerText;
};
/**
 * 跨浏览器 设置 html 文本
 * @param element
 * @param text
 */
DOM.prototype.setInnerText = function(element, text) {
	if(typeof element.textContent == 'string') {
		element.textContent = text;
	} else {
		element.innerText = text;
	}
};
/**
 * 某 一个值是否存在某一个数组中
 * 如 var arr = [12,323,43,434,54,5];
 * inArray(arr,666);  返回 false；
 * @param array
 * @param value
 * @returns {boolean}
 */
DOM.prototype.inArray = function(array, value) {
	for(var i in array) {
		if(array[i] === value) return true;
	}
	return false;
};
/**
 * 获取某一元素到最外层顶点的距离
 * @param ele  元素
 * @returns {number|Number}  顶点距离
 */
DOM.prototype.offsetTop = function(ele) {
	var top = ele.offsetTop;
	var parent = ele.offsetParent;
	while(parent != null) {
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
};
/**
 * 得到上一个 节点的 索引
 * 比如 ,<ul  下面有好几个  <li   ，得到当前 li 的 上一个 li
 * @param current
 * @param parent
 * @returns {number}
 */
DOM.prototype.pervIndex = function(current, parent) {
	var length = parent.children.length;
	if(current == 0) {
		return length - 1;
	}
	return parseInt(current) - 1;
};
/**
 * 得到下一个 节点的 索引
 * 比如 ,<ul  下面有好几个  <li   ，得到当前 li 的 下一个 li
 * @param current
 * @param parent
 * @returns {*}
 */
DOM.prototype.nextIndex = function(current, parent) {
	var length = parent.children.length;
	if(current == length) {
		return 0;
	}
	return parseInt(current) + 1;
};
/**
 * 滚动条固定到一定位置
 */
DOM.prototype.fixedScroll = function() {
	window.screenTop(fixedScroll().left, fixedScroll().top);
};
/**
 * 阻止浏览器默认行为
 * @param e
 */
DOM.prototype.predef = function(e) {
	e.preventDefault();
};
/**
 * 图片预加载
 * @param obj
 */
DOM.prototype.preprocessorImage = function(obj) {
	var img_array = obj.img_array;
	var images = [];
	for(var i = 0, len = img_array.length; i < len; i++) {
		images.push(new Image());
		images[i].onload = function() {
			console.log('.....dd.');
			obj.callback(this.src);
		};
		console.log('......');
		images[i].src = img_array[i];
	}
};