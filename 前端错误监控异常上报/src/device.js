(function() {
   
	// device.js
	// =========
	// zhangshibing@baidu.com

	var WIN = window;
	var LOC = WIN["location"];
	var NA = WIN.navigator;
	var UA = NA.userAgent.toLowerCase();

	function test(needle) {
		return needle.test(UA);
	}

	var IsTouch = "ontouchend" in WIN;
	var IsAndroid = test(/android|htc/) || /linux/i.test(NA.platform + "");
	var IsIPad = !IsAndroid && test(/ipad/);
	var IsIPhone = !IsAndroid && test(/ipod|iphone/);
	var IsIOS = IsIPad || IsIPhone;
	var IsWinPhone = test(/windows phone/);
	var IsWebapp = !!NA["standalone"];
	var IsXiaoMi = IsAndroid && test(/mi\s+/);
	var IsUC = test(/ucbrowser/);
	var IsWeixin = test(/micromessenger/);
	var IsBaiduBrowser = test(/baidubrowser/);
	var IsChrome = !!WIN["chrome"];
	var IsBaiduBox = test(/baiduboxapp/);
	var IsPC = !IsAndroid && !IsIOS && !IsWinPhone;
	var IsHTC = IsAndroid && test(/htc\s+/);
	var IsBaiduWallet = test(/baiduwallet/);

	var IsDebug = !!~("" + LOC["port"]).indexOf("0");

	var device = {
		isTouch: IsTouch,
		isAndroid: IsAndroid,
		isIPad: IsIPad,
		isIPhone: IsIPhone,
		isIOS: IsIOS,
		isWinPhone: IsWinPhone,
		isWebapp: IsWebapp,
		isXiaoMi: IsXiaoMi,
		isUC: IsUC,
		isWeixin: IsWeixin,
		isBaiduBox: IsBaiduBox,
		isBaiduBrowser: IsBaiduBrowser,
		isChrome: IsChrome,
		isPC: IsPC,
		isHTC: IsHTC,
		isBaiduWallet: IsBaiduWallet,
		isDebug: IsDebug
	};

	var documentElement = WIN.document.documentElement;
	for(var i in device) {
		if(device[i]) {
			documentElement.className += " " + i.replace("Is", "").toLowerCase();
		}
	}

	if(typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		define(function() {
			return device;
		});
	} else if(typeof module !== 'undefined' && module.exports) {
		module.exports = device;
	} else {
		window.device = device;
	}

}).call(this);



//console.log(hh)
