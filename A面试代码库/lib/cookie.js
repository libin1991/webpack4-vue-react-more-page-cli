export default class Cookie {
	//写cookies
	static setCookie = (name, value) => {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}
	//读取cookies 
	static getCookie = (name) => {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}

	//删除cookies 
	static delCookie = (name) => {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if(cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}