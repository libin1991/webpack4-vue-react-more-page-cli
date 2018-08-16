export default class String {
	/*编写一个方法 求一个字符串的字节长度
       假设：一个英文字符占用一个字节，一个中文字符占用两个字节 */
	function GetBytes(str) {
		var len = str.length;
		var bytes = len;
		for(var i = 0; i < len; i++) {
			if(str.charCodeAt(i) > 255) bytes++;
		}
		return bytes;
	}
	alert(GetBytes("你好,as"));
	/*
	 * 判断字符串是否为空
	 * @param str 传入的字符串
	 * @returns {Boolean}
	 */
	static isEmpty = (str) => {
		if(str == null || typeof(str) == 'undefined' || (str == '' && typeof(str) != 'number')) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 是否包含str
	 * @param  {[type]} str1 [description]
	 * @param  {[type]} str1 [description]
	 * @return {[type]}     [description]
	 */
	static hasStr = (str1, str2) => {
		let index = str1.indexOf(str2);
		if(index > -1) {
			return true;
		} else {
			return false;
		}
	}

	/*
	 * 忽略大小写判断字符串是否相同
	 * @param str1
	 * @param str2
	 * @returns {Boolean}
	 */
	static isEqualsIgnorecase = (str1, str2) => {
		if(str1.toUpperCase() == str2.toUpperCase()) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 判断是否是数字
	 * @param value
	 * @returns {Boolean}
	 */
	static isNum = (str) => {
		if(!isNaN(str)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 判断是否是中文
	 * @param str
	 * @returns {Boolean}
	 */
	static isChina = (str) => {
		var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
		if(reg.test(str)) {
			return false;
		}
		return true;
	}

	/**
	 * 字符串反转
	 * @param str
	 * @returns {str}
	 */
	static reverse = (str) => {
		return str.split("").reverse().join("");
	}
	/**
	 * 判断是否为整数
	 * @param target
	 */
	static isInteger = function(target) {
		return typeof target === "number" && target % 1 === 0;
	};
	/**
	 * 测试是否是整数
	 * @param str
	 * @returns {str}
	 */
	static isInt = (str) => {
		if(str == "NaN")
			return false;
		return str == parseInt(str).toString();
	}
	/**
	 * 数组是否包含元素
	 */
	static arrayIndexOf = (arr = [], str) => {
		let index = arr.indexOf(str)
		if(index > -1) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 除去左边空白
	 * @param str
	 * @returns {str}
	 */
	static lTrim = (str) => {
		return str.replace(/(^\s*)/g, "");
	}

	/**
	 * 除去右边空白
	 * @param str
	 * @returns {str}
	 */
	static rTrim = (str) => {
		return str.replace(/(\s*$)/g, "");
	}

	/**
	 * 除去两边空白
	 * @param str
	 * @returns {str}
	 */
	static Trim = (str) => {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	/**
	 * 除去所有空白
	 * @param str
	 * @returns {str}
	 */
	static allTrim = (str) => {
		return str.replace(/\s+/g, "");
	}
	/**
	 * Json转换成字符串
	 * @param json
	 * @returns {str}
	 */
	static json2str = (str) => {
		if(!strUtil.isEmpty(str)) return JSON.parse(str);
	}
	/**
	 * 字符串转换成Json
	 * @param str
	 * @returns {json}
	 */
	static str2json = (str) => {
		return JSON.stringify(str);
	}

	/**
	 * 截取小数点,四舍五入
	 */
	static toFixed(str, number) {
		return parseFloat(str).toFixed(number);
	}

	/**
	 * 截取小数点,不进行四舍五入
	 */
	static toDecimal(str, number) {
		let a = '1';
		for(let i = 0; i < number; i++) {
			a += '0';
		}
		let s = Math.floor(parseFloat(str) * a) / a;
		return s;
	}

	/**
	 * 字符串-获取以ASCII编码字节数 英文占1字节 中文占2字节
	 * @param str
	 * @returns {json}
	 */
	static lenASCII = (str) => {
		return str.replace(/[^\x00-\xff]/g, 'xx').length; //将所有非\x00-\xff字符换为xx两个字符,再计算字符串
	}
	/**
	 * 格式化百分比
	 * @param str
	 * @returns {str}
	 */
	static formatPercent = (str) => {
		let reg = /\%/g;
		str = str.toString().replace(reg, '');
		return str;
	}

	/**
	 * 格式化千分位
	 * @param str
	 * @returns {str}
	 */
	static formatKilo = (str) => {
		str = str.toString();
		if(/[^0-9\.]/.test(str)) return "invalid value";
		str = str.replace(/^(\d*)$/, "$1.");
		str = str.replace(/(\d*\.\d\d)\d*/, "$1");
		str = str.replace(".", ",");
		var re = /(\d)(\d{3},)/;
		while(re.test(str))
			str = str.replace(re, "$1,$2");
		str = str.replace(/.(\d*)$/, ".$1");
		str = str.substr(str.length - 1, 1) == '.' ? str.substring(0, str.length -
			1) : str;
		if(!(/\./.test(str))) {
			str += '.00';
		}
		return str.replace(/^\./, "0.");
	}

	//获取唯一机器码
	static getGuid = () => {
		return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	/**
	 * 格式化字符串
	 * @param  {[type]} str [description]
	 *
	 * @param  {[type]} type[格式化的类型 name telephone identity]
	 * @param  {[type]} punctuation [用来格式化的符号]
	 * @return {[type]} [description]
	 */
	static formatStr = (str, type = 'name', punctuation = '*') => {
		str = str.split('');
		var newStr = [];
		for(var i = 0; i < str.length; i++) {
			if(type == 'name') {
				if(i == 0) {
					newStr.push(str[i]);
				} else {
					newStr.push(punctuation);
				}
			} else if(type == 'telephone') {
				if(i > 2 && i < 7) {
					newStr.push(punctuation);
				} else {
					newStr.push(str[i]);
				}
			} else if(type == 'identity') {
				if(i > 5 && i < 14) {
					newStr.push(punctuation);
				} else {
					newStr.push(str[i]);
				}
			}

		}
		return newStr.join('');
	}
	//清除Html标签文本
	static clearHtml = (str) => {
		var reg = /<[^<>]+>/g;
		return str.replace(reg, '');
	}

	/*
	 * author toni
	 * 金钱取万,如果小于万就返回对应金额加上元,大于万就四舍五入到万加上万
	 */
	static formatMiriade = (money) => {
		var money = parseFloat(money);
		var str;
		if(money >= 10000) {
			str = (money / 10000).toFixed() + '万';
		} else {
			str = money + '元';
		}
		return str;
	}

	/**
	 * 累投金额格式化,取出亿和万
	 */
	static formatMoney = (str) => {
		let reg = /\,/g;
		let number = parseFloat(str.replace(reg, ''));
		let Num = new Object();
		Num.hundredMillion = Math.floor(number / 100000000); //获取亿
		Num.kiloMillion = Math.floor(number % 100000000 / 10000); //获取万
		return Num;
	}

	/**
	 * 平台人数格式化,取出万和单个
	 */
	static formatPerson = (str) => {
		let reg = /\,/g;
		let number = parseFloat(str.toString().replace(reg, ''));
		let Num = new Object();
		Num.million = Math.floor(number / 10000); //获取万
		Num.single = Math.floor(number % 10000); //获取单个
		return Num;
	}

	/**
	 *格式化数据
	 */
	static formatData = (obj, prop) => {
		let s = '';
		try {
			s = obj[prop];
		} catch(error) {
			s = '';
		}
		return s;
	}
	/**
	 * 
	 * @desc 随机生成颜色
	 * @return {String} 
	 */
	static randomColor = () => {
		return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
	}
	/**
	 * 过滤字符串中的空格
	 * var a = 'a b c';
	 * _.clearSpace(a) => 'abc'
	 *
	 */
	static clearSpace = function(text) {
		return text.replace(/[ ]/g, "");
	};

	/**
	 * 
	 * @desc   对象序列化
	 * @param  {Object} obj 
	 * @return {String}
	 */
	static stringfyQueryString = (obj) => {
		if(!obj) return '';
		var pairs = [];

		for(var key in obj) {
			var value = obj[key];

			if(value instanceof Array) {
				for(var i = 0; i < value.length; ++i) {
					pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
				}
				continue;
			}

			pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
		}

		return pairs.join('&');
	}

	//字符串截取后面加入...
	static interceptString = (len) => {
		if(this.length > len) {
			return this.substring(0, len) + "...";
		} else {
			return this;
		}
	}
	//去除字符串空格
	//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
	//ecDo.trim('  1235asd',1)
	//result：1235asd
	//这个方法有原生的方案代替，但是考虑到有时候开发PC站需要兼容IE8，所以就还是继续保留
	static trims = (str, type) => {
		switch(type) {
			case 1:
				return str.replace(/\s+/g, "");
			case 2:
				return str.replace(/(^\s*)|(\s*$)/g, "");
			case 3:
				return str.replace(/(^\s*)/g, "");
			case 4:
				return str.replace(/(\s*$)/g, "");
			default:
				return str;
		}
	}

	/*type
	 * 字母大小写切换
	 1:首字母大写
	 2：首页母小写
	 3：大小写转换
	 4：全部大写
	 5：全部小写
	 * */
	//ecDo.changeCase('asdasd',1)
	//result：Asdasd
	static changeCase = (str, type) => {
		function ToggleCase(str) {
			var itemText = ""
			str.split("").forEach(
				function(item) {
					if(/^([a-z]+)/.test(item)) {
						itemText += item.toUpperCase();
					} else if(/^([A-Z]+)/.test(item)) {
						itemText += item.toLowerCase();
					} else {
						itemText += item;
					}
				});
			return itemText;
		}
		switch(type) {
			case 1:
				return str.replace(/\b\w+\b/g, function(word) {
					return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
				});
			case 2:
				return str.replace(/\b\w+\b/g, function(word) {
					return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
				});
			case 3:
				return ToggleCase(str);
			case 4:
				return str.toUpperCase();
			case 5:
				return str.toLowerCase();
			default:
				return str;
		}
	}
	//字符串循环复制
	//repeatStr(str->字符串, count->次数)
	//ecDo.repeatStr('123',3)
	//"result：123123123"
	static repeatStr = (str, count) => {
		var text = '';
		for(var i = 0; i < count; i++) {
			text += str;
		}
		return text;
	}
	//字符串替换
	//ecDo.replaceAll('这里是上海，中国第三大城市，广东省省会，简称穗，','上海','广州')
	//result："这里是广州，中国第三大城市，广东省省会，简称穗，"
	static replaceAll = (str, AFindText, ARepText) => {
		raRegExp = new RegExp(AFindText, "g");
		return str.replace(raRegExp, ARepText);
	}
	//字符替换*
	//replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
	//ecDo.replaceStr('18819322663',[3,5,3],0)
	//result：188*****663
	//ecDo.replaceStr('asdasdasdaa',[3,5,3],1)
	//result：***asdas***
	//ecDo.replaceStr('1asd88465asdwqe3',[5],0)
	//result：*****8465asdwqe3
	//ecDo.replaceStr('1asd88465asdwqe3',[5],1,'+')
	//result："1asd88465as+++++"
	static replaceStr = (str, regArr, type, ARepText) => {
		var regtext = '',
			Reg = null,
			replaceText = ARepText || '*';
		//repeatStr是在上面定义过的（字符串循环复制），大家注意哦
		if(regArr.length === 3 && type === 0) {
			regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
			Reg = new RegExp(regtext);
			var replaceCount = this.repeatStr(replaceText, regArr[1]);
			return str.replace(Reg, '$1' + replaceCount + '$2')
		} else if(regArr.length === 3 && type === 1) {
			regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
			Reg = new RegExp(regtext);
			var replaceCount1 = this.repeatStr(replaceText, regArr[0]);
			var replaceCount2 = this.repeatStr(replaceText, regArr[2]);
			return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
		} else if(regArr.length === 1 && type === 0) {
			regtext = '(^\\w{' + regArr[0] + '})'
			Reg = new RegExp(regtext);
			var replaceCount = this.repeatStr(replaceText, regArr[0]);
			return str.replace(Reg, replaceCount)
		} else if(regArr.length === 1 && type === 1) {
			regtext = '(\\w{' + regArr[0] + '}$)'
			Reg = new RegExp(regtext);
			var replaceCount = this.repeatStr(replaceText, regArr[0]);
			return str.replace(Reg, replaceCount)
		}
	}
	//检测字符串，表单验证
	//ecDo.checkType('165226226326','phone')
	//result：false
	//大家可以根据需要扩展
	static checkType = (str, type) => {
		switch(type) {
			case 'email':
				return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
			case 'phone':
				return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
			case 'tel':
				return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
			case 'number':
				return /^[0-9]$/.test(str);
			case 'english':
				return /^[a-zA-Z]+$/.test(str);
			case 'text':
				return /^\w+$/.test(str);
			case 'chinese':
				return /^[\u4E00-\u9FA5]+$/.test(str);
			case 'lower':
				return /^[a-z]+$/.test(str);
			case 'upper':
				return /^[A-Z]+$/.test(str);
			default:
				return true;
		}
	}
	//检测密码强度
	//ecDo.checkPwd('12asdASAD')
	//result：3(强度等级为3)
	static checkPwd = (str) => {
		var nowLv = 0;
		if(str.length < 6) {
			return nowLv
		}
		if(/[0-9]/.test(str)) {
			nowLv++
		}
		if(/[a-z]/.test(str)) {
			nowLv++
		}
		if(/[A-Z]/.test(str)) {
			nowLv++
		}
		if(/[\.|-|_]/.test(str)) {
			nowLv++
		}
		return nowLv;
	}
	//随机码（toString详解）
	//count取值范围0-36
	//ecDo.randomWord(10)
	//result："2584316588472575"
	//ecDo.randomWord(14)
	//result："9b405070dd00122640c192caab84537"
	//ecDo.randomWord(36)
	//result："83vhdx10rmjkyb9"
	static randomWord = (count) => {
		return Math.random().toString(count).substring(2);
	}
	//查找字符串出现次数
	//可能标题会有点误导，下面我就简单说明一个需求，在字符串'sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'中找出'blog'的出现次数。
	//var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
	//ecDo.countStr(strTest,'blog')
	//result：6
	static countStr = (str, strSplit) => {
		return str.split(strSplit).length - 1
	}
	//过滤字符串 
	//过滤字符串(html标签，表情，特殊字符)
	//字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符
	//如果需要过滤多种字符，type参数使用,分割，如下栗子
	//过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除
	//var str='asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&*^%^&*$\\"\'#@!()*/-())_\'":"{}?<div></div><img src=""/>啊实打实大蠢猪自行车这些课程';
	// ecDo.filterStr(str,'html,WORD,chinese,special','*','%?')
	//result："asd    654a**sasdasd*********6d5#%^*^&*^%^&*$\"'#@!()*/-())_'":"{}?*****************"
	static filterStr = (str, type, restr, spstr) => {
		var typeArr = type.split(','),
			_str = str;
		for(var i = 0, len = typeArr.length; i < len; i++) {
			//是否是过滤特殊符号
			if(typeArr[i] === 'special') {
				var pattern, regText = '$()[]{}?\|^*+./\"\'+';
				//是否有哪些特殊符号需要保留
				if(spstr) {
					var _spstr = spstr.split(""),
						_regText = "[^0-9A-Za-z\\s";
					for(var j = 0, len1 = _spstr.length; j < len1; j++) {
						if(regText.indexOf(_spstr[j]) === -1) {
							_regText += _spstr[j];
						} else {
							_regText += '\\' + _spstr[j];
						}
					}
					_regText += ']'
					pattern = new RegExp(_regText, 'g');
				} else {
					pattern = new RegExp("[^0-9A-Za-z\\s]", 'g')
				}
			}
			var _restr = restr || '';
			switch(typeArr[i]) {
				case 'special':
					_str = _str.replace(pattern, _restr);
					break;
				case 'html':
					_str = _str.replace(/<\/?[^>]*>/g, _restr);
					break;
				case 'emjoy':
					_str = _str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, _restr);
					break;
				case 'word':
					_str = _str.replace(/[a-z]/g, _restr);
					break;
				case 'WORD':
					_str = _str.replace(/[A-Z]/g, _restr);
					break;
				case 'number':
					_str = _str.replace(/[0-9]/g, _restr);
					break;
				case 'chinese':
					_str = _str.replace(/[\u4E00-\u9FA5]/g, _restr);
					break;
			}
		}
		return _str;
	}
	//格式化处理字符串
	//ecDo.formatText('1234asda567asd890')
	//result："12,34a,sda,567,asd,890"
	//ecDo.formatText('1234asda567asd890',4,' ')
	//result："1 234a sda5 67as d890"
	//ecDo.formatText('1234asda567asd890',4,'-')
	//result："1-234a-sda5-67as-d890"
	static formatText = (str, size, delimiter) => {
		var _size = size || 3,
			_delimiter = delimiter || ',';
		var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
		var reg = new RegExp(regText, 'g');
		return str.replace(reg, _delimiter);
	}
	//找出最长单词
	//ecDo.longestWord('Find the Longest word in a String')
	//result：7
	//ecDo.longestWord('Find|the|Longest|word|in|a|String','|')
	//result：7
	static longestWord = (str, splitType) => {
		var _splitType = splitType || /\s+/g,
			_max = 0,
			_item = '';
		var strArr = str.split(_splitType);
		strArr.forEach(function(item) {
			if(_max < item.length) {
				_max = item.length
				_item = item;
			}
		})
		return {
			el: _item,
			max: _max
		};
	}
	//句中单词首字母大写 
	//这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写
	//ecDo.titleCaseUp('this is a title')
	//"This Is A Title"
	static titleCaseUp = (str, splitType) => {
		var _splitType = splitType || /\s+/g;
		var strArr = str.split(_splitType),
			result = "",
			_this = this
		strArr.forEach(function(item) {
			result += _this.changeCase(item, 1) + ' ';
		})
		return this.trim(result, 4)
	}

}

/********************** String工具类***************/
//trim去掉字符串两边的指定字符,默去空格
String.prototype.trim = function(tag) {
	if(!tag) {
		tag = '\\s';
	} else {
		if(tag == '\\') {
			tag = '\\\\';
		} else if(tag == ',' || tag == '|' || tag == ';') {
			tag = '\\' + tag;
		} else {
			tag = '\\s';
		}
	}
	eval('var reg=/(^' + tag + '+)|(' + tag + '+$)/g;');
	return this.replace(reg, '');
};
//字符串截取后面加入...
String.prototype.interceptString = function(len) {
	if(this.length > len) {
		return this.substring(0, len) + "...";
	} else {
		return this;
	}
}
//将一个字符串用给定的字符变成数组
String.prototype.toArray = function(tag) {
	if(this.indexOf(tag) != -1) {
		return this.split(tag);
	} else {
		if(this != '') {
			return [this.toString()];
		} else {
			return [];
		}
	}
}
//只留下数字(0123456789)
String.prototype.toNumber = function() {
	return this.replace(/\D/g, "");
}
//保留中文  
String.prototype.toCN = function() {
	var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
	return this.replace(regEx, '');
}
//转成int
String.prototype.toInt = function() {
	var temp = this.replace(/\D/g, "");
	return isNaN(parseInt(temp)) ? this.toString() : parseInt(temp);
}
//是否是以XX开头
String.prototype.startsWith = function(tag) {
	return this.substring(0, tag.length) == tag;
}
//是否已XX结尾
String.prototype.endWith = function(tag) {
	return this.substring(this.length - tag.length) == tag;
}
//StringBuffer
var StringBuffer = function() {
	this._strs = new Array;
};
StringBuffer.prototype.append = function(str) {
	this._strs.push(str);
};
StringBuffer.prototype.toString = function() {
	return this._strs.join("");
};
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}