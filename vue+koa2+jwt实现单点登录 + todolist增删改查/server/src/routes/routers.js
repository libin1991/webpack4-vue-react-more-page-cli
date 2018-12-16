const Router = require('koa-router')
const router = new Router()
const UserController = require('../controllers/UserController')
const ListController = require('../controllers/ListController')


router.get('/', (ctx)=> {
  ctx.body = '路由测试'
})

router.post('/regist', UserController.addUser) // 注册接口

router.post('/login', UserController.verifyUser)  // 登录接口

router.post('/verification', UserController.verification) // 验证接口

router.get('/getTodoList', ListController.getTodoList) // 获取待完成todolist接口

router.post('/addTodoList', ListController.addTodoList) // 增加todolist接口

router.post('/fulfilList', ListController.fulfilList) // 完成todolist事件接口

router.get('/getfulfilTodoList', ListController.getfulfilTodoList) // 获取已完成todolist接口

router.post('/cancelTodoList', ListController.cancelTodoList) // 撤销完成todolist接口

router.post('/deleteTodoList', ListController.deleteTodoList) // 删除事件

router.post('/updateDatas', ListController.updateDatas) // 多选更新todolist

router.post('/cancelFulfilData', ListController.cancelFulfilData) // 多选撤销todolist

router.post('/deleteFulfilData', ListController.deleteFulfilData)

router.use('/api', router.routes())
module.exports = router