import axios from 'axios';
import qs from 'qs';
import Vue from 'vue'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

if(process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = 'http://gov.weibo.com:8777'
} else {
	axios.defaults.baseURL = ''
}
//http请求拦截器
axios.interceptors.request.use(config => {
	return config
}, error => {
	return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
	switch(data.data.code) {
		case 0:{
				return data;
				break;
			}
		case 5:{
				Vue.prototype.$toast(data.data.msg);
				setTimeout(() => {
					location.href = 'https://weibo.com';
				}, 2000);
				break;
			}
		default:{
				Vue.prototype.$toast(`请求失败, ${data.data.msg}`);
                return data;
			}
	}
}, error => {
	return Promise.reject(error)
})

import * as index from './indexPage.js';
import * as home from './homePage.js';
import * as analysis from './analysisPage.js';
import * as godview from './godview.js';
export {
	index,
	home,
	analysis,
	godview
};