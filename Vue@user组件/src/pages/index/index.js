import Vue from 'vue'
import App from './app.vue'
import axios from 'axios' 
import VueSkeletonLoading from '@/components/skeleton';
Vue.use(VueSkeletonLoading);
Vue.prototype.$http=axios
new Vue({
    render: h => h(App)
  }).$mount('#app')