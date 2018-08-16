/*
animatedScrollTo(  //移动端:document.body.scrollTop     PC端：document.documentElement.scrollTop
								document.body,H,500,function(){
									console.log('done!');
								}
							)
 * */


var requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

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

export var animatedScrollTo = function(element, to, duration,callback, Bzr='linear') {
	var start = element.scrollTop,
		change = to - start,
		animationStart = +new Date();
	var animating = true;
	var lastpos = null;

	var animateScroll = function() {
		if(!animating) {
			return;
		}
		requestAnimFrame(animateScroll);
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
			if(callback) {
				callback();
			}
		}
	};
	requestAnimFrame(animateScroll);
};