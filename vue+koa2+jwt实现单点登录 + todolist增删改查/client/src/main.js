import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import {
  Row,
  Col,
  Button,
  Select,
  Input,
  Message,
  Alert,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Icon,
  Notification,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'element-ui'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification

Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)



router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token') // 获取token
  if (to.name !== 'login' && to.name !== 'todoList') {
    next()
  }
  if (to.name == 'login') { // 假如登录 判断token是不是存在 存在让他跳转到主页面
    verification(token, next)
    .then((data) => {
      if (data.data.type) { // type 为1 直接跳过登录
        Message({
          showClose: true,
          message: '欢迎回来'
        });
        next('/todolist')
      } else {
        next()
      }
    })
  }

  if (to.name == 'todoList') {
    verification(token, next)
    .then((data) => {
      if (data.data.type) {
        // type 为1说明token没有失效
        // 跳转到主页面
        next()
      } else {
        // token失效 强制定位到登录页面
        if (token === null) { // 说明从来没有登陆过
          Message({
            showClose: true,
            message: '您还没有登录',
            type: 'warning'
          })
          next('/login')
        } else {
          Message.error('登录信息失效')
          next('/login')
          localStorage.removeItem('token')
        }
      }
    })
    .catch((data) => {
      console.log(data);
    })
  }

  if (to.meta.title) {
    document.title = to.meta.title
  }
})



// 验证
let verification = (token, next) => {
  return axios.post('/api/verification', { token })
}
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



