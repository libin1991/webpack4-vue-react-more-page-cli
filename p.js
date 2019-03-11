function $_WBP(option) {
	try {
		var w = document.documentElement.clientWidth || document.body.clientWidth; //浏览器宽度
		var h = document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
		var opt = {
			ps: 1, //采样比率
			dev: {
				cW: w,
				cH: h,
			},
			pid: "",
			err: [],
			url:window.location.href,
			type: ["script", "link", "img"]
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

			var dts = performance.getEntries().reduce(function(arr, perf) {
				if(opt.type.indexOf(perf.initiatorType) > -1) {				 
					arr.push({
						'size': perf.transferSize,      //资源大小
						'url': perf.name,        //url
						'type': perf.initiatorType,     //资源类型
						'cnt':+((perf.connectEnd-perf.connectStart)/1000).toFixed(3),    //http连接时间
						'dmn':+((perf.domainLookupEnd-perf.domainLookupStart)/1000).toFixed(3),     //tcp域名解析
                        'rqt':+((perf.responseEnd-perf.requestStart)/1000).toFixed(3),     //http请求+响应时间
						'lodt': +(perf.duration/1000).toFixed(3)            //资源加载总时间
					})
				}
				return arr;
			}, [])
            
			var time = performance.timing
			var page = {};

			page['rdt'] = +((time.redirectEnd - time.redirectStart) / 1000).toFixed(3); //页面重定向时间
			page['dns'] = +((time.domainLookupEnd - time.domainLookupStart) / 1000).toFixed(3); // DNS解析时间
			page['tcp'] = +((time.connectEnd - time.connectStart) / 1000).toFixed(3); //TCP建立时间
			page['http'] = +((time.responseEnd - time.requestStart) / 1000).toFixed(3); //HTTP请求响应完成时间
			page['doml'] = +((time.domComplete - time.domInteractive) / 1000).toFixed(3); //解析dom树耗时
			page['wit'] = +((time.responseStart - time.navigationStart) / 1000).toFixed(3); //白屏时间
			page['domr'] = +((time.domContentLoadedEventEnd - time.navigationStart) / 1000).toFixed(3); //domready时间(用户可操作时间节点)
			page['allt'] = +(page['rdt'] + page['dns'] + page['tcp'] + page['http'] + page['wit'] + page['doml'] + page['domr']).toFixed(3); //总下载时长

			return {
				"page": page,
				"dts": dts
			};
		}

		window.addEventListener('error', function(e) {
			var defaults = {
				m: '',
				h: ''
			};
			defaults.m = e.type + ":" + e.target.localName + ' is load error';
			defaults.h = e.target.href || e.target.currentSrc || e.target.src;

			if(e.target != window) opt.err.push(defaults)
		}, true);

		window.onerror = function(msg, _url, line, col, error) {
			var defaults = {
				line: line,
				col: col || (window.event && window.event.errorCharacter) || 0,
				m: error && error.stack ? error.stack.toString() : msg
			};
			opt.err.push(defaults)
		};

		window.addEventListener('unhandledrejection', function(e) {

			var defaults = {
				m: e.type + ":" + e.reason
			};

			// console.log(defaults)
			opt.err.push(defaults)
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

		function postDate(str) {
			var ajax = new XMLHttpRequest();
			ajax.open('post', '//media.weibo.com:8183/se?d=123');
			ajax.setRequestHeader("Content-type", "multipart/form-data");

			ajax.send(str);

			ajax.onreadystatechange = function() {
				if(ajax.readyState == 4 && ajax.status == 200) {
					//console.log(ajax.responseText);
				}
			}
		}

		window.onload = function() {
			setTimeout(function() {
				opt.pfm = perforPage();
				opt.dev.brw = getExplore();
				opt.dev.os = getOS()
				opt.ref = document.referrer && document.referrer !== location.href ? document.referrer : ''; //页面来源
				var str = JSON.stringify(opt);
				if(Math.random() <= opt.ps) {   //抽样采样
					postDate(str)
				}
			}, 200);
		}
		window.$_WBP = $_WBP;
	} catch(e) {}
}