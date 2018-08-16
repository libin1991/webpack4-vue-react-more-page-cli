/**
 * url帮助类
 */
export default class URL {
	/**
	 * 获取对应的url
	 * @return {[type]} [description]
	 */
	static getUrl = () => {
		return decodeURI(window.location.pathname + window.location.search + window.location.hash);
	}

	/**
	 * 获取浏览器hash
	 * @return {[type]} [description]
	 */
	static getHash = () => {
		return window.location.hash;
	}

	/**
	 * 获取对应下标的hash值
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	static getHashParts = (index) => {
		var hash = urlUtil.getHash().split("/");
		hash.shift();
		return index !== undefined ? hash[index] : hash;
	}

	/**
	 * 设置hash
	 * @param  {[type]} hashList [description]
	 * @return {[type]}          [description]
	 */
	static setHash = (hashList) => {
		hashList.unshift(config.baseHash);
		window.location.hash = hashList.join('/');
	}
	/**
	 * 获取浏览器中可能会传递过来带有?的页面地址,获取url参数
	 */
	static getFromUrl = (param = url) => {
		let param1 = urlUtil.getSearch(param);
		let url = urlUtil.getUrl();
		let param2;
		if(url.split("?").length == 3) {
			param2 = url.split("?")[2];
			return param1 + '?' + param2;
		} else if(url.split("?").length == 2) {
			return param1;
		} else {
			return '';
		}

	}
	/**
	 * 根据option获取对应的值
	 */
	static getSearch = (option) => {
		var paraStr, paras,
			url = urlUtil.getUrl();
		if(url) {
			paraStr = url.split("?")[1];
			if(paraStr) {
				paras = {};
				paraStr = paraStr.split("&");
				for(var n in paraStr) {
					var name = paraStr[n].split("=")[0];
					var value = paraStr[n].split("=")[1];
					paras[name] = value;
				}
			} else {
				return '';
			}
			if(!option) {
				return paras;
			} else {
				return paras[option] ? paras[option] : "";
			}
		}
	}

	/**
	 * 重设url参数取值，若无此参数则进行创建,若参数赋值为null则进行删除
	 */
	static setSearch = (option) => {
		let paras = urlUtil.getSearch();
		var i, name, val;
		if(arguments.length == 2) {
			name = arguments[0];
			val = arguments[1];
			option = {
				name: val
			};
		}
		if("string" === typeof option) {
			paras[option] = "";
		} else if("object" === typeof option) {
			for(i in option) {
				if(option[i] === null) {
					delete paras[i];
				} else {
					paras[i] = option[i];
				}
			}
		} else {

		}
		return urlUtil.build(paras);
	}

	/**
	 * 删除url中指定参数返回新url
	 */
	static removeSearch = (option) => {
		let paras = urlUtil.getSearch();
		var i;
		if("string" === typeof option) {
			option = option.split(",");
			for(i in option) {
				delete paras[option[i]]
			}

		}
		return urlUtil.build(paras);
	}

	/**
	 * 根据url和处理过的paras重新构件url
	 * @return {[type]} [description]
	 */
	static build = (paras) => {
		let url = urlUtil.getUrl();
		let str = url.split("?");
		let pathname = str.length > 0 ? str[0] : '';
		var i,
			newUrl = pathname + "?";

		for(i in paras) {
			newUrl += (i + "=" + paras[i] + "&");
		}

		return newUrl.substr(0, newUrl.length - 1);
	}

	static Jump = (url, falg) => {    //window.location.assign(url)    window.location.replace(url)
		if(falg) {
			window.location.replace(url)
		} else {
			window.location.hash = url
		}
	}

	/**
	 * 
	 * @desc   url参数转对象
	 * @param  {String} url  default: window.location.href
	 * @return {Object} 
	 */
	static parseQueryString = (url) => {
		url = url == null ? window.location.href : url
		var search = url.substring(url.lastIndexOf('?') + 1)
		if(!search) {
			return {}
		}
		return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
	}

	//获取url中的文件名：
	static getHtmlDocName = () => {
		var str = window.location.href;
		str = str.substring(str.lastIndexOf("/") + 1);
		str = str.substring(0, str.lastIndexOf("."));
		return str;
	}
	//获取url中的某个参数：
	static getUrlParam = (name) => {
		//构造一个含有目标参数的正则表达式对象
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//匹配目标参数
		var r = window.location.search.substr(1).match(reg);
		//返回参数值
		if(r != null) return unescape(r[2]);
		//不存在时返回null
		return null;
	}
	//设置url参数
	//ecDo.setUrlPrmt({'a':1,'b':2})
	//result：a=1&b=2
	static setUrlPrmt = (obj) => {
		var _rs = [];
		for(var p in obj) {
			if(obj[p] != null && obj[p] != '') {
				_rs.push(p + '=' + obj[p])
			}
		}
		return _rs.join('&');
	}
	//获取url参数
	//ecDo.getUrlPrmt('test.com/write?draftId=122000011938')
	//result：Object{draftId: "122000011938"}
	static getUrlPrmt = (url) => {
		url = url ? url : window.location.href;
		var _pa = url.substring(url.indexOf('?') + 1),
			_arrS = _pa.split('&'),
			_rs = {};
		for(var i = 0, _len = _arrS.length; i < _len; i++) {
			var pos = _arrS[i].indexOf('=');
			if(pos == -1) {
				continue;
			}
			var name = _arrS[i].substring(0, pos),
				value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
			_rs[name] = value;
		}
		return _rs;
	}
     
}

function queryUrlParameter(str) {
    let obj = {}
    let reg = /([^?=&#]+)=([^?=&#]+)/g;
    str.replace(reg, function () {
        obj[arguments[1]] = arguments[2]
    })
    //如果加上hash
    // reg = /#([^?&=#]+)/g
    // if (reg.test(str)) {
    //     str.replace(reg, function () {
    //         obj.hash = arguments[1]
    //     })
    // }
    return obj
}
console.log(queryUrlParameter('http://www.baidu.com?a=1&b=2#12222'))  //{ a: '1', b: '2'}

 