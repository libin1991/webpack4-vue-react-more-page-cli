import Vue from 'vue'
import App from './page1.vue'
import "@/style/common.less"

console.log("111")

new Vue({
    render: h => h(App)
  }).$mount('#app')