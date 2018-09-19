import axios from 'axios';
import store from '../store';
import router from '../router';

// 全局设置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 创建一个axios的实列
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;

// request拦截器，每次发送请求的时候拦截下来
instance.interceptors.request.use(
  config => {
    // 每次发送请求，检查 vuex 中是否有token,如果有放在headers中
    if(store.state.user.token){
      config.headers.Authorization = store.state.user.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

// respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  // 除了200以外的请求到这里来，，这里的200不是我们设置的那个code200,,我这里是，没有登录才会不返回200
  error => {
    let { response } = error;
    let msg = response.data.error || '';
    alert(msg);
    // 这里为什么处理401错误,详见，server/untils/token check_token这个函数
    if(response.status == 401) {
      store.commit("remove")  // token过期,清除
      router.replace({ //跳转到登录页面
          path: '/login',
          // 添加一个重定向后缀，等登录以后再到这里来
          query: { redirect: router.currentRoute.fullPath } 
      });
      return Promise.reject(error.response);
    }
  }
)

// 添加API请求
// 这里填写的url见 server/routes/index.js 记住一定要配置代理，不然会返回404错误
export default {
  // 获取验证码
  api_get_checkcode(){
    return instance.get('/api/other/checkcode');
  },
  // 用户注册
  api_add_user(data){
    return instance.post('/api/user', data);
  },
  // 用户登录
  api_login_user(data){
    return instance.post('/api/user/login', data);
  },
  // 添加留言
  api_add_leave(data){
    return instance.post('/api/leave', data);
  },
  // 获取留言
  api_get_leave(data){
    let {page = 1, size = 10} = data;
    return instance.get(`/api/leave?page=${page}&size=${size}`);
  },
  // 删除留言
  api_del_leave(id){
    return instance.delete(`/api/leave/${id}`);
  }
}