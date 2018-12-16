let Koa = require('koa2')
const response = require('koa-bodyparser') // post解析

const router = require('./src/routes/routers') // 所有路由信息
const app = new Koa()
app.use(response())
app.listen(3000, () => {
  console.log("[koa] is starts");
})


app.use(router.routes())





