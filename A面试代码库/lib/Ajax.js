import axios from 'axios';
axios.interceptors.request.use(function(config) {
	console.log("开始发送请求！")
	return config;
}, function(error) {
	console.log("请求错误时做些事");
	return Promise.reject(error);
});
export default function Ajax(method) { //http://www.tuicool.com/articles/amQBruF

	return function(url, data, onSuccess, onFail, msg) {
		if(method == "all" && Array.isArray(url)) {
			onSuccess = data;
			data = {};
			return axios.all(url).then(axios.spread(function(acct, perms) {
				console.log(acct);
				console.log(perms);
				onSuccess && onSuccess();
			})).catch(function() {
				onFail && onFail();
			})
		}
		if(typeof data == 'function') {
			msg = onFail;
			onFail = onSuccess;
			onSuccess = data;
			data = {};
			if(method == "get") {
				data = '';
			}
		}
		axios({
			method: method,
			url: url,
			responseType: 'json',
			data: data
		}).then(function(data) {
			if(data.status == 200) {
				onSuccess && onSuccess(data.data);
			}
		}).catch(function(data) {
			onFail && onFail(data);
		});
	}
}

export const _get = Ajax("get")
export const _post = Ajax("post")
export const _all = Ajax("all")
export const _all_get = axios.get
export const _all_post = axios.post