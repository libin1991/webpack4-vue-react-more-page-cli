/**
 * Toucher：  https://github.com/rwson/Toucher
 * build by rwson @8/15/16
 * mail:rw_Song@sina.com
 */

"use strict";

(function(root, factory) {
	if(typeof define === "function" && define.amd) {
		define([], function() {
			return factory(root);
		});
	} else {
		root.Toucher = factory(root);
	}
}(window, function(root, undefined) {

	if(!"ontouchstart" in window) {
		return;
	}

	var _wrapped;

	//  获取对象上的类名
	function _typeOf(obj) {
		return Object.prototype.toString.call(obj).toLowerCase().slice(8, -1);
	}

	//  获取当前时间戳
	function getTimeStr() {
		return +(new Date());
	}

	//  获取位置信息
	function getPosInfo(ev) {
		var _touches = ev.touches;
		if(!_touches || _touches.length === 0) {
			return;
		}
		return {
			pageX: ev.touches[0].pageX,
			pageY: ev.touches[0].pageY,
			clientX: ev.touches[0].clientX || 0,
			clientY: ev.touches[0].clientY || 0
		};
	}

	//  绑定事件
	function bindEv(el, type, fn) {
		if(el.addEventListener) {
			el.addEventListener(type, fn, {
				capture: false,
				passive: false,
				once: false
			});
		} else {
			el["on" + type] = fn;
		}
	}

	//  解绑事件
	function unBindEv(el, type, fn) {
		if(el.removeEventListener) {
			el.removeEventListener(type, fn, false);
		} else {
			el["on" + type] = fn;
		}
	}

	//  获得滑动方向
	function getDirection(startX, startY, endX, endY) {
		var xRes = startX - endX;
		var xResAbs = Math.abs(startX - endX);
		var yRes = startY - endY;
		var yResAbs = Math.abs(startY - endY);
		var direction = "";

		if(xResAbs >= yResAbs && xResAbs > 25) {
			direction = (xRes > 0) ? "Right" : "Left";
		} else if(yResAbs > xResAbs && yResAbs > 25) {
			direction = (yRes > 0) ? "Down" : "Up";
		}
		return direction;
	}

	//  取得两点之间直线距离
	function getDistance(startX, startY, endX, endY) {
		return Math.sqrt(Math.pow((startX - endX), 2) + Math.pow((startY - endY), 2));
	}

	function getLength(pos) {
		return Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
	}

	function cross(v1, v2) {
		return v1.x * v2.y - v2.x * v1.y;
	}

	//  取向量
	function getVector(startX, startY, endX, endY) {
		return(startX * endX) + (startY * endY);
	}

	//  获取角度
	function getAngle(v1, v2) {
		var mr = getLength(v1) * getLength(v2);
		if(mr === 0) {
			return 0
		};
		var r = getVector(v1.x, v1.y, v2.x, v2.y) / mr;
		if(r > 1) {
			r = 1;
		}
		return Math.acos(r);
	}

	//  获取旋转的角度
	function getRotateAngle(v1, v2) {
		var angle = getAngle(v1, v2);
		if(cross(v1, v2) > 0) {
			angle *= -1;
		}
		return angle * 180 / Math.PI;
	}

	//  包装一个新的事件对象
	function wrapEvent(ev, obj) {
		var res = {
			touches: ev.touches,
			type: ev.type
		};
		if(_typeOf(obj) === "object") {
			for(var i in obj) {
				res[i] = obj[i];
			}
		}
		return res;
	}

	//  把伪数组转换成数组
	function toArray(list) {
		if(list && (typeof list === "object") && isFinite(list.length) && (list.length >= 0) && (list.length === Math.floor(list.length)) && list.length < 4294967296) {
			return [].slice.call(list);
		}
	}

	//  判断一个元素列表里面是否有多个元素
	function isContain(collection, el) {
		if(arguments.length === 2) {
			return collection.some(function(elItem) {
				return el.isEqualNode(elItem);
			});
		}
		return false;
	}

	//  生成一个随机id
	function uId() {
		return Math.random().toString(16).slice(2);
	}

	//  事件模块
	var Event = (function() {

		var storeEvents = {};

		return {

			//  add an event handle
			add: function(type, el, handler) {
				var selector = el,
					len = arguments.length,
					finalObject = {},
					_type;
				/**
				 * Event.add("swipe", function() {
				 *      //  ...
				 * });
				 */

				if(_typeOf(el) === "string") {
					el = document.querySelectorAll(el);
				}

				if(len === 2 && _typeOf(el) === "function") {
					finalObject = {
						handler: el
					};
				} else if(len === 3 && el instanceof HTMLElement || el instanceof NodeList && _typeOf(handler) === "function") {
					/**
					 * Event.add("swipe", "#div", function(ev) {
					 *      //  ...
					 * });
					 */
					_type = _typeOf(el);
					finalObject = {
						type: _type,
						selector: selector,
						el: _type === "nodelist" ? toArray(el) : el,
						handler: handler
					};
				}

				if(!storeEvents[type]) {
					storeEvents[type] = [];
				}

				storeEvents[type].push(finalObject);
			},

			//  remove an event handle
			remove: function(type, selector) {
				var len = arguments.length;
				if(_typeOf(type) === "string" && _typeOf(storeEvents[type]) === "array" && storeEvents[type].length) {
					if(len === 1) {
						storeEvents[type] = [];
					} else if(len === 2) {
						storeEvents[type] = storeEvents[type].filter(function(item) {
							return !(item.selector === selector || _typeOf(selector) !== "string" && item.selector.isEqualNode(selector));
						});
					}
				}
			},

			//  trigger an event handle
			trigger: function(type, el, argument) {
				var len = arguments.length;

				/**
				 * Event.trigger("swipe", document.querySelector("#div"), {
				 *      //  ...
				 * });
				 */
				if(len === 3 && _typeOf(storeEvents[type]) === "array" && storeEvents[type].length) {
					storeEvents[type].forEach(function(item) {
						if(_typeOf(item.handler) === "function") {
							if(item.type && item.el) {
								argument.target = el;
								if(item.type === "nodelist" && isContain(item.el, el)) {
									item.handler(argument);
								} else if(item.el.isEqualNode && item.el.isEqualNode(el)) {
									item.handler(argument);
								}
							} else {
								item.handler(argument);
							}
						}
					});
				}
			}
		};
	})();

	//  构造函数
	function Toucher(selector) {
		return new Toucher.fn.init(selector);
	}

	Toucher.fn = Toucher.prototype = {

		//  修改原型构造器
		constructor: Toucher,

		//  初始化方法
		init: function(selector) {
			this.el = selector instanceof HTMLElement ? selector :
				_typeOf(selector) === "string" ? document.querySelector(selector) : null;
			if(_typeOf(this.el) === "null") {
				throw new Error("you must specify a particular selector or a particular DOM object");
			}
			this.scale = 1;
			this.pinchStartLen = null;
			this.isDoubleTap = false;
			this.triggedSwipeStart = false;
			this.triggedLongTap = false;
			this.delta = null;
			this.last = null;
			this.now = null;
			this.tapTimeout = null;
			this.singleTapTimeout = null;
			this.longTapTimeout = null;
			this.swipeTimeout = null;
			this.startPos = {};
			this.endPos = {};
			this.preTapPosition = {};

			this.cfg = {
				doubleTapTime: 400,
				longTapTime: 700
			};

			//  绑定4个事件
			bindEv(this.el, "touchstart", this._start.bind(this));
			bindEv(this.el, "touchmove", this._move.bind(this));
			bindEv(this.el, "touchcancel", this._cancel.bind(this));
			bindEv(this.el, "touchend", this._end.bind(this));
			return this;
		},

		//  提供config方法进行配置
		config: function(option) {
			if(_typeOf(option) !== "object") {
				throw new Error("method Toucher.config must pass in an anguments which is an instance of Object, but passed in " + option.toString());
			}
			for(var i in option) {
				this.cfg[i] = option[i];
			}
			return this;
		},

		//  on方法绑定事件
		/**
		 * var toucher = Toucher({...});
		 *
		 * toucher.on("swipe", function(ev) {
		 *     //   ...
		 * });
		 *
		 * //   or
		 *
		 * toucher.on("tap", "#id", function(ev) {
		 *     //   ...
		 * });
		 *
		 * support events: singleTap,longTap,swipe,swipeStart,swipeEnd,swipeUp,swipeRight,swipeDown,swipeLeft,pinch,rotate
		 *
		 */

		on: function(type, el, callback) {
			var len = arguments.length;
			if(len === 2) {
				Event.add(type, el);
			} else {
				Event.add(type, el, callback);
			}
			return this;
		},

		//  off 解除绑定
		/**
		 *  var toucher = Toucher({...});
		 *  toucher.off(type);
		 *
		 *  //  or
		 *
		 *  toucher.off(type, selector);
		 */
		off: function(type, selector) {
			Event.remove(type, selector);
			return this;
		},

		//  手指刚触碰到屏幕
		_start: function(ev) {
			if(!ev.touches || ev.touches.length === 0) {
				return;
			}

			var self = this;
			var otherToucher, v,
				preV = this.preV,
				target = ev.target;

			self.now = getTimeStr();
			self.startPos = getPosInfo(ev);
			self.delta = self.now - (self.last || self.now);
			self.triggedSwipeStart = false;
			self.triggedLongTap = false;

			//  快速双击
			if(JSON.stringify(self.preTapPosition).length > 2 && self.delta < self.cfg.doubleTapTime && getDistance(self.preTapPosition.clientX, self.preTapPosition.clientY, self.startPos.clientX, self.startPos.clientY) < 25) {
				self.isDoubleTap = true;
			}

			//  长按定时
			self.longTapTimeout = setTimeout(function() {
				_wrapped = {
					el: self.el,
					type: "longTap",
					timeStr: getTimeStr(),
					position: self.startPos,
					originalEvent: ev
				};
				Event.trigger("longTap", target, _wrapped);
				self.triggedLongTap = true;
			}, self.cfg.longTapTime);

			//  多个手指放到屏幕
			if(ev.touches.length > 1) {
				self._cancelLongTap();
				otherToucher = ev.touches[1];
				v = {
					x: otherToucher.pageX - self.startPos.pageX,
					y: otherToucher.pageY - self.startPos.pageY
				};
				this.preV = v;
				self.pinchStartLen = getLength(v);
				self.isDoubleTap = false;
			}

			self.last = self.now;
			self.preTapPosition = self.startPos;

			ev.stopPropagation();
		},

		//  手指在屏幕上移动
		_move: function(ev) {
			if(!ev.touches || ev.touches.length === 0) {
				return;
			}

			var v, otherToucher;
			var self = this;
			var len = ev.touches.length;
			var posNow = getPosInfo(ev);
			var preV = self.preV;
			var currentX = posNow.pageX;
			var currentY = posNow.pageY;
			var target = ev.target;

			//  手指移动取消长按事件和双击
			self._cancelLongTap();
			self.isDoubleTap = false;

			//  一次按下抬起只触发一次swipeStart
			if(!self.triggedSwipeStart) {
				_wrapped = {
					el: self.el,
					type: "swipeStart",
					timeStr: getTimeStr(),
					position: posNow,
					originalEvent: ev
				};
				Event.trigger("swipeStart", target, _wrapped);
				self.triggedSwipeStart = true;
			} else {
				_wrapped = {
					el: self.el,
					type: "swipe",
					timeStr: getTimeStr(),
					position: posNow,
					originalEvent: ev
				};
				Event.trigger("swipe", target, _wrapped);
			}

			if(len > 1) {
				otherToucher = ev.touches[1];
				v = {
					x: otherToucher.pageX - currentX,
					y: otherToucher.pageY - currentY
				};

				//  缩放
				_wrapped = wrapEvent(ev, {
					el: self.el,
					type: "pinch",
					scale: getLength(v) / this.pinchStartLen,
					timeStr: getTimeStr(),
					position: posNow,
					originalEvent: ev
				});
				Event.trigger("pinch", target, _wrapped);

				//  旋转
				_wrapped = wrapEvent(ev, {
					el: self.el,
					type: "rotate",
					angle: getRotateAngle(v, preV),
					timeStr: getTimeStr(),
					position: posNow,
					originalEvent: ev
				});
				Event.trigger("rotate", target, _wrapped);
				ev.preventDefault();
			}

			self.endPos = posNow;

			ev.stopPropagation();
		},

		//  触碰取消
		_cancel: function(ev) {
			clearTimeout(this.longTapTimeout);
			clearTimeout(this.tapTimeout);
			clearTimeout(this.swipeTimeout);
			clearTimeout(self.singleTapTimeout);

			ev.stopPropagation();
		},

		//  手指从屏幕离开
		_end: function(ev) {
			if(!ev.changedTouches) {
				return;
			}

			//  取消长按
			this._cancelLongTap();

			var self = this;
			var direction = getDirection(self.endPos.clientX, self.endPos.clientY, self.startPos.clientX, self.startPos.clientY);
			var callback, target = ev.target;

			if(direction !== "") {
				self.swipeTimeout = setTimeout(function() {
					_wrapped = wrapEvent(ev, {
						el: self.el,
						type: "swipe",
						timeStr: getTimeStr(),
						position: self.endPos,
						originalEvent: ev
					});
					Event.trigger("swipe", target, _wrapped);

					//  获取具体的swipeXyz方向
					callback = self["swipe" + direction];
					_wrapped = wrapEvent(ev, {
						el: self.el,
						type: "swipe" + direction,
						timeStr: getTimeStr(),
						position: self.endPos,
						originalEvent: ev
					});
					Event.trigger(("swipe" + direction), target, _wrapped);

					_wrapped = wrapEvent(ev, {
						el: self.el,
						type: "swipeEnd",
						timeStr: getTimeStr(),
						position: self.endPos,
						originalEvent: ev
					});
					Event.trigger("swipeEnd", target, _wrapped);
				}, 0);
			} else if(!self.triggedLongTap) {
				self.tapTimeout = setTimeout(function() {
					if(self.isDoubleTap) {
						_wrapped = wrapEvent(ev, {
							el: self.el,
							type: "doubleTap",
							timeStr: getTimeStr(),
							position: self.startPos,
							originalEvent: ev
						});
						Event.trigger("doubleTap", target, _wrapped);
						clearTimeout(self.singleTapTimeout);
						self.isDoubleTap = false;
					} else {
						self.singleTapTimeout = setTimeout(function() {
							_wrapped = wrapEvent(ev, {
								el: self.el,
								type: "singleTap",
								timeStr: getTimeStr(),
								position: self.startPos,
								originalEvent: ev
							});
							Event.trigger("singleTap", target, _wrapped);
						}, 100);
					}
				}, 0);
			}

			this.startPos = {};
			this.endPos = {};

			ev.stopPropagation();
		},

		//  取消长按定时器
		_cancelLongTap: function() {
			if(_typeOf(this.longTapTimeout) !== "null") {
				clearTimeout(this.longTapTimeout);
			}
		}
	};

	Toucher.fn.init.prototype = Toucher.fn;

	return Toucher;

}));