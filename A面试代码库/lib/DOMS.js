export default class DOMS {

	//检测对象是否有哪个类名
	static hasClass = (obj, classStr) => {
		if(obj.className && this.trim(obj.className, 1) !== "") {
			var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
			return(arr.indexOf(classStr) == -1) ? false : true;
		} else {
			return false;
		}
	}
	//添加类名
	static addClass = (obj, classStr) => {
		if((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
			for(var i = 0, len = obj.length; i < len; i++) {
				if(!this.hasClass(obj[i], classStr)) {
					obj[i].className += " " + classStr;
				}
			}
		} else {
			if(!this.hasClass(obj, classStr)) {
				obj.className += " " + classStr;
			}
		}
	}
	//删除类名
	static removeClass = (obj, classStr) => {
		if((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
			for(var i = 0, len = obj.length; i < len; i++) {
				if(this.hasClass(obj[i], classStr)) {
					var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
					obj[i].className = obj[i].className.replace(reg, '');
				}
			}
		} else {
			if(this.hasClass(obj, classStr)) {
				var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
				obj.className = obj.className.replace(reg, '');
			}
		}
	}
	//替换类名("被替换的类名","替换的类名")
	static replaceClass = (obj, newName, oldName) => {
		this.removeClass(obj, oldName);
		this.addClass(obj, newName);
	}
	//获取兄弟节点
	//ecDo.siblings(obj,'#id')
	static siblings = (obj, opt) => {
		var a = []; //定义一个数组，用来存o的兄弟元素
		var p = obj.previousSibling;
		while(p) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
			if(p.nodeType === 1) {
				a.push(p);
			}
			p = p.previousSibling //最后把上一个节点赋给p
		}
		a.reverse() //把顺序反转一下 这样元素的顺序就是按先后的了
		var n = obj.nextSibling; //再取o的弟弟
		while(n) { //判断有没有下一个弟弟结点 n是nextSibling的意思
			if(n.nodeType === 1) {
				a.push(n);
			}
			n = n.nextSibling;
		}
		if(opt) {
			var _opt = opt.substr(1);
			var b = []; //定义一个数组，用于储存过滤a的数组
			if(opt[0] === '.') {
				b = a.filter(function(item) {
					return item.className === _opt
				});
			} else if(opt[0] === '#') {
				b = a.filter(function(item) {
					return item.id === _opt
				});
			} else {
				b = a.filter(function(item) {
					return item.tagName.toLowerCase() === opt
				});
			}
			return b;
		}
		return a;
	}
	//设置样式
	static Css = (obj, json) => {
		for(var attr in json) {
			obj.style[attr] = json[attr];
		}
	}
	//设置文本内容
	static html = (obj) => {
		if(arguments.length === 1) {
			return obj.innerHTML;
		} else if(arguments.length === 2) {
			obj.innerHTML = arguments[1];
		}
	}
	static text = (obj) => {
		if(arguments.length === 1) {
			return obj.innerHTML;
		} else if(arguments.length === 2) {
			obj.innerHTML = this.filterStr(arguments[1], 'html');
		}
	}
	//显示隐藏
	static show = (obj) => {
		var blockArr = ['div', 'li', 'ul', 'ol', 'dl', 'table', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'header', 'footer', 'details', 'summary', 'section', 'aside', '']
		if(blockArr.indexOf(obj.tagName.toLocaleLowerCase()) === -1) {
			obj.style.display = 'inline';
		} else {
			obj.style.display = 'block';
		}
	}
	static hide = (obj) => {
		obj.style.display = "none";
	}

}