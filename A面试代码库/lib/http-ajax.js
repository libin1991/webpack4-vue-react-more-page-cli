/* global module,define,console */
(function(factory) {
	"use strict";

	if(typeof exports === "object" && typeof module === "object") {
		module.exports = factory();
	} else if(typeof define === "function" && (define.amd || define.cmd)) {
		define(factory);
	} else {
		window.httpx = factory();
	}
})(function() {

	"use strict";

	/**
	 * Extend Object
	 *
	 * @param {object} dist
	 * @param {object} source
	 * @return {object} dist
	 */

	function extend(dist, source) {
		for(var key in source) {
			if(source.hasOwnProperty(key)) {
				dist[key] = source[key];
			}
		}

		return dist;
	}

	/**
	 * Query url & strings build
	 *
	 * @param  {string} url  request url
	 * @param  {object} data request datas
	 * @return {object}
	 */

	function urlBuild(url, data) {

		if(typeof data === "object") {
			var temp = [];

			for(var i in data) {
				temp.push(i + "=" + encodeURIComponent(data[i]));
			}

			data = temp.join("&");
		}

		url = url + ((url.indexOf("?") < 0) ? ((data === "" || !data) ? "" : "?") : (data === "" || !data) ? "" : "&") + data;

		return {
			url: url,
			data: data
		};
	}

	var httpx = {
		version: "0.3.0",

		useXDR: false,

		logPrefix: "HTTPx.js:",

		/**
		 * Create XHR object
		 *
		 * @param  {boolean} [xdomain=false]
		 * @return {object}  xhr              XMLHttpRequest or XDomainRequest
		 */

		xhr: function(xdomain) {
			if(typeof xdomain === "undefined") {
				xdomain = false;
			}

			try {
				var xhr = xdomain ? new XDomainRequest() : new XMLHttpRequest(); // IE7+, XMLHttpRequest Level 1

				return xhr;
			} catch(e) {
				console.error(e);

				return null;
			}
		},

		/**
		 * Get default's configs
		 *
		 * @param  {string}         name
		 * @return {string|object}
		 */

		defaults: function(name) {

			name = name || "";

			var $defaults = {
				debug: false,
				async: true,
				timeout: 3000,
				method: "GET",
				url: "",
				data: "",
				dataType: "text",
				headers: {},
				contentType: "text/plain; charset=UTF-8",
				jsonp: "callback", // for query string
				success: function() {},
				error: function(method, url) {
					console.error("HTTP Request Error: ", method, url, this.status + " (" + ((this.statusText) ? this.statusText : "Unkown Error / Timeout") + ")");
				},
				ontimeout: function(method, url) {
					console.error("HTTP Request Timeout: ", method, url, this.status + " (" + ((this.statusText) ? this.statusText : "Timeout") + ")");
				}
			};

			return(name !== "" && typeof name === "string") ? $defaults[name] : $defaults;
		},

		/**
		 * check need using XDomainRequest
		 *
		 * @param   {string}   url
		 * @returns {boolean}  useXDR
		 */

		needUseXDomainRequest: function(url) {
			var useXDR = false;

			// For IE8 & IE9
			if(/^((http:|https:)?\/\/)/.test(url) && location.hostname.indexOf(url) < 0) {
				if(window.XDomainRequest) {
					useXDR = true;
				}
			}

			return useXDR;
		},

		/**
		 * XHR requester
		 *
		 * @param  {object}        [options={}]  reqeust options
		 * @return {void|boolean}  void
		 */

		request: function(options) {
			options = options || {};

			var settings = extend(this.defaults(), options);

			settings.method = settings.method.toUpperCase();

			var useXDR = false;
			var url = settings.url;
			var data = settings.data;
			var method = settings.method;
			var urlData = urlBuild(url, data);

			if(settings.debug) {
				console.log(this.logPrefix + " settings =>", settings);
			}

			data = urlData.data;

			if(method === "GET") {
				url = urlData.url;
			}

			if(this.needUseXDomainRequest(url)) {
				useXDR = true;

				if(settings.debug) {
					console.warn(this.logPrefix + " Cross domain request using XDomainRequest.");
					console.warn(location.hostname + " => " + url);
				}

				if(!window.addEventListener && !/MSIE 8\.0/.test(navigator.userAgent)) {
					console.error(this.logPrefix + " Your browser can'nt support cross domain request => " + url + ".");

					return false;
				}
			}

			var xhr = this.xhr(useXDR);

			if(!xhr) {
				return false;
			}

			var success = function() {
				var result;

				switch(settings.dataType) {
					case "json":
						result = JSON.parse(xhr.responseText);
						break;
					case "xml":
						result = xhr.responseXML;
						break;
					default:
						result = xhr.responseText;
						break;
				}

				settings.success.bind(xhr)(result);
			};

			var readyStateChange = function(e) {
				if(xhr.readyState === 4) {
					if(xhr.status === 200 || xhr.status === 304) {
						success();
					} else {
						settings.error.bind(xhr)(method, url, e);
					}
				}
			};

			if(useXDR) {
				xhr.onload = success;

				xhr.onerror = function(e) {
					settings.error.bind(xhr)(method, url, e);
				};

				xhr.ontimeout = function(e) {
					settings.ontimeout.bind(xhr)(method, url, e);
				};

				if(method !== "GET" && method !== "OPTIONS") {
					method = "POST";
				} else if(method === "OPTIONS") {
					method = "GET";
				}
			} else {
				xhr.addEventListener("readystatechange", readyStateChange);

				xhr.addEventListener("error", function(e) {
					settings.error.bind(xhr)(method, url, e);
				});

				xhr.addEventListener("timeout", function(e) {
					settings.ontimeout.bind(xhr)(method, url, e);
				});
			}

			xhr.open(method, url, settings.async);

			var contentType = settings.contentType;

			if(!useXDR) {
				if(method !== "GET") {
					contentType = "application/x-www-form-urlencoded";
				}

				xhr.setRequestHeader("Content-type", contentType);

				// Custom http headers, you can override default's Content-Type header.
				for(var key2 in settings.headers) {
					xhr.setRequestHeader(key2, settings.headers[key2]);
				}
			}

			// New property
			xhr.$request = {
				url: url,
				method: method,
				dataType: settings.dataType,
				contentType: contentType,
				headers: settings.headers
			};

			// Compatibility v0.1.0~0.2.0
			xhr.$url = url;
			xhr.$method = method;
			xhr.$dataType = settings.dataType;
			xhr.timeout = settings.timeout;

			xhr.send(data);
		},

		/**
		 * Execute request for short methods
		 *
		 * @param  {string}        method   HTTP method
		 * @param  {string|object} url      request url or options k/v object
		 * @param  {object}        data     request datas
		 * @param  {function}      callback Success callback
		 * @param  {function}      error    Error callback
		 * @param  {object}        options  Request options
		 * @return {void}
		 */

		exec: function(method, url, data, callback, error, options) {
			data = data || {};
			callback = callback || function() {};
			error = error || this.defaults("error");
			options = options || {};

			if(typeof data === "function") {
				error = callback;
				callback = data;
				data = "";
			}

			var defaults = {
				url: url,
				method: method,
				data: data,
				success: callback,
				error: error
			};

			if(typeof url === "object") {
				options = url;
				options.method = method;
			}

			this.request(extend(defaults, options));
		},

		/**
		 * GET method
		 *
		 * @param  {string|object} url      request url or options k/v object
		 * @param  {object}        data     request datas
		 * @param  {function}      callback Success callback
		 * @param  {function}      error    Error callback
		 * @param  {object}        options  Request options
		 * @return {void}
		 */

		get: function(url, data, callback, error, options) {
			this.exec("GET", url, data, callback, error, options);
		},

		/**
		 * POST method
		 *
		 * @param  {string|object} url      request url or options k/v object
		 * @param  {object}        data     request datas
		 * @param  {function}      callback Success callback
		 * @param  {function}      error    Error callback
		 * @param  {object}        options  Request options
		 * @return {void}
		 */

		post: function(url, data, callback, error, options) {
			this.exec("POST", url, data, callback, error, options);
		},

		/**
		 * PUT method
		 *
		 * @param  {string|object} url      request url or options k/v object
		 * @param  {object}        data     request datas
		 * @param  {function}      callback Success callback
		 * @param  {function}      error    Error callback
		 * @param  {object}        options  Request options
		 * @return {void}
		 */

		put: function(url, data, callback, error, options) {
			this.exec("PUT", url, data, callback, error, options);
		},

		/**
		 * PATCH method
		 *
		 * @param  {string|object} url      request url or options k/v object
		 * @param  {object}        data     request datas
		 * @param  {function}      callback Success callback
		 * @param  {function}      error    Error callback
		 * @param  {object}        options  Request options
		 * @return {void}
		 */

		patch: function(url, data, callback, error, options) {
			this.exec("PATCH", url, data, callback, error, options);
		},

		/**
		 * DELETE method
		 *
		 * @param  {string|object} url      request url or options k/v object
		 * @param  {object}        data     request datas
		 * @param  {function}      callback Success callback
		 * @param  {function}      error    Error callback
		 * @param  {object}        options  Request options
		 * @return {void}
		 */

		"delete": function(url, data, callback, error, options) {
			this.exec("DELETE", url, data, callback, error, options);
		},

		/**
		 * Get json, link jQuery getJSON()
		 *
		 * @param  {string|object} url      request url or options k/v object
		 * @param  {object}        data     request datas
		 * @param  {function}      callback Success callback
		 * @param  {function}      error    Error callback
		 * @param  {object}        options  Request options
		 * @return {void}
		 */

		json: function(url, data, callback, error, options) {
			data = data || {};
			callback = callback || function() {};
			error = error || this.defaults("error");
			options = options || {};

			if(typeof data === "function") {
				error = callback;
				callback = data;
				data = "";
			}

			var defaults = {
				url: url,
				dataType: "json",
				method: "GET",
				data: data,
				success: callback,
				error: error
			};

			if(typeof url === "object") {
				options = url;
				options.method = "GET";
				options.dataType = "json";
			}

			this.request(extend(defaults, options));
		},

		/**
		 * Alias json()
		 *
		 * @param  {string|object} url      request url or options k/v object
		 * @param  {object}        data     request datas
		 * @param  {function}      callback Success callback
		 * @param  {function}      error    Error callback
		 * @param  {object}        options  Request options
		 * @return {void}
		 */

		getJSON: function(url, data, callback, error, options) {
			this.json(url, data, callback, error, options);
		},

		/**
		 * JSONP method
		 *
		 * @param  {string|object} url          request url or options k/v object
		 * @param  {object}        data         request datas
		 * @param  {function}      callback     Success callback
		 * @param  {string}        callbackName for query string name
		 * @return {void}
		 */

		jsonp: function(url, data, callback, callbackName) {
			callbackName = callbackName || "callback";

			if(typeof data === "function") {
				callbackName = callback;
				callback = data;
				data = "";
			}

			var urlData = urlBuild(url, data);

			url = urlData.url;
			data = urlData.data;

			var fn = "__jsonp_" + callbackName + (new Date()).getTime() + "_" + Math.floor(Math.random() * 100000) + "__";

			url += ((url.indexOf("?") < 0) ? "?" : "&") + callbackName + "=" + fn;

			var evalJsonp = function(callback) {
				return function(data) {

					if(typeof data === "string") {
						try {
							data = JSON.parse(data);
						} catch(e) {}
					}

					data = data || {};

					callback(data, url);
					window[fn] = null;
					document.body.removeChild(document.getElementById(fn));
				};
			};

			window[fn] = evalJsonp(callback);

			var script = document.createElement("script");
			script.src = url;
			script.async = true;
			script.id = fn;
			document.body.appendChild(script);
		},

		/**
		 * Get script file, like jQuery getScript()
		 *
		 * @param   {string}   src      javascript file path
		 * @param   {function} callback loaded callback function
		 * @returns {void}
		 */

		getScript: function(src, callback) {
			if(src === "") {
				console.error("Error: Get script source can't be empty");
				return;
			}

			callback = callback || function() {};

			var head = document.getElementsByTagName("head")[0];
			var loaded = document.querySelectorAll("script[src=\"" + src + "\"]");

			if(loaded.length > 0) {
				head.removeChild(loaded[0]);
			}

			var script = document.createElement("script");
			script.type = "text/javascript";

			script.onload = script.onreadystatechange = function() {
				if(!script.readyState || /loaded|complete/.test(script.readyState)) {
					script.onload = script.onreadystatechange = null;
					script = undefined;
					callback();
				}
			};

			script.src = src;
			script.async = true;

			head.appendChild(script);
		}
	};

	return httpx;
});