# Vue+Koa2使用jwt实现单点登录

对上一个版本的代码很不满意,现在看起来太多地方需要优化,索性重写一个

## (客户端)client:

- vue
- vue-router
- axios
- element
- jsonwebtoken

## (服务端)server

- koa2
- koa-bodyparser
- koa-router
- md5
- mongoose
- pm2

### 实现了什么功能?

- [x] 登录
- [x] 注册
- [x] 注销
- [x] todolist增加 修改 删除 查看
- [x] todolist多选操作
- [ ] 对tidolist数量的统计



### jwt验证模式

![](http://on7r0tqgu.bkt.clouddn.com/FvoRAnFA_E0WXkGe3gPRA3jR60LS.png)

这里token存储在`localStorage`里面,还有一种做法是存出来cookice里面,代码可能有点变化,但是效果是一模一样的

**login**

![](http://on7r0tqgu.bkt.clouddn.com/FiZIWOPLsjp2-8LqCwZ44Yotl9LU.png )

**registry**

![](http://on7r0tqgu.bkt.clouddn.com/FlPsZhkoQIbWWeTc0MXq3Fmtoi0v.png )

**todolist**

![](http://on7r0tqgu.bkt.clouddn.com/FqcmSDVQbb63idhiolJEmAbPzq-8.png )

![](http://on7r0tqgu.bkt.clouddn.com/Fogd4HkffGZkqPGkU2-T6F1H_Cg1.png )






> 关于路由控制的思路

```JavaScript
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token') // 获取token

  if (to.name == 'login') { // 假如登录 判断token是不是存在 存在让他跳转到主页面
    verification(token, next)
    .then((data) => {
      if (data.data.type) { // type 为1 直接跳过登录
        Message({
          showClose: true,
          message: '您已经登录,重新登录请退出账户'
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
```

后端统一验证接口`/api/verification`,每次路由跳转都判断token是不是过期或者被改动

## 没有登录的情况下

当第一次登录 token不存在 则肯定后端相应0 直接通过

没有登录的情况下,去访问登录后的页面,没登录, token分别提示

````JavaScript
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
````

这就又到`login` type肯定为0, 通过 next()



## 登录的情况下

token已经存在,type为1,在访问`/todoList`的情况下,`next()`

访问`/login`,type为1,跳转到`/todolist`,同时给用户一个提示

```JavaScript
if (data.data.type) { // type 为1 直接跳过登录
  Message({
    showClose: true,
    message: '您已经登录,重新登录请退出账户'
  });
  next('/todolist')
} else {
  next()
}
```





