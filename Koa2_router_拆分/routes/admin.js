/**
 * Created by Administrator on 2018/3/20 0020.
 */
var router=require('koa-router')();

var user=require('./admin/user.js');

var focus=require('./admin/focus.js');

var newscate=require('./admin/newscate.js');

//配置admin的子路由  层级路由
router.get('/',(ctx)=>{

    ctx.body='后台管理系统首页'


})

router.use('/user',user);

router.use('/focus',focus);

router.use('/newscate',newscate);


module.exports=router.routes();