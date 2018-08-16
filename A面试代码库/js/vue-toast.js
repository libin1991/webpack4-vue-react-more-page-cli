var Toast = {};
//避免重复install，设立flag
Toast.installed = false;
Toast.install = function(Vue, options) {
	if(Toast.installed) return;
	let opt = {
		// 默认显示位置
		defaultType: "center",
		// 默认持续时间
		duration: "3000"
	}
	// 使用options的配置
	for(let i in options) {
		opt[i] = options[i]
	}
	Vue.prototype.$toast = (toast, type) => {
		// 如果有传type，位置则设为该type
		var chooseType = type ? type : opt.defaultType;
		// 如果页面有toast则不继续执行
		if(document.querySelector('.vue-toast')) return;
		// 1、创建构造器，定义好提示信息的模板
		let toastTip = Vue.extend({
			template: `
						           <div class="vue-toast">
						              <div class="vue-tip tip-${chooseType} fadeIn">${toast}</div>
						           </div>
						          `
		});
		// 2、创建实例，挂载到文档以后的地方
		console.log(new toastTip().$mount())
		let tpl = new toastTip().$mount().$el;
		// 3、把创建的实例添加到body中
		document.body.appendChild(tpl);
		// 4.三秒后移除
		setTimeout(() => {
			document.body.removeChild(tpl);
		}, opt.duration);
		//阻止遮罩滑动
		document.querySelector("div.vue-toast").addEventListener("touchmove", function(e) {
			e.stopPropagation();
			e.preventDefault();
		});

		Toast.installed = true;

	};
	// 显示不同的位置
	['bottom', 'top', 'center'].forEach(type => {
		Vue.prototype.$toast[type] = (tips) => {
			return Vue.prototype.$toast(tips, type)
		}
	})
};
// 自动安装  ，有了ES6就不要写AMD，CMD了

if(typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Toast)
};

export default Toast