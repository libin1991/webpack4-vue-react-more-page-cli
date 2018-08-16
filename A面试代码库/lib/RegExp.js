/**
 * 时间帮助类
 */
export default class RegExp {
	// 如果object是一个数组，返回true。
	static isArray = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	};

	// 如果object是一个Function，返回true。
	static isFunction = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Function]';
	};

	// 如果object是一个对象，返回true。[排除数组和函数]
	static isObject = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Object]';
	};

	// 如果object是一个字符串，返回true。
	static isString = function(obj) {
		return Object.prototype.toString.call(obj) === '[object String]';
	};

	// 如果object是一个数值，返回true (包括 NaN)。
	static isNumber = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Number]';
	};

	// 如果object是一个布尔值，返回true。
	static isBoolean = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Boolean]';
	};

	// 如果object是一个Date类型，返回true。
	static isDate = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Date]';
	};

	// 如果object的值是 null、undefined或者空，返回true。
	static isNull = function(value) {
		return value === '' || value === undefined || value === null ? true : false;
	};

	/**
	 * 如果object 不包含任何值，返回true。 对于字符串和数组对象，如果length属性为0，那么返回true。
	 *
	 * var a = {} => _.isEmpty(a) === true
	 * var a = '' => _.isEmpty(a) === true
	 * var a = [] => _.isEmpty(a) === true
	 *
	 */
	static isEmpty = function(obj) {
		let flag = true;
		if(this.isArray(obj) || this.isNumber(obj) || this.isString(obj)) {
			flag = obj.length === 0 ? true : false;
		}
		if(this.isObject(obj)) {
			for(var p in obj) {
				if(obj.hasOwnProperty(p)) {
					flag = false;
				}
			}
		}
		return flag;
	};
	// 验证日期格式[yyyy-mm-dd]
	static isDate = function(text) {
		var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
		return reg.test(text.toString());
	};
	// 验证url
	static isURL = function(text) {
		var reg = /[a-zA-z]+:\/\/[^\s]/;
		return reg.test(text);
	};
	// 检测字符串中是否包含中文
	static existCN = function(text) {
		var reg = /.*[\u4e00-\u9fa5]+.*$/;
		return reg.test(text);
	};
	/**
	 * @desc   判断`obj`是否为空
	 * @param  {Object} obj
	 * @return {Boolean}
	 */
	static isEmptyObject = (obj) => {
		if(!obj || typeof obj !== 'object' || Array.isArray(obj))
			return false
		return !Object.keys(obj).length
	}
	/**
	 * 
	 * @desc   判断是否为邮箱地址
	 * @param  {String}  str
	 * @return {Boolean} 
	 */
	static isEmail = (str) => {
		return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
	}

	/**
	 * 
	 * @desc  判断是否为身份证号
	 * @param  {String|Number} str 
	 * @return {Boolean}
	 */
	static isIdCard = (str) => {
		return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
	}
	/**
	 * 
	 * @desc   判断是否为手机号
	 * @param  {String|Number} str 
	 * @return {Boolean} 
	 */
	static isPhoneNum = (str) => {
		return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
	}
	/**
	 * 
	 * @desc   判断是否为URL地址
	 * @param  {String} str 
	 * @return {Boolean}
	 */
	static isUrl = (str) => {
		return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
	}

	/**
	 * 
	 * @desc 判断浏览器是否支持webP格式图片
	 * @return {Boolean} 
	 */
	static isSupportWebP = () => {
		return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
	}
	
	/**
	 * 
	 * @desc   表单验证
	 */
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
}


//检测字符串
//checkType('165226226326','mobile')
//result：false
var heckType=function(str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'mobile':
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

