"use strict";

function post() {}

function get() {}

function _classCallCheck(e, n) {
	if(!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
}
goog.provide("util"), post.prototype.before = function() {};
var _createClass = function() {
	function e(e, n) {
		for(var t = 0; t < n.length; t++) {
			var o = n[t];
			o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
		}
	}
	return function(n, t, o) {
		return t && e(n.prototype, t), o && e(n, o), n
	}
}();
goog.provide("menu");
var Menu = function() {
	function e() {
		_classCallCheck(this, e), this.display = "不确定"
	}
	return _createClass(e, [{
		key: "show",
		value: function() {
			this.display = "显示"
		}
	}, {
		key: "hide",
		value: function() {
			this.display = "隐藏"
		}
	}, {
		key: "isShow",
		value: function() {
			return "隐藏" === this.display
		}
	}]), e
}();
goog.provide("main"), goog.require("util"), goog.require("menu");
var baz = function() {
	post();
	return 100
};
baz();