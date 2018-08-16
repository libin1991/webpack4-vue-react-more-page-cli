/**
 * SB基础公共类
 */
export default class SB {
	//获取CSS样式
	function getStyle(obj, attr) {
		if(obj.currentStyle) {
			return obj.currentStyle[attr]; //IE678
		} else {
			return window.getComputedStyle(obj, null)[attr];
		}
	}
	//数组乱序
	static shuffle => (arr) {
		let length = arr.length,
			r = length,
			rand = 0;

		while(r) {
			rand = Math.floor(Math.random() * r--);
			[arr[r], arr[rand]] = [arr[rand], arr[r]];
		}

		return arr;
	}
	static randArr => (arr) {
		return arr.sort(() => {
			return(Math.random() - 0.5);
		});
	}

	//判断元素是否在可视区域
	static isElementInViewport = (el) => {
		var rect = el.getBoundingClientRect();
		return(
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
			rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
		);
	}

	/*------------------------------------------*/
	export function getRect(el) {
		if(el instanceof window.SVGElement) {
			var rect = el.getBoundingClientRect()
			return {
				top: rect.top,
				left: rect.left,
				width: rect.width,
				height: rect.height
			}
		} else {
			return {
				top: el.offsetTop,
				left: el.offsetLeft,
				width: el.offsetWidth,
				height: el.offsetHeight
			}
		}
	}
	/*------------------------------------------*/
	/*------------------------------------------*/
	static offset = (el) => {
		let left = 0
		let top = 0

		while(el) {
			left -= el.offsetLeft
			top -= el.offsetTop
			el = el.offsetParent
		}

		return {
			left,
			top
		}
	}
	/*------------------------------------------*/
	//获取元素的位置大小
	static getPosition = function(node) {

		var width = node.offsetWidth; //元素宽度
		var height = node.offsetHeight; //元素高度
		var left = node.offsetLeft; //获取元素相对于其根元素的left值var left
		var top = node.offsetTop; //获取元素相对于其根元素的top值var top
		var current = node.offsetParent; // 取得元素的offsetParent

		// 一直循环直到根元素　　
		while(current != null) {　　
			left += current.offsetLeft;　　
			top += current.offsetTop;　　
			current = current.offsetParent;　　
		}
		return {
			"width": width,
			"height": height,
			"left": left,
			"top": top
		};
	}
	//函数节流
	static delayFn2 = (fn, delay, mustDelay) => {
		var timer = null;
		var t_start;
		return function() {
			var context = this,
				args = arguments,
				t_cur = +new Date();
			//先清理上一次的调用触发（上一次调用触发事件不执行）
			clearTimeout(timer);
			//如果不存触发时间，那么当前的时间就是触发时间
			if(!t_start) {
				t_start = t_cur;
			}
			//如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
			if(t_cur - t_start >= mustDelay) {
				fn.apply(context, args);
				t_start = t_cur;
			}
			//否则延迟执行
			else {
				timer = setTimeout(function() {
					fn.apply(context, args);
				}, delay);
			}
		};
	}
	/**
	 * 保留中文
	 *
	 * var a = '中文zhongwen'
	 * _.getCN(a) => '中文'
	 *
	 */
	static getCN = function(text) {
		var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
		return text.replace(regEx, '');
	};

	//去除元素内所有内容 strIds："#id1,#id2,#id3"
	static emptyHtml = (strIds) => {
		try {
			var ids = strIds.trim(",").split(",");
			$(ids).each(function() {
				var obj = $(this.toString());
				if(obj.length > 0) {
					$(obj).each(function() {
						$(this).html("");
					});
				} else {
					obj.html("");
				}
			});
		} catch(ex) {
			if(PublicUtil.isDebug()) {
				throw new Error("js方法：【PublicUtil.emptyHtml(strIds)】，error！");
			}
		}
	};

	/**
	 * 将阿拉伯数字转为汉字数字
	 *
	 * var a = 2016  
	 * exNum(a) => 二零一六
	 *
	 */
	static exNum = function(text) {
		var charArr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
			num = this.isNumber(text) ? text.toString() : this.getNum(text),
			numArr = num.split(''),
			len = numArr.length,
			result = '';

		for(var i = 0; i < len; i++) {
			result += charArr[parseInt(numArr[i])];
		}

		return result;
	};
	//生成范围随机数
	static roundNum = function(start, end) {
		return Math.floor(Math.random() * (end - start) + start);
	};
	/**
	 * 保留数字
	 *
	 * var a = 'a1b2c3';
	 * _.getNum(a) => '123'
	 *
	 */
	static getNum = function(text) {
		var regEx = /[^\d]/g;
		return parseInt(text.replace(regEx, ''));
	};
	//随机验证码  [num：验证码位数]
	static getCode = function(num) {
		var arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			arr2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
			arr3 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			arr = arr1.concat(arr2, arr3),
			length = arr.length,
			res = '';

		for(var i = 0; i < num; i++) {
			var charIndex = this.roundNum(0, length);
			res += arr[charIndex];
		}
		return res;
	};

	/**
	 * 
	 * @desc 生成指定范围随机数
	 * @param  {Number} min 
	 * @param  {Number} max 
	 * @return {Number} 
	 */
	static randomNum = (min, max) => {
		return Math.floor(min + Math.random() * (max - min));
	}

	/**
	 * 
	 * @desc   现金额转大写
	 * @param  {Number} n 
	 * @return {String}
	 */
	static digitUppercase = (n) => {
		var fraction = ['角', '分'];
		var digit = [
			'零', '壹', '贰', '叁', '肆',
			'伍', '陆', '柒', '捌', '玖'
		];
		var unit = [
			['元', '万', '亿'],
			['', '拾', '佰', '仟']
		];
		var head = n < 0 ? '欠' : '';
		n = Math.abs(n);
		var s = '';
		for(var i = 0; i < fraction.length; i++) {
			s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
		}
		s = s || '整';
		n = Math.floor(n);
		for(var i = 0; i < unit[0].length && n > 0; i++) {
			var p = '';
			for(var j = 0; j < unit[1].length && n > 0; j++) {
				p = digit[n % 10] + unit[1][j] + p;
				n = Math.floor(n / 10);
			}
			s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
		}
		return head + s.replace(/(零.)*零元/, '元')
			.replace(/(零.)+/g, '零')
			.replace(/^整$/, '零元整');
	};

	//现金额大写转换函数
	//ecDo.upDigit(168752632)
	//result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
	//ecDo.upDigit(1682)
	//result："人民币壹仟陆佰捌拾贰元整"
	//ecDo.upDigit(-1693)
	//result："欠人民币壹仟陆佰玖拾叁元整"
	static upDigit = (n) => {
		var fraction = ['角', '分', '厘'];
		var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
		var unit = [
			['元', '万', '亿'],
			['', '拾', '佰', '仟']
		];
		var head = n < 0 ? '欠人民币' : '人民币';
		n = Math.abs(n);
		var s = '';
		for(var i = 0; i < fraction.length; i++) {
			s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
		}
		s = s || '整';
		n = Math.floor(n);
		for(var i = 0; i < unit[0].length && n > 0; i++) {
			var p = '';
			for(var j = 0; j < unit[1].length && n > 0; j++) {
				p = digit[n % 10] + unit[1][j] + p;
				n = Math.floor(n / 10);
			}
			s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
			//s = p + unit[0][i] + s;
		}
		return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
	}

	//随机返回一个范围的数字
	//ecDo.randomNumber(5,10)
	//返回5-10的随机整数，包括5，10
	//ecDo.randomNumber(10)
	//返回0-10的随机整数，包括0，10
	//ecDo.randomNumber()
	//返回0-255的随机整数，包括0，255
	static randomNumber = (n1, n2) => {
		if(arguments.length === 2) {
			return Math.round(n1 + Math.random() * (n2 - n1));
		} else if(arguments.length === 1) {
			return Math.round(Math.random() * n1)
		} else {
			return Math.round(Math.random() * 255)
		}
	}
	//随进产生颜色
	static randomColor = () => {
		//randomNumber是下面定义的函数
		//写法1
		//return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';
		//写法2
		return '#' + Math.random().toString(16).substring(2).substr(0, 6);
		//写法3
		//var color='#',_index=this.randomNumber(15);
		//for(var i=0;i<6;i++){
		//color+='0123456789abcdef'[_index];
		//}
		//return color;
	}
	//这种写法，偶尔会有问题。大家得注意哦
	//Math.floor(Math.random()*0xffffff).toString(16);

	//适配rem
	static getFontSize = (_client) => {
		var doc = document,
			win = window;
		var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function() {
				var clientWidth = docEl.clientWidth;
				if(!clientWidth) return;
				//如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
				if(clientWidth > _client) {
					clientWidth = _client
				}
				//设置根元素font-size大小
				docEl.style.fontSize = 100 * (clientWidth / _client) + 'px';
			};
		//屏幕大小改变，或者横竖屏切换时，触发函数
		win.addEventListener(resizeEvt, recalc, false);
		//文档加载完成时，触发函数
		doc.addEventListener('DOMContentLoaded', recalc, false);
	}

	//图片懒加载 
	//图片没加载出来时用一张图片代替
	static aftLoadImg = (obj, url, errorUrl, cb) => {
		var oImg = new Image(),
			_this = this;
		oImg.src = url;
		oImg.onload = function() {
			obj.src = oImg.src;
			if(cb && _this.istype(cb, 'function')) {
				cb(obj);
			}
		}
		oImg.onerror = function() {
			obj.src = errorUrl;
			if(cb && _this.istype(cb, 'function')) {
				cb(obj);
			}
		}
	}

	//关键词加标签 
	//这两个函数多用于搜索的时候，关键词高亮
	//创建正则字符
	//ecDo.createKeyExp([前端，过来])
	//result:(前端|过来)/g
	static createKeyExp = (strArr) => {
		var str = "";
		for(var i = 0; i < strArr.length; i++) {
			if(i != strArr.length - 1) {
				str = str + strArr[i] + "|";
			} else {
				str = str + strArr[i];
			}
		}
		return "(" + str + ")";
	}

	//关键字加标签,文本高亮（多个关键词用空格隔开）
	//ecDo.findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开','i')
	//"<i>守侯</i>我oaks接到了来自下次你离<i>开</i>快乐吉祥留在<i>开</i>城侯"
	static findKey = (str, key, el) => {
		var arr = null,
			regStr = null,
			content = null,
			Reg = null,
			_el = el || 'span';
		arr = key.split(/\s+/);
		//alert(regStr); //    如：(前端|过来)
		regStr = this.createKeyExp(arr);
		content = str;
		//alert(Reg);//        /如：(前端|过来)/g
		Reg = new RegExp(regStr, "g");
		//过滤html标签 替换标签，往关键字前后加上标签
		content = content.replace(/<\/?[^>]*>/g, '')
		return content.replace(Reg, "<" + _el + ">$1</" + _el + ">");
	}

	//数据类型判断 
	//ecDo.istype([],'array')
	//true
	//ecDo.istype([])
	//'[object Array]'
	static isType = (o, type) => {
		if(type) {
			var _type = type.toLowerCase();
		}
		switch(_type) {
			case 'string':
				return Object.prototype.toString.call(o) === '[object String]';
			case 'number':
				return Object.prototype.toString.call(o) === '[object Number]';
			case 'boolean':
				return Object.prototype.toString.call(o) === '[object Boolean]';
			case 'undefined':
				return Object.prototype.toString.call(o) === '[object Undefined]';
			case 'null':
				return Object.prototype.toString.call(o) === '[object Null]';
			case 'function':
				return Object.prototype.toString.call(o) === '[object Function]';
			case 'array':
				return Object.prototype.toString.call(o) === '[object Array]';
			case 'object':
				return Object.prototype.toString.call(o) === '[object Object]';
			case 'nan':
				return isNaN(o);
			case 'elements':
				return Object.prototype.toString.call(o).indexOf('HTML') !== -1
			default:
				return Object.prototype.toString.call(o)
		}
	}
	//手机类型判断
	static browserInfo = (type) => {
		switch(type) {
			case 'android':
				return navigator.userAgent.toLowerCase().indexOf('android') !== -1
			case 'iphone':
				return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
			case 'ipad':
				return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
			case 'weixin':
				return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
			default:
				return navigator.userAgent.toLowerCase()
		}
	}

	//函数节流
	//多用于鼠标滚动，移动，窗口大小改变等高频率触发事件
	// var count=0;
	// function fn1(){
	//     count++;
	//     console.log(count)
	// }
	// //100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
	// document.onmousemove=ecDo.delayFn(fn1,100,200)
	static delayFn = (fn, delay, mustDelay) => {
		var timer = null;
		var t_start;
		return function() {
			var context = this,
				args = arguments,
				t_cur = +new Date();
			//先清理上一次的调用触发（上一次调用触发事件不执行）
			clearTimeout(timer);
			//如果不存触发时间，那么当前的时间就是触发时间
			if(!t_start) {
				t_start = t_cur;
			}
			//如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
			if(t_cur - t_start >= mustDelay) {
				fn.apply(context, args);
				t_start = t_cur;
			}
			//否则延迟执行
			else {
				timer = setTimeout(function() {
					fn.apply(context, args);
				}, delay);
			}
		};
	}

}

const is = {
	arr: a => Array.isArray(a),
	obj: a => stringContains(Object.prototype.toString.call(a), 'Object'),
	pth: a => is.obj(a) && a.hasOwnProperty('totalLength'),
	svg: a => a instanceof SVGElement,
	dom: a => a.nodeType || is.svg(a),
	str: a => typeof a === 'string',
	fnc: a => typeof a === 'function',
	und: a => typeof a === 'undefined',
	hex: a => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a),
	rgb: a => /^rgb/.test(a),
	hsl: a => /^hsl/.test(a),
	col: a => (is.hex(a) || is.rgb(a) || is.hsl(a))
}

// Colors

function rgbToRgba(rgbValue) {
	const rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
	return rgb ? `rgba(${rgb[1]},1)` : rgbValue;
}

function hexToRgba(hexValue) {
	const rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	const hex = hexValue.replace(rgx, (m, r, g, b) => r + r + g + g + b + b);
	const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	const r = parseInt(rgb[1], 16);
	const g = parseInt(rgb[2], 16);
	const b = parseInt(rgb[3], 16);
	return `rgba(${r},${g},${b},1)`;
}

function hslToRgba(hslValue) {
	const hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
	const h = parseInt(hsl[1]) / 360;
	const s = parseInt(hsl[2]) / 100;
	const l = parseInt(hsl[3]) / 100;
	const a = hsl[4] || 1;

	function hue2rgb(p, q, t) {
		if(t < 0) t += 1;
		if(t > 1) t -= 1;
		if(t < 1 / 6) return p + (q - p) * 6 * t;
		if(t < 1 / 2) return q;
		if(t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	}
	let r, g, b;
	if(s == 0) {
		r = g = b = l;
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	return `rgba(${r * 255},${g * 255},${b * 255},${a})`;
}

function colorToRgb(val) {
	if(is.rgb(val)) return rgbToRgba(val);
	if(is.hex(val)) return hexToRgba(val);
	if(is.hsl(val)) return hslToRgba(val);
}

module.exports = {
	type(ob) {
		return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase()
	},
	isObject(ob, real) {
		if(real) {
			return this.type(ob) === "object"
		} else {
			return ob && typeof ob === 'object'
		}
	},
	isFormData(val) {
		return(typeof FormData !== 'undefined') && (val instanceof FormData);
	},
	trim(str) {
		return str.replace(/(^\s*)|(\s*$)/g, '');
	},
	encode(val) {
		return encodeURIComponent(val)
			.replace(/%40/gi, '@')
			.replace(/%3A/gi, ':')
			.replace(/%24/g, '$')
			.replace(/%2C/gi, ',')
			.replace(/%20/g, '+')
			.replace(/%5B/gi, '[')
			.replace(/%5D/gi, ']');
	},
	formatParams(data) {
		var arr = [];
		for(var name in data) {
			var value = data[name]
			if(this.isObject(value)) {
				value = JSON.stringify(value);
			}
			arr.push(this.encode(name) + "=" + this.encode(value));
		}
		return arr.join("&");
	},

	// 不会覆盖现有属性     merge({"a":100},{"a":{"a":200},"b":400})={"a":100,"b":400}
	merge(a, b) {
		for(var key in b) {
			if(!a.hasOwnProperty(key)) {
				a[key] = b[key]
			} else if(this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
				this.merge(a[key], b[key])
			}
		}
		return a;
	}
}

// 解决键盘弹出后挡表单的问题
window.addEventListener('resize', function() {
	if(
		document.activeElement.tagName === 'INPUT' ||
		document.activeElement.tagName === 'TEXTAREA'
	) {
		window.setTimeout(function() {
			if('scrollIntoView' in document.activeElement) {
				document.activeElement.scrollIntoView();
			} else {
				document.activeElement.scrollIntoViewIfNeeded();
			}
		}, 0);
	}
});