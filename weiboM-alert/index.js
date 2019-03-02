import AlertComponent from "./vue-alert.vue"; // 引入先前写好的vue
var Alert = {};
//避免重复install，设立flag
Alert.installed = false;
Alert.install = function(Vue) {
	if(Alert.installed) return;

	Vue.prototype.$alert = (config = {}) => {
		config = {
			...{
				title1: "",
				title2: "",
				success: function() {

				},
				fail: function() {

				}
			},
			...config
		}
		// 如果页面有toast则不继续执行
		if(document.querySelector('.vue-alert')) return;
		// 1、创建构造器，定义好提示信息的模板
		const toastTip = Vue.extend(AlertComponent);
		var obj = new toastTip();

		for(var property in config) {
			obj[property] = config[property];
		}

		//删除弹框
		obj.removeAlert = function() {
			document.body.removeChild(tpl);
		}
		//插入页面
		let tpl = obj.$mount().$el;
		document.body.appendChild(tpl);
		Alert.installed = true;
	};
};
// 自动安装  ，有了ES6就不要写AMD，CMD了
if(typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Alert)
};

export default Alert