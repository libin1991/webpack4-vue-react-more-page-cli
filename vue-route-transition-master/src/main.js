// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import RouteTransition from './components/vue-route-transition/'
import Vant from 'vant'
import 'vant/lib/index.css'
// import RouteTransition from '../lib/vue_route_transition.min'

Vue.config.productionTip = false
Vue.use(RouteTransition)
Vue.use(Vant)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
