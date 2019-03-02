import ToastComponent from "./vue-toast.vue"; // 引入先前写好的vue
var Toast = {};
//避免重复install，设立flag
Toast.installed = false;
Toast.install = function(Vue, options = {
	type: "success", //success fail  warning loading toast
	msg: "操作成功",
	time: 1000,
	callback() {

	}
}) {
	if(Toast.installed) return;
	var obj;
	Vue.prototype.$toast = (config = {}, type) => {
		if(type == 'close') {
			obj && obj.removeToast();
			return false;
		}
		if(typeof config=="object"){
			config = {
				...options,
				...config
			}
		}else{
			config = {
				...options,
				...{
					type: "msg", 
	                msg: config
				}
			}
		}
		
		// 如果页面有toast则不继续执行
		if(document.querySelector('.vue-toast')) return;
		// 1、创建构造器，定义好提示信息的模板
		const toastTip = Vue.extend(ToastComponent);
		obj = new toastTip();

		for(var property in config) {
			obj[property] = config[property];
		}

		//删除弹框
		obj.removeToast = function() {
			document.body.removeChild(tpl);
		}

		//插入页面
		let tpl = obj.$mount().$el;
		document.body.appendChild(tpl);
		Toast.installed = true;

		if(['success', 'fail', 'warning','msg'].indexOf(config.type) > -1) {
			setTimeout(() => {
				obj.removeToast();
				obj.callback();
			}, config.time)
		}

		['close'].forEach(function(type) {
			Vue.prototype.$toast[type] = function(msg) {
				return Vue.prototype.$toast({}, type)
			}
		});
	};
};
// 自动安装  ，有了ES6就不要写AMD，CMD了
if(typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Toast)
};

export default Toast