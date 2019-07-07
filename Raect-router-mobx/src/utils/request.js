/*
 * @Author: 麦乐
 * @Date: 2019-05-30 
 */
import axios from 'axios';

console.log(process.env.NODE_ENV)
// development 环境 默认是本地url
if(process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = 'https://api.huazhukuaixin.com/';
} 
axios.defaults.timeout = 30 * 1000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// 添加请求拦截器
axios.interceptors.request.use((config) => {
   
    // 在发送请求之前做些什么
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    // console.log( window.sessionStorage._csrf_token_,"axios")

    // 对响应数据做点什么
    return response;
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
});


class Check {
     _checkStatus(response) {
        // 如果http状态码正常，则直接返回数据
        if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
            return response.data;
        }
        // 异常状态下，把错误信息返回去
        return {
            status: response.status,
            msg: '请求异常'
        };
    }
    _checkCode(error) {
        // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
        if (error.status === -404) {
            alert(error.msg);
        }
        if (error.data && (!error.data.success)) {
            alert(error.data.error_msg);
        }
        return error;
    }

}
class Axios {
    _Check;
    constructor() {
        this._Check = new Check();
    }
    get(url, params = null) {
        return axios({
            url,
            params,
        }).then(
            (response) => {
                console.log(url, response)
                return this._Check._checkStatus(response);
            }
        ).catch(
            (error) => {
                console.log(url, error)
                return this._Check._checkCode(error);
            }
        );
    }
    post(url, data = null) {
        return axios({
            method: 'post',
            url,
            data,
        }).then(
            (response) => {
                console.log(url, response)
                return this._Check._checkStatus(response);
            },
        ).catch(
            (error) => {
                console.log(url, error)
                return this._Check._checkCode(error);
            },
        );
    }
}

export default new Axios();