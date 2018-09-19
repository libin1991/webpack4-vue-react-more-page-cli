import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/home',
    redirect: '/'
  }, {
    path: '/',
    name: 'home',
    component: resolve => require(['@/views/Home'], resolve),
    meta:{
      requiresAuth:true
    },
  }, {
    path: '/login',
    name: '/login',
    component: resolve => require(['@/views/Login'], resolve)
  }, {
    path: '/register',
    name: 'register',
    component: resolve => require(['@/views/Register'], resolve)
  }]
})

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.user.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){
      if(token){
        next();
      }else{
        next({
          path: '/login',
          query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
        });
      } 
  }else{
    next();
  }
});

export default router;