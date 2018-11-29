var Koa = require('koa'),
	router = require('koa-router')(),
	render = require('koa-art-template'),
	path = require('path'),
	fs = require('fs'),
	bodyParser = require('koa-bodyparser'),
	stc = require('koa-static'),
	DB = require('./module/db.js');
const koaBody = require('koa-body');
var imgUrl = 'images/a.png';
var app = new Koa();
app.use(koaBody({
	multipart: true,
	formidable: {
		maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
	}
}));
//配置post提交数据的中间件
app.use(bodyParser());
app.use(stc(
	path.join(__dirname, './static')
))
//配置 koa-art-template模板引擎
render(app, {
	root: path.join(__dirname, 'views'), // 视图的位置
	extname: '.html', // 后缀名
	debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
});
//显示学员信息
router.get('/', async(ctx) => {

	var result = await DB.find('user', {});

	console.log(result);
	await ctx.render('index', {
		list: result
	});
})
//增加学员
router.get('/add', async(ctx) => {

	await ctx.render('add');
})

//执行增加学员的操作
router.post('/doAdd', async(ctx) => {

	//获取表单提交的数据

	// console.log(ctx.request.body);  //{ username: '王麻子', age: '12', sex: '1' }

	let data = await DB.insert('user', ctx.request.body);
	//console.log(data);
	try {
		if(data.result.ok) {
			ctx.redirect('/')
		}
	} catch(err) {
		console.log(err);
		return;
		ctx.redirect('/add');
	}
});
router.post('/getnews', async(ctx) => {
	let a = await ctx.request.body
	console.log(a)
	console.log(ctx.request);

	return ctx.body = {
		code: 200,
		data: {
			arr: [1, 2, 3, 4],
			obj: ctx.request.body
		}
	};
});

router.post('/uploadPic', async(ctx, next) => {
	const file = ctx.request.files.file; // 上传的文件在ctx.request.files.file
	// 创建可读流
	const reader = fs.createReadStream(file.path);
	// 修改文件的名称
	var myDate = new Date();
	var newFilename = file.name.split('.')[0] + '_' + myDate.getTime() + '.' + file.name.split('.')[1];
	var targetPath = path.join(__dirname, './static/upload/') + `/${newFilename}`;
	//创建可写流
	const upStream = fs.createWriteStream(targetPath);
	// 可读流通过管道写入可写流
	reader.pipe(upStream);
	//ctx.redirect('/')

	imgUrl = 'http://' + ctx.headers.host + '/upload/' + newFilename

	ctx.redirect('/news');
	//返回保存的路径
	return ctx.body = {
		code: 200,
		data: {
			url: 'http://' + ctx.headers.host + '/upload/' + newFilename
		}
	};
});
//编辑学员
router.get('/edit', async(ctx) => {
	//通过get传过来的id来获取用户信息

	let id = ctx.query.id;

	let data = await DB.find('user', {
		"_id": DB.getObjectId(id)
	});

	//获取用户信息
	await ctx.render('edit', {

		list: data[0]
	});

})

router.post('/doEdit', async(ctx) => {
	//通过get传过来的id来获取用户信息
	//console.log(ctx.request.body);

	var id = ctx.request.body.id;
	var username = ctx.request.body.username;
	var age = ctx.request.body.age;
	var sex = ctx.request.body.sex;

	let data = await DB.update('user', {
		"_id": DB.getObjectId(id)
	}, {
		username,
		age,
		sex
	})

	try {
		if(data.result.ok) {
			ctx.redirect('/')
		}
	} catch(err) {
		console.log(err);
		return;
		ctx.redirect('/');
	}
})
//删除学员
router.get('/delete', async(ctx) => {

	let id = ctx.query.id;

	var data = await DB.remove('user', {
		"_id": DB.getObjectId(id)
	});
	console.log(data);
	if(data) {
		ctx.redirect('/')
	}

})
router.get('/news', async(ctx) => {
	await ctx.render('news', {
		list: {
			'name': 111,
			'imgurl': imgUrl
		}
	});
})
app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);