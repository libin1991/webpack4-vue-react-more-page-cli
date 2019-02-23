import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import clem from './views/clem/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
     {
      path: '/li',
      name: 'li',
      component: clem
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
