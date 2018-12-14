简书原文： https://www.jianshu.com/p/958eba34a5da


可能有很多的同学有用setInterval控制ajax不断向服务端请求最新数据的经历(轮询)看下面的代码：
```
setInterval(function() {
    $.get('/get/data-list', function(data, status) {
        console.log(data)
    })
}, 5000)
```
这样每隔5秒前端会向后台请求一次数据，实现上看起来很简单但是有个很重要的问题，就是我们没办法控制网速的稳定，不能保证在下次发请求的时候上一次的请求结果已经顺利返回，这样势必会有隐患，有聪明的同学马上会想到用setTimeout配合递归看下面的代码：
```
function poll() {
    setTimeout(function() {
        $.get('/get/data-list', function(data, status) {
            console.log(data)
            poll()
        })
    }, 5000)
}
```
当结果返回之后再延时触发下一次的请求，这样虽然没办法保证两次请求之间的间隔时间完全一致但是至少可以保证数据返回的节奏是稳定的，看似已经实现了需求但是这么搞我们先不去管他的性能就代码结构也算不上优雅，为了解决这个问题可以让服务端长时间和客户端保持连接进行数据互通h5新增了 WebSocket 和 EventSource 用来实现长轮询，下面我们来分析一下这两者的特点以及使用场景。


## WebSocket

**是什么：** WebSocket是一种通讯手段，基于TCP协议，默认端口也是80和443，协议标识符是ws（加密为wss），它实现了浏览器与服务器的全双工通信，扩展了浏览器与服务端的通信功能，使服务端也能主动向客户端发送数据，不受跨域的限制。

**有什么用：** WebSocket用来解决http不能持久连接的问题，因为可以双向通信所以可以用来实现聊天室，以及其他由服务端主动推送的功能例如 实时天气、股票报价、余票显示、消息通知等。


## EventSource

**是什么：** EventSource的官方名称应该是 Server-sent events（缩写SSE）服务端派发事件，EventSource 基于http协议只是简单的单项通信，实现了服务端推的过程客户端无法通过EventSource向服务端发送数据。喜闻乐见的是ie并没有良好的兼容当然也有解决的办法比如 `npm install event-source-polyfill`。虽然不能实现双向通信但是在功能设计上他也有一些优点比如可以自动重连接,event IDs,以及发送随机事件的能力（WebSocket要借助第三方库比如socket.io可以实现重连。）

**有什么用：** 因为受单项通信的限制EventSource只能用来实现像股票报价、新闻推送、实时天气这些只需要服务器发送消息给客户端场景中。EventSource的使用更加便捷这也是他的优点。


## WebSocket & EventSource 的区别
1. WebSocket基于TCP协议，EventSource基于http协议。
2. EventSource是单向通信，而websocket是双向通信。
3. EventSource只能发送文本，而websocket支持发送二进制数据。
4. 在实现上EventSource比websocket更简单。
5. EventSource有自动重连接（不借助第三方）以及发送随机事件的能力。
6. websocket的资源占用过大EventSource更轻量。
7. websocket可以跨域，EventSource基于http跨域需要服务端设置请求头。


## EventSource的实现案例

客户端代码
```
// 实例化 EventSource 参数是服务端监听的路由
var source = new EventSource('/EventSource-test')
source.onopen = function (event) { // 与服务器连接成功回调
  console.log('成功与服务器连接')
}
// 监听从服务器发送来的所有没有指定事件类型的消息(没有event字段的消息)
source.onmessage = function (event) { // 监听未命名事件
  console.log('未命名事件', event.data)
}
source.onerror = function (error) { // 监听错误
  console.log('错误')
}
// 监听指定类型的事件（可以监听多个）
source.addEventListener("myEve", function (event) {
  console.log("myEve", event.data)
})
```
服务端代码（node.js）
```
const fs = require('fs')
const express = require('express') // npm install express
const app = express()

// 启动一个简易的本地server返回index.html
app.get('/', (req, res) => {
  fs.stat('./index.html', (err, stats) => {
    if (!err && stats.isFile()) {
      res.writeHead(200)
      fs.createReadStream('./index.html').pipe(res)
    } else {
      res.writeHead(404)
      res.end('404 Not Found')
    }
  })
})

// 监听EventSource-test路由服务端返回事件流
app.get('/EventSource-test', (ewq, res) => {
  // 根据 EventSource 规范设置报头
  res.writeHead(200, {
    "Content-Type": "text/event-stream", // 规定把报头设置为 text/event-stream
    "Cache-Control": "no-cache" // 设置不对页面进行缓存
  })
  // 用write返回事件流，事件流仅仅是一个简单的文本数据流，每条消息以一个空行(\n)作为分割。
  res.write(':注释' + '\n\n')  // 注释行
  res.write('data:' + '消息内容1' + '\n\n') // 未命名事件

  res.write(  // 命名事件
    'event: myEve' + '\n' +
    'data:' + '消息内容2' + '\n' +
    'retry:' + '2000' + '\n' +
    'id:' + '12345' + '\n\n'
  )

  setInterval(() => { // 定时事件
    res.write('data:' + '定时消息' + '\n\n')
  }, 2000)
})

// 监听 6788
app.listen(6788, () => {
  console.log(`server runing on port 6788 ...`)
})
```

客户端访问 `http://127.0.0.1:6788/` 会看到如下的输出：
![](https://upload-images.jianshu.io/upload_images/13130832-3dca9575eb6bcba4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

来总结一下相关的api，客户端的api很简单都在注释里了，服务端有一些要注意的地方：
#### 事件流格式？
事件流仅仅是一个简单的文本数据流，文本应该使用UTF-8格式的编码。每条消息后面都由一个空行作为分隔符。以冒号开头的行为注释行，会被忽略。
#### 注释有何用？
注释行可以用来防止连接超时，服务器可以定期发送一条消息注释行，以保持连接不断。
#### EventSource规范中规定了那些字段？
`event：` 事件类型，如果指定了该字段，则在客户端接收到该条消息时，会在当前的EventSource对象上触发一个事件，事件类型就是该字段的字段值，你可以使用addEventListener()方法在当前EventSource对象上监听任意类型的命名事件，如果该条消息没有event字段，则会触发onmessage属性上的事件处理函数。
`data：` 消息的数据字段，如果该条消息包含多个data字段,则客户端会用换行符把它们连接成一个字符串来作为字段值。
`id：` 事件ID，会成为当前EventSource对象的内部属性"最后一个事件ID"的属性值。
`retry：` 一个整数值，指定了重新连接的时间(单位为毫秒)，如果该字段值不是整数，则会被忽略。
#### 重连是干什么的？
上文提过retry字段是用来指定重连时间的，那为什么要重连呢，我们拿node来说，大家知道node的特点是单线程异步io，单线程就意味着如果server端报错那么服务就会停掉，当然在node开发的过程中会处理这些异常，但是一旦服务停掉了这时就需要用pm2之类的工具去做重启操作，这时候server虽然正常了，但是客户端的EventSource链接还是断开的这时候就用到了重连。
#### 为什么案例中消息要用\n结尾？
\n是换行的转义字符，EventSource规范规定每条消息后面都由一个空行作为分隔符，结尾加一个\n表示一个字段结束，加两个\n表示一条消息结束。(两个\n表示换行之后又加了一个空行)

*注: 如果一行文本中不包含冒号，则整行文本会被解析成为字段名，其字段值为空。*

<br/><br/>
## WebSocket的实现案例

#### WebSocket的客户端原生api

`var ws = new WebSocket('ws://localhost:8080')`
WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。

`ws.onopen = function(){}`
用于指定连接成功后的回调函数。

`ws.onclose = function(){}`
用于指定连接关闭后的回调函数

`ws.onmessage = function(){}`
用于指定收到服务器数据后的回调函数

`ws.send('data')`
实例对象的send()方法用于向服务器发送数据

`socket.onerror = function(){}`
用于指定报错时的回调函数


#### 服务端的WebSocket如何实现
npm上有很多包对websocket做了实现比如 socket.io、WebSocket-Node、ws、还有很多，本文只对 socket.io以及ws 做简单的分析，细节还请查看官方文档。

#### socket.io和ws有什么不同
`Socket.io：` Socket.io是一个WebSocket库，包括了客户端的js和服务器端的nodejs，它会自动根据浏览器从WebSocket、AJAX长轮询、Iframe流等等各种方式中选择最佳的方式来实现网络实时应用（不支持WebSocket的情况会降级到AJAX轮询），非常方便和人性化，兼容性非常好，支持的浏览器最低达IE5.5。屏蔽了细节差异和兼容性问题，实现了跨浏览器/跨设备进行双向数据通信。

`ws：` 不像 socket.io 模块， ws 是一个单纯的websocket模块，不提供向上兼容，不需要在客户端挂额外的js文件。在客户端不需要使用二次封装的api使用浏览器的原生Websocket API即可通信。


#### 基于socket.io实现WebSocket双向通信
客户端代码
```
<button id="closeSocket">断开连接</button>
<button id="openSocket">恢复连接</button>
<script src="/socket.io/socket.io.js"></script>
<script>
// 建立连接 默认指向 window.location
let socket = io('http://127.0.0.1:6788')

openSocket.onclick = () => {
  socket.open()  // 手动打开socket 也可以重新连接
}
closeSocket.onclick = () => {
  socket.close() // 手动关闭客户端对服务器的链接
}

socket.on('connect', () => { // 连接成功
  // socket.id是唯一标识，在客户端连接到服务器后被设置。
  console.log(socket.id)
})

socket.on('connect_error', (error) => {
  console.log('连接错误')
})
socket.on('disconnect', (timeout) => {
  console.log('断开连接')
})
socket.on('reconnect', (timeout) => {
  console.log('成功重连')
})
socket.on('reconnecting', (timeout) => {
  console.log('开始重连')
})
socket.on('reconnect_error', (timeout) => {
  console.log('重连错误')
})

// 监听服务端返回事件
socket.on('serverEve', (data) => {
  console.log('serverEve', data)
})

let num = 0
setInterval(() => {
  // 向服务端发送事件
  socket.emit('feEve', ++num)
}, 1000)

```

服务端代码（node.js）
```
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
    console.log(ids)  // 获取已连接的全部客户机的ID
  })

  // 监听客户端发送的事件
  socket.on('feEve', (data) => {
    console.log('feEve', data)
  })
  // 给客户端发送事件
  setInterval(() => {
    socket.emit('serverEve', ++num)
  }, 1000)
})

/*
  io.close()  // 关闭所有连接
*/
```
`const io = require('socket.io')(server, {})` 第二个参数是配置项，可以传入如下参数：

- path: '/socket.io'   捕获路径的名称
- serveClient: false   是否提供客户端文件
- pingInterval: 10000  发送消息的时间间隔
- pingTimeout: 5000    在该时间下没有数据传输连接断开
- origins: '*'         允许跨域
- ...

上面基于socket.io的实现中 `express` 做为socket通信的依赖服务基础
`socket.io` 作为socket通信模块，实现了双向数据传输。最后，需要注意的是，在服务器端 `emit` 区分以下三种情况：

- `socket.emit()` ：向建立该连接的客户端发送
- `socket.broadcast.emit()` ：向除去建立该连接的客户端的所有客户端发送
- `io.sockets.emit()` ：向所有客户端发送 等同于上面两个的和

#### 基于ws实现WebSocket双向通信
客户端代码
```
let num = 0
let ws = new WebSocket('ws://127.0.0.1:6788')
ws.onopen = (evt) => {
  console.log('连接成功')
  setInterval(() => {
    ws.send(++ num)  // 向服务器发送数据
  }, 1000)
}
ws.onmessage = (evt) => {
  console.log('收到服务端数据', evt.data)
}
ws.onclose = (evt) => {
  console.log('关闭')
}
ws.onerror = (evt) => {
  console.log('错误')
}
closeSocket.onclick = () => {
  ws.close()  // 断开连接
}
```
服务端代码（node.js）
```
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
    wsocket.send( ++num )
  }, 1000)
})
```

###### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上面代码中在 `new WebSocketServer` 的时候传入了 `server: httpServer` 目的是统一端口，虽然 WebSocketServer 可以使用别的端口，但是统一端口还是更优的选择，其实express并没有直接占用6788端口而是express调用了内置http模块创建了http.Server监听了6788。express只是把响应函数注册到该http.Server里面。类似的，WebSocketServer也可以把自己的响应函数注册到 http.Server中，这样同一个端口，根据协议，可以分别由express和ws处理。我们拿到express创建的http.Server的引用，再配置到 wssOptions.server 里让WebSocketServer根据我们传入的http服务来启动，就实现了统一端口的目的。

###### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要始终注意，浏览器创建WebSocket时发送的仍然是标准的HTTP请求。无论是WebSocket请求，还是普通HTTP请求，都会被http.Server处理。具体的处理方式则是由express和WebSocketServer注入的回调函数实现的。WebSocketServer会首先判断请求是不是WS请求，如果是，它将处理该请求，如果不是，该请求仍由express处理。所以，WS请求会直接由WebSocketServer处理，它根本不会经过express。

<br/>

*部分概念参考自 https://www.w3cschool.cn/socket/*