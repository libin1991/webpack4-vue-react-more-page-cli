/* 滚动条动画：
 * 移动端:document.body.scrollTop
   PC端：document.documentElement.scrollTop
   
   
   
   
   //使用:gotoTop(400,callBack)
   gotoTop(durations,  callback = undefined) {
      const doc = document.documentElement
      const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      for (var i = 60; i >= 0; i--) {
        setTimeout((i => {
          return () => {
            doc.scrollTop = scrollTop * i / 60
            if (i === 0 && typeof callback === 'function') {
              callback()
            }
          }
        })(i), durations * (1 - i / 60))
      }
    }



   
 * */
var requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();
var cancelAnimationFrame = (function() {
	return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.oCancelAnimationFrame ||
		function(id) {
			window.clearTimeout(id)
		}
})()

// Tween中的方法接受4个参数t,b,c,d 。t为初始时间 b、c、d三个参数（即初始值，变化量，持续时间）。返回值为当前位置
// t => time(初始记步次数)  b => begin(初始位置)   c => change(变化量)   d => duration(持续次数)

var tween = {
	linear: function(t, b, c, d) {
		return c * t / d + b;
	},
	easeIn: function(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	strongEaseIn: function(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	strongEaseOut: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	sineaseIn: function(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	sineaseOut: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
	easeInOutQuad: function(t, b, c, d) {
		t /= d / 2;
		if(t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	}
};
var myReq; 
export var animatedScrollTo = function(element, to, duration, callback, Bzr = 'linear') {
	var start = element.scrollTop,
		change = to - start,
		animationStart = +new Date();
	var animating = true;
	var lastpos = null;

	var animateScroll = function() {
		if(!animating) {
			return;
		}
		myReq=requestAnimFrame(animateScroll);
		var now = +new Date();
		var val = Math.floor(tween[Bzr](now - animationStart, start, change, duration));

		if(lastpos) {
			if(lastpos === element.scrollTop) {
				lastpos = val;
				element.scrollTop = val;
			} else {
				animating = false;
			}
		} else {
			lastpos = val;
			element.scrollTop = val;
		}
		if(now > animationStart + duration) {
			element.scrollTop = to;
			animating = false;
			cancelAnimationFrame(myReq);   //清除定时器动画
			callback&&callback();
		}
	};
	myReq=requestAnimFrame(animateScroll);
};