const fs = require('fs')
const path = require('path')
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server, {})
// 读取表情包和头像发送给前端
let portrait = fs.readdirSync('./file/portrait')

console.log(portrait);

portrait = portrait.map(item => `/file/portrait/${item}`)
let emoticon = fs.readdirSync('./file/emoticon')
emoticon = emoticon.map(item => `/file/emoticon/${item}`)
emoticon = emoticon.filter((item, index) => {
	const TYPE = {
		gif: true,
		jpg: true,
		png: true,
		jpeg: true
	}
	return TYPE[item.split('.')[1]]
})
emoticon = emoticon.filter((item, index) => index < 20)
// 搭建静态服务
app.get('*', (req, res) => {
	const assetsType = req.url.split('/')[1]
	if(assetsType == 'YouChat') { // 首页
		const filepath = path.join(path.resolve('./dist'), 'index.html')
		res.sendFile(filepath)
	}
	if(assetsType == 'assets') { // 客户端资源
		const filepath = path.join(path.resolve('./dist'), req.url)
		res.sendFile(filepath.split('?')[0]) // 去hash
	}
	if(assetsType == 'file') { // 服务端资源
		const filepath = path.join(path.resolve('./'), req.url)
		res.sendFile(filepath)
	}
	if(assetsType == 'loadImg') { // 接口
		res.send({
			ret: 1,
			data: {
				portrait,
				emoticon
			}
		})
	}
})

// 每个客户端socket连接时都会触发 connection 事件
let userList = []
io.on('connection', (socket) => {
	// 登陆
	socket.on('login', userInfo => {
		userList.push(userInfo)
		socket.emit('userList', userList)
		socket.broadcast.emit('login', userInfo)
	})
	// 退出（内置事件）
	socket.on('disconnect', reason => {
		userList = userList.filter(item => item.id != socket.id)
		io.sockets.emit('quit', socket.id)
	})

	// 接收群聊消息 
	socket.on('sendMessageGroup', message => {
		// 发送文件
		if(message.file) {
			const fileName = Date.now() + '.' + message.fileType
			fs.writeFile(`./file/uploadImg/${fileName}`, message.file, (err) => {
				delete message.file
				delete message.fileType
				if(err) {
					message.text = '[图片发送失败]'
					io.sockets.emit('sendMessageGroup', message)
				} else {
					message.emoticon = `/file/uploadImg/${fileName}`
					io.sockets.emit('sendMessageGroup', message)
				}
			})
			return
		}
		// 普通消息
		io.sockets.emit('sendMessageGroup', {...message,"SX":"IO"})
	})

	// 接收私聊消息 
	socket.on('sendMessageMember', message => {
		// 发送文件
		if(message.file) {
			const fileName = Date.now() + '.' + message.fileType
			fs.writeFile(`./file/uploadImg/${fileName}`, message.file, (err) => {
				delete message.file
				delete message.fileType
				if(err) {
					message.text = '[图片发送失败]'
					socket.emit('sendMessageMember', message)
					io.to(message.memberId).emit('sendMessageMember', message)
				} else {
					message.emoticon = `/file/uploadImg/${fileName}`
					socket.emit('sendMessageMember', message)
					io.to(message.memberId).emit('sendMessageMember', message)
				}
			})
			return
		}
		// 普通消息
		socket.emit('sendMessageMember', message)
		io.to(message.memberId).emit('sendMessageMember', message)
	})
})

server.listen(8686, () => {
	console.log(`server runing on port 8686 ...`)
	console.log(`http://127.0.0.1:8686/YouChat`)
})
server.listen(8687, () => {
	console.log(`server runing on port 8686 ...`)
	console.log(`http://127.0.0.1:8687/YouChat`)
})
/*
nodemon配合webpack 打包客户端代码
npm命令配置
打包的报错
客户端改造成new结构
*/