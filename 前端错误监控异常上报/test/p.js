function WBP(option) {
	try {
		Date.prototype.Format = function(fmt) { // author: meizz
			var o = {
				"M+": this.getMonth() + 1, // 月份
				"d+": this.getDate(), // 日
				"h+": this.getHours(), // 小时
				"m+": this.getMinutes(), // 分
				"s+": this.getSeconds(), // 秒
				"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
				"S": this.getMilliseconds() // 毫秒
			};
			if(/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		}

		var w = document.documentElement.clientWidth || document.body.clientWidth; //浏览器宽度
		var h = document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
		var opt = {
			ps: 1, //采样比率
			device: {
				clientW: w,
				clientH: h,
			},
			t: new Date().Format("yyyy-MM-dd hh:mm:ss"),
			pid: "123",
			errorList: []
		};　　　　
		for(var i in option) {　　　　　　
			opt[i] = option[i];　　　　
		}　　　　
		function getExplore() {
			var sys = {},
				ua = navigator.userAgent.toLowerCase(),
				s;
			(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
				(s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
				(s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
				(s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
				(s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
				(s = ua.match(/micromessenger\/([\d\.]+)/i)) ? sys.weixin = s[1] :
				(s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
				(s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] :
				(s = ua.match(/weibo\/([\d\.]+)/i)) ? sys.weibo = s[1] : 0;
			// 根据关系进行判断 
			if(sys.ie) return('IE: ' + sys.ie)
			if(sys.edge) return('EDGE: ' + sys.edge)
			if(sys.firefox) return('Firefox: ' + sys.firefox)
			if(sys.weixin) return('weixin: ' + sys.weixin)
			if(sys.chrome) return('Chrome: ' + sys.chrome)
			if(sys.opera) return('Opera: ' + sys.opera)
			if(sys.safari) return('Safari: ' + sys.safari)
			if(sys.weibo) return('weibo: ' + sys.weibo)
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

		function perforPage() {
			var performance = window.performance ||
				window.msPerformance ||
				window.webkitPerformance;
			if(!performance) return;
			var time = performance.timing
			var timingObj = {};

			timingObj['rdit'] = (time.redirectEnd - time.redirectStart) / 1000; //页面重定向时间
			timingObj['dnst'] = (time.domainLookupEnd - time.domainLookupStart) / 1000; // DNS解析时间
			timingObj['tcpt'] = (time.connectEnd - time.connectStart) / 1000; //TCP建立时间
			timingObj['httpt'] = (time.responseEnd - time.requestStart) / 1000; //HTTP请求响应完成时间
			timingObj['domst'] = (time.responseEnd - time.navigationStart) / 1000; //DOM开始加载前所花费时间
			timingObj['doml'] = (time.domComplete - time.domLoading) / 1000; //DOM加载完成时间
			timingObj['domr'] = (time.domInteractive - time.domLoading) / 1000; //DOM结构解析完成时间
			timingObj['jst'] = (time.domContentLoadedEventEnd - time.domContentLoadedEventStart) / 1000; //脚本加载时间
			timingObj['loadt'] = (time.loadEventEnd - time.loadEventStart) / 1000; //onload事件时间
			timingObj['allt'] = (timingObj['rdit'] + timingObj['dnst'] + timingObj['tcpt'] + timingObj['httpt'] + timingObj['domr'] + timingObj['doml']);

			timingObj['reqt'] = time.responseEnd - time.requestStart || 0; //request请求耗时
			timingObj['wit'] = time.responseStart - time.navigationStart || 0; // 白屏时间
            
            
			return timingObj;
		}

		window.addEventListener('error', function(e) {
			var defaults = {
				m: '',
				h: ''
			};
			defaults.m = e.type + ":" + e.target.localName + ' is load error';
			defaults.h = e.target.href || e.target.currentSrc || e.target.src;

			if(e.target != window) opt.errorList.push(defaults)
		}, true);

		window.onerror = function(msg, _url, line, col, error) {
			var defaults = {
				line: line,
				col: col || (window.event && window.event.errorCharacter) || 0,
				m: error && error.stack ? error.stack.toString() : msg
			};
			opt.errorList.push(defaults)
		};

		window.addEventListener('unhandledrejection', function(e) {

			var defaults = {
				m: e.type + ":" + e.reason
			};

			console.log(defaults)
			opt.errorList.push(defaults)
		});

		function formatParams(data, random) {
			var arr = [];
			for(var name in data) {
				arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
			}
			if(random) {
				arr.push(("v=" + Math.random()).replace(".", ""));
			}
			return arr.join("&");
		}

		function _confuse(str, sign) {
			if(typeof str !== 'string' || !str) {
				return '';
			}
			var newStr = '';
			for(var i = 0; i < str.length; i++) {
				newStr += String.fromCharCode(str.charCodeAt(i) + sign * 2);
			}
			return newStr;
		};
		
		var softdog = {
			encrypt: function(str) {
				return _confuse(str, 1);
			},
			decrypt: function(str) {
				return _confuse(str, -1);
			}
		};
		
		setTimeout(function() {
			opt.device.pfm = perforPage();
			opt.device.browser = getExplore();
			opt.device.os = getOS()
            opt.referrer=document.referrer && document.referrer !== location.href ? document.referrer : '';  //页面来源
			var str = softdog.encrypt(JSON.stringify(opt));
			console.log(str)
			console.log(softdog.decrypt(str))
			
			if(Math.random()<=opt.ps){   //抽样采样
				var img = new Image();
			    img.src = './img/sky.png?opt=' + str;
			}
		}, 200);

	} catch(e) {}
}