//express服务器
const express = require('express')
//中间件--用于下发session
const session = require('express-session')
const app = express()

//使用express-session下发session
app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

//私密接口请求数据
  app.get('/', function (req, res) {
    if(req.session.login){
      res.send("hello world")
    }else{
    res.send(403)
    }
  })

//登录接口,更改session状态
app.get('/login', function (req, res) { 
  req.session.login = true,
  res.send(true)
})

//验证是否登录
app.get('/me', function (req, res) { 
  if(req.session.login){
    res.send(true)
  }else{
    res.send(false)
  }
})

//注销接口,更改session状态
app.get('/logout', function (req, res) { 
  req.session.login = false,
  res.send(false)
})
 
app.listen(3000)