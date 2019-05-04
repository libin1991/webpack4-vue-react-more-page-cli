import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Layout from './layouts/IndexLayout.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import Index from './views/Index.vue'
import Me from './views/me.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
    component:Layout,
    children:[{
         path: '/',
         component: Index,
         name: 'index'
       }]
    },
    {
      path:'/login',
      component:Login,
      name:'login'
    },
    {
      path:'/logout',
      component:Logout,
      name:'logout'
    },

    {
      path:'/me',
      component:Me,
      name:'me'
    }
  ]
});

//路由守卫
   router.beforeEach((to,from,next)=>{
  if(to.name != 'login' && to.name != 'index'){
    store.dispatch('me/checkMe')
  }
   next()
})

export default router
