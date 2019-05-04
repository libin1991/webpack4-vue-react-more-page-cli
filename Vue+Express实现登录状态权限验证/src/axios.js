import axios from 'axios';
import url from 'url';
import router from '../src/router'
//创建axios实例
var instance = axios.create({
    baseURL: '/api'
});

//拦截器
 instance.interceptors.response.use(
    function(response){
        return response;
    },function(error){
        //如果没有接口,返回接口地址
         if(error.response.status==404){
             //得到路径
             const pathname = url.parse(error.config.url).pathname;
            return {
                data:pathname
            }
          }
        //敏感接口.如果没有session跳转登录界面
        if(error.response.status==403){
            router.push({name:"login"})
        }
    }) 

export default instance;