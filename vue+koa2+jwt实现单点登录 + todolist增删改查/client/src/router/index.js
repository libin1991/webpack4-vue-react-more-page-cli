import Vue from 'vue'
import Router from 'vue-router'
import todoList from '@/components/todoList'
import login from '@/components/login'
import registry from '@/components/registry'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*', // 所有路由重定向到登录页面
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/todolist',
      name: 'todoList',
      component: todoList,
      meta: {
        title: '事件列表'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '欢迎登录'
      }
    },
    {
      path: '/registry',
      name: 'registry',
      component: registry,
      meta: {
        title: '注册账户'
      }
    }
  ]
})
