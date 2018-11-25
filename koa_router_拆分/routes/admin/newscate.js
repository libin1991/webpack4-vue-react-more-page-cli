/**
 * Created by Administrator on 2018/3/20 0020.
 */

/*用户的增加修改删除*/

var router=require('koa-router')();

router.get('/',async (ctx)=>{

    ctx.body='新闻分类首页';

})

router.get('/add',async (ctx)=>{

    ctx.body='增加新闻分类';

})


router.get('/edit',async (ctx)=>{

    ctx.body='编辑新闻分类';

})
router.get('/delete',async (ctx)=>{

    ctx.body='编辑新闻分类';

})

module.exports=router.routes();