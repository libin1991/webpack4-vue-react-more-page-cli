import AlertComponent from "./vue-alert.vue"; // 引入先前写好的vue
var Alert = {};
//避免重复install，设立flag
Alert.installed = false;
Alert.install = function(Vue, options) {
	if(Alert.installed) return;

	Vue.prototype.$alert = (alertMsg, okFun, abortFun) => {
		// 如果页面有toast则不继续执行
		if(document.querySelector('.vue-alert')) return;
		// 1、创建构造器，定义好提示信息的模板
		const toastTip = Vue.extend(AlertComponent);
		var obj = new toastTip();
		//2.数据和函数
		if(Object.prototype.toString.call(alertMsg).slice(8, -1).toLowerCase() == 'function') {
			obj.okFun = alertMsg;
			obj.abortFun = okFun;
			obj.alertMsg = '';
		} else {
			obj.alertMsg = alertMsg;
			obj.okFun = okFun;
			obj.abortFun = abortFun;
		}
        //删除弹框
		obj.removeAlert = function() {
			document.getElementById('zhenwu').removeChild(tpl);
		}
		//插入页面
		let tpl = obj.$mount().$el;
		document.getElementById('zhenwu').appendChild(tpl);
		Alert.installed = true;
	};
};
// 自动安装  ，有了ES6就不要写AMD，CMD了
if(typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Alert)
};

export default Alert