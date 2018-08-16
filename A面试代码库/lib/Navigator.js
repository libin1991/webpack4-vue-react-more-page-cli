/**  
 * navigator帮助类
 */
class navigatorUtil {
	/**
	 * 头部信息
	 * @type {[type]}
	 */
	static userAgent = navigator.userAgent;

	/**
	 * 是否为ipad
	 */
	static isIPad = () => {
		return(navigatorUtil.userAgent.indexOf("iPad") > -1);
	}

	/**
	 * 是否为iphone
	 * @param  {[type]}  userAgent [description]
	 * @return {Boolean}           [description]
	 */
	static isIPhone = () => {
		return(navigatorUtil.userAgent.indexOf("iPhone") > -1);
	}

	/**
	 * 是否为ios系统
	 * @param  {[type]}  userAgent [description]
	 * @return {Boolean}           [description]
	 */

	static isIOS = () => {
		return navigatorUtil.isIPad(navigatorUtil.userAgent) || navigatorUtil.isIPhone(
			navigatorUtil.userAgent);
	}

	/**
	 * 是否为Android系统
	 * @param  {[type]}  userAgent [description]
	 * @return {Boolean}           [description]
	 */
	static isAndroid = () => {
		return(navigatorUtil.userAgent.indexOf("Android") > -1) ||
			(navigatorUtil.userAgent.indexOf("Linux") > -1);
	}

	/**
	 * 判断是否为微信
	 */
	static isWeixin = () => {
		return(navigatorUtil.userAgent.indexOf("MicroMessenger") > -1);
	}

	/**
	 * 
	 * @desc 获取浏览器类型和版本
	 * @return {String} 
	 */
	static getExplore = () => {
		var sys = {},
			ua = navigator.userAgent.toLowerCase(),
			s;
		(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
			(s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
			(s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
			(s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
			(s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
			(s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
			(s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
		// 根据关系进行判断 if (sys.ie) return ('IE: ' + sys.ie)
		if(sys.edge) return('EDGE: ' + sys.edge)
		if(sys.firefox) return('Firefox: ' + sys.firefox)
		if(sys.chrome) return('Chrome: ' + sys.chrome)
		if(sys.opera) return('Opera: ' + sys.opera)
		if(sys.safari) return('Safari: ' + sys.safari)
		return 'Unkonwn'
	}

	/**
	 * 
	 * @desc 获取操作系统类型
	 * @return {String} 
	 */
	static getOS = () => {
		var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
		var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
		var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

		if(/mac/i.test(appVersion)) return 'MacOSX'
		if(/win/i.test(appVersion)) return 'windows'
		if(/linux/i.test(appVersion)) return 'linux'
		if(/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
		if(/android/i.test(userAgent)) return 'android'
		if(/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
	}

	//进入全屏模式,  判断各种浏览器，找到正确的方法
	static launchFullScreen = (element) => {
		if(element.requestFullscreen) {
			element.requestFullscreen();
		} else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if(element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if(element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
		return true;
	}
	//退出全屏模式
	static exitFullScreen = () => {
		if(document.exitFullscreen) {
			document.exitFullscreen();
		} else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if(document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
		return false;
	}

}