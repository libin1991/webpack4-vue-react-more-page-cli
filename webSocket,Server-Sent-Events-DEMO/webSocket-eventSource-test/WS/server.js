/*
// 基于 socket.io
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server, {})

// 启动一个简易的本地server返回index.html
app.get('/', (req, res) => {
	res.sendfile(__dirname + '/index.html')
})

// 监听 6788
server.listen(6788, () => {
	console.log(`server runing on port 6788 ...`)
})

// 服务器监听所有客户端 并返回该新连接对象
// 每个客户端socket连接时都会触发 connection 事件
let num = 0
io.on('connection', (socket) => {
	socket.on('disconnect', (reason) => {
		console.log('断开连接')
	})
	socket.on('error', (error) => {
		console.log('发生错误')
	})
	socket.on('disconnecting', (reason) => {
		console.log('客户端断开连接但尚未离开')
	})

	console.log(socket.id) // 获取当前连接进入的客户端的id
	io.clients((error, ids) => {
		console.log(ids) // 获取已连接的全部客户机的ID
	})

	// 监听客户端发送的事件
	socket.on('feEve', (data) => {
		console.log('feEve', data)
	})
	// 给客户端发送事件
	setInterval(() => {
		socket.emit('serverEve', ++num)
	}, 3000)
})
// io.close()  // 关闭所有连接
*/
// 基于 ws

const fs = require('fs')
const express = require('express')
const app = express()

// 启动一个简易的本地server返回index.html
const httpServer = app.get('/', (req, res) => {
	res.writeHead(200)
	fs.createReadStream('./index.html').pipe(res)
}).listen(6788, () => {
	console.log(`server runing on port 6788 ...`)
})

// ws
const WebSocketServer = require('ws').Server
const wssOptions = {
	server: httpServer,
	// port: 6789,
	// path: '/test'
}
const wss = new WebSocketServer(wssOptions, () => {
	console.log(`server runing on port ws 6789 ...`)
})

let num = 1
wss.on('connection', (wsocket) => {
	console.log('连接成功')

	wsocket.on('message', (message) => {
		console.log('收到消息', message)
	})
	wsocket.on('close', (message) => {
		console.log('断开了')
	})
	wsocket.on('error', (message) => {
		console.log('发生错误')
	})
	wsocket.on('open', (message) => {
		console.log('建立连接')
	})

	setInterval(() => {
		wsocket.send(++num)
	}, 1000)
})