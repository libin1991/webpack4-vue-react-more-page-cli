/* eslint-disable */
import '@/assets/css/com.less';
import './index.less';

console.log('首页的js运行了111～～');

import Vue from 'vue'
import App from './App.vue'

new Vue({
	el: '#app',
	components: {
		App
	},
	template: '<App/>'
})