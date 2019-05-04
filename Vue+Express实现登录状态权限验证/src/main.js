import Vue from 'vue'
import iview from 'iview'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './axios'

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.use(iview)
Vue.prototype.$http = http;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
