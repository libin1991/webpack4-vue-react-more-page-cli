import LoadingComponent from './vue-loading'
var Loading = {};
//避免重复install，设立flag
Loading.installed = false;
Loading.install = function(Vue, options) {
    if(Loading.installed) return;
    Vue.prototype.$loading = (load,okfun) => {
        //文字 位置 回调函数
        // 如果页面有loading则不继续执行
        if(document.querySelector('.vue-loading')) return;
        var loadext = Vue.extend(LoadingComponent);
        var obj = new loadext();
        //2.数据和函数
        if(Object.prototype.toString.call(load).slice(8,-1).toLowerCase()=="function") {
            okfun = load;
            obj.loadMsg = '';
        } else {
            obj.loadMsg = load;
        }
        setTimeout(()=>{
            okfun && okfun();
            document.body.removeChild(tpl);
        },6000)

        let tpl = obj.$mount().$el;
		// 3、把创建的实例添加到body
        document.body.appendChild(tpl);
        //删除loading实例
		obj.removeLoad= function() {
			document.body.removeChild(tpl);
        }
        Loading.installed = true;
    }
}
if(typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Alert)
};
export default Loading