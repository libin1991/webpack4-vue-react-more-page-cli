(function () {
	var plugin;
	plugin = function (Vue) {
		return Vue.directive('keep-scroll-position', {
			bind: function (el) {
				el.addEventListener('scroll', function (event) {
					event.target.setAttribute('data-vue-keep-scroll-position', event.target.scrollLeft + '-' + event.target.scrollTop);
				});
			},
			inserted: function (el) {
				var i, len, pos, target, targets;
				targets = el.querySelectorAll('[data-vue-keep-scroll-position]');
				if (targets.length > 0) {
					for (i = 0, len = targets.length; i < len; i++) {
						target = targets[i];
						pos = target.getAttribute('data-vue-keep-scroll-position').split('-');
						target.scrollLeft = pos[0];
						target.scrollTop = pos[1];
					}
				} else {
					if (el.hasAttribute('data-vue-keep-scroll-position')) {
						pos = el.getAttribute('data-vue-keep-scroll-position').split('-');
						el.scrollLeft = pos[0];
						el.scrollTop = pos[1];
					}
				}
			}
		});
	};
	if (typeof Vue !== "undefined" && Vue !== null) {
		Vue.use(plugin);
	}
	if (typeof exports === 'object' && typeof module === 'object') {
		return module.exports = plugin;
	} else if (typeof define === 'function' && define.amd) {
		return define(function () {
			return plugin;
		});
	} else if (typeof window !== "undefined" && window !== null) {
		return window.VueKeepScrollPosition = plugin;
	}
})();