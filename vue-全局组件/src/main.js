import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false



 

const requireAll = context => context.keys().map(context);

const component = require.context('./components', false, /\.vue$/);


requireAll(component).forEach(({default:item}) => {
	console.log(item)
	Vue.component(`wb-${item.name}`, item);
});





new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')