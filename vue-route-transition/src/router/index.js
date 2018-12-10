import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: index,
      children: [{
        path: '/',
        component: r => require(['@/pages/home'], r)
      }, {
        path: '/tab',
        component: r => require(['@/pages/tab'], r)
      }, {
        path: '/swipe',
        component: r => require(['@/pages/swipe'], r)
      }]
    },
    {
      path: '/rate',
      component: r => require(['@/pages/rate'], r)
    },
    {
      path: '/button',
      component: r => require(['@/pages/button'], r)
    },
    {
      path: '/address',
      component: r => require(['@/pages/address'], r)
    },
    {
      path: '/demo',
      component: r => require(['@/pages/demo'], r)
    }
  ]
})
