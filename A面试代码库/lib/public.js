import FastClick from 'fastclick'; //引入快速点击
/*
 * 配置对象
 * @type {Object}
 */
var config = {
	baseHash: '#!',
	pageSize: 10,
	alertTime: '2000', //alert消失的时间
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

/**
 * 数据帮助类
 */
class dataUtil {
	/**
	 * [获取数据方法]
	 * @param  {[type]} url         [访问接口地址]
	 * @param  {[type]} method      [get post]
	 * @param  {[type]} param       [传递过去的参数 字符串格式 如 "clientType='M'&userName='小钱'"]
	 * @param  {[type]} successCall [成功回调函数]
	 * @param  {[type]} errorCall   [错误回调函数]
	 * @return {[type]}             [description]
	 */
	static getData = (info, url, method = 'post', param, successCall = () => {}, errorCall = () => {}) => {
		let obj = {
			clientType: 'M'
		};
		let param2 = Object.assign(obj, param);
		var setting = {
			url: config.baseUrl + url, //默认ajax请求地址
			type: method, //请求的方式
			data: param2, //发给服务器的数据
		};
		//请求成功执行方法
		setting.success = (res, xhr) => {
			dataUtil.successCall(res, xhr, info, successCall);
		}
		//请求失败执行方法
		setting.error = (xhr) => {
			dataUtil.errorCall(xhr, info, errorCall);
		}
		return dataUtil.ajax(setting);
	}
	/**
	 * 发送ajax请求和服务器交互
	 * @param {object} mySetting 配置ajax的配置
	 */
	static ajax = (mySetting) => {
		var setting = {
			url: window.location.pathname, //默认ajax请求地址
			async: true, //true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
			type: 'GET', //请求的方式
			data: {}, //发给服务器的数据
			dataType: 'json',
			success: function(text) {}, //请求成功执行方法
			error: function() {}, //错误回调
		};

		var aData = []; //存储数据
		var sData = ''; //拼接数据
		Object.assign(setting, mySetting); //属性覆盖
		for(var attr in setting.data) {
			aData.push(attr + '=' + filter(setting.data[attr]));
		}
		sData = aData.join('&');
		setting.type = setting.type.toUpperCase();

		var xhr = new XMLHttpRequest();
		try {
			if(setting.type == 'GET') { //get方式请求
				sData = setting.url + '?' + sData;
				xhr.open(setting.type, sData + '&' + new Date().getTime(), setting.async);
				xhr.send();
			} else { //post方式请求
				xhr.open(setting.type, setting.url, setting.async);
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.send(sData);
			}
		} catch(e) {
			return httpEnd();
		}

		if(setting.async) {
			xhr.addEventListener('readystatechange', httpEnd, false);
		} else {
			httpEnd();
		}

		function httpEnd() {
			if(xhr.readyState == 4) {
				var head = xhr.getAllResponseHeaders();
				var response = xhr.responseText;
				//将服务器返回的数据，转换成json

				if(/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
					response = JSON.parse(response);
				}
				if(xhr.status == 200) {
					setting.success(response, xhr);
				} else {
					setting.error(xhr);
				}
			}
		}
		xhr.end = function() {
			xhr.removeEventListener('readystatechange', httpEnd, false);
		}

		function filter(str) { //特殊字符转义
			str += ''; //隐式转换
			str = str.replace(/%/g, '%25');
			str = str.replace(/\+/g, '%2B');
			str = str.replace(/ /g, '%20');
			str = str.replace(/\//g, '%2F');
			str = str.replace(/\?/g, '%3F');
			str = str.replace(/&/g, '%26');
			str = str.replace(/\=/g, '%3D');
			str = str.replace(/#/g, '%23');
			return str;
		}
		return xhr;
	}
	//成功回调
	static successCall = (res, xhr, info, successCall) => {
		info.state.loadAnimation = false; //loading状态
		//返回code正确的情况
		if(strUtil.formatData(res, 'code') == '0' || strUtil.formatData(res, 'data') != '') {
			successCall(res, xhr);
		} else {
			info.state.alertShow = true; //提示框状态
			info.state.alertMsg = strUtil.formatData(res, 'reason'); //提示框文字
		}
		info.setState(info.state);

	}
	//失败回调
	static errorCall = (xhr, info, errorCall) => {
		if(xhr.status == 404) {
			info.state.alertMsg = '接口不存在';
		} else {
			info.state.alertMsg = '接口请求失败';
		}
		info.state.loadAnimation = false; //loading状态
		info.state.alertShow = true; //提示框状态
		info.setState(info.state);
	}
}

/**
 * 业务帮助类
 */
class bussinessUtil {
	/**
	 * 适配屏幕方法
	 * @return {[type]} [description]
	 */
	static configScreen = () => {
		let width = document.body.clientWidth;
		let point = width / 18.75; //按照375屏幕为基础
		//当屏幕为ipad时候
		if(width == 768) {
			point = 32;
		}
		document.querySelectorAll("html")[0].style.fontSize = point + "px";
		//图片懒加载
		let offset = -80;
		let store = []; //懒加载图片集合
		//获取懒加载图片集合
		let lazy = document.querySelectorAll('.lazy');
		for(let i = 0; i < lazy.length; i++) {
			store.push(lazy[i]);
		}
		loadImg();
		if('addEventListener' in document) {
			document.addEventListener('DOMContentLoaded', function() {
				FastClick.attach(document.body);
			}, false);
			window.addEventListener('scroll', () => {
				loadImg()
			}, false);
		}

		function loadImg() {
			for(var i = store.length - 1; i >= 0; i--) {
				let className = store[i].getAttribute('class');
				store[i].setAttribute('class', className + ' animation-opacity');
				var coords = store[i].getBoundingClientRect();
				if(coords.top >= 0 && coords.left >= 0 && coords.top <= ((window.innerHeight || document.documentElement.clientHeight) + parseInt(offset))) {
					var src = store[i].getAttribute('data-src');
					store[i].setAttribute('src', src);
					// store[i].style.background='url('+src+') 50% no-repeat';
					store.splice(i, 1);
				}
			}
		}
	}

	//设置标题
	static setTitle = (str) => {
		document.title = str;
		var i = document.createElement('iframe');
		i.src = '//m.baidu.com/favicon.ico';
		i.style.display = 'none';
		i.onload = function() {
			setTimeout(function() {
				i.remove();
			}, 9)
		}
		document.body.appendChild(i);
	}

}

export {
	config,
	strUtil,
	dateUtil,
	navigatorUtil,
	dataUtil,
	bussinessUtil
}