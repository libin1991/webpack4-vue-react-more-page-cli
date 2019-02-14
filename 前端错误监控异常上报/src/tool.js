function getExplore() {
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

function getOS() {
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

var getBrowser = function() {
	var UA = navigator.userAgent || ''
	var isAndroid = (function() {
		return UA.match(/Android/i) ? true : false
	})()
	var isQQ = (function() {
		return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(UA) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(UA)
	})()
	var isIOS = (function() {
		return UA.match(/iPhone|iPad|iPod/i) ? true : false
	})()
	var isSafari = (function() {
		return /iPhone|iPad|iPod\/([\w.]+).*(safari).*/i.test(UA)
	})()
	var isWx = (function() {
		return UA.match(/micromessenger/i) ? true : false
	})()
	var isWb = (function() {
		return UA.match(/weibo/i) ? true : false
	})()
	var isAndroidChrome = (function() {
		return(UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) && isAndroid && !isQQ
	})()
	var isQZ = (function() {
		return UA.indexOf('Qzone/') !== -1
	})()
	var browser = {
		isAndroid: isAndroid,
		isIOS: isIOS,
		isSafari: isSafari,
		isQQ: isQQ,
		isWb: isWb,
		isWx: isWx,
		isQZ: isQZ,
		isAndroidChrome: isAndroidChrome
	}
	return browser
}