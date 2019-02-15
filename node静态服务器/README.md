node-webstatic
==============

基于node.js的简单静态web服务器

#HTTP

http api的文档翻译得太无聊了，很多用不上，例子太少，翻译到一半就觉得受不了，决定放弃，决定，用另外一种方式去介绍这部分的API。http模块，主要的应用是两部分，一部分是http.createServer 担当web服务器，另一部分是http.createClient，担当客户端，实现爬虫之类的工作。从这两方面着手介绍HTTP api。下文将会介绍http.createServer部分。

##设计目标

实现一个静态页服务器

##目标功能

 - url解析
 - 500页面，404页面回复
 - 读取路径目录下的静态页文件

##最简单的web服务器

	var http = require('http');
	http.createServer(function (request, response) {
	  response.writeHead(200, {'Content-Type': 'text/plain'});
	  response.end('Hello World\n');
	}).listen(1337, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:1337/');

浏览器输入http://127.0.0.1:1337/，将会看到熟悉的hello world

	response.writeHead(200, {'Content-Type': 'text/plain'});

- writeHead，200表示页面正常，text/plain表示是文字。
- write 写入网页内容。
- end 完成写入。

创建HTTP代理`http.createServer`，返回代理对象，通过返回的对象可以进行

###事件监听

	proxy = http.createServer()
	proxy.on('connect')    
	proxy.on('upgrade')
	proxy.on('close')
	proxy.on('socket')
	proxy.on('response')
	proxy.on('checkContinue')

http.createServer 回调返回 req 和 res 对象

###requestd对象

####request.url

客户端请求的url地址，如http://127.0.0.1/hello/world，那么request.url就是/hello/world

####request.headers

客户端请求的http header

####request.method 

获取请求的方式，一般有几个选项，POST,GET和DELETE等，服务器可以根据客户端的不同请求方法进行不同的处理。

###response对象

####response.writeHead(statusCode, [reasonPhrase], [headers])

- statusCode html页面状态值
- header 返回的http header，可以是字符串，也可以是对象

####response.setTimeout(msecs, callback)

设置http超时返回的时间，一旦超过了设定时间，连接就会被丢弃

####response.statusCode

设置返回的网页状态码

####response.setHeader(name, value)

设置http协议头
	
####response.headersSent

判断是否设置了http的头

####response.write(chunk, [encoding])

返回的网页数据，[encoding] 默认是 utf-8

####response.end([data], [encoding])

将设置的数据包，发送数据到客户端。

##url解析



>                               url.parse(string).query
                                           |
               url.parse(string).pathname  |
                           |               |
                           |               |
                         ------     ---------------
	http://localhost:8888/start?foo=bar&hello=world
          --------------      
                 |
                 |
          req.header.host       

##错误页面设计

###500页面

	var page_500 = function(req, res, error){
	
	    res.writeHead(500, {
	      'Content-Type': 'text/html'
	    });
	    res.write('<!doctype html>\n');
	    res.write('<title>Internal Server Error</title>\n');
	    res.write('<h1>Internal Server Error</h1>');
	    res.write('<pre>' + util.inspect(error) + '</pre>');
	}


###404页面

	var page_404 = function(req, res, path){
	    res.writeHead(404, {
	      'Content-Type': 'text/html'
	    });
	    res.write('<!doctype html>\n');
	    res.write('<title>404 Not Found</title>\n');
	    res.write('<h1>Not Found</h1>');
	    res.write(
	    '<p>The requested URL ' +
	     path +
	    ' was not found on this server.</p>'
	    );
	    res.end();
	}


##读取网页文件

	var mimetype = {
	  'txt': 'text/plain',
	  'html': 'text/html',
	  'css': 'text/css',
	  'xml': 'application/xml',
	  'json': 'application/json',
	  'js': 'application/javascript',
	  'jpg': 'image/jpeg',
	  'jpeg': 'image/jpeg',
	  'gif': 'image/gif',
	  'png': 'image/png',
	  'svg': 'image/svg+xml'
	}

	var fs = require('fs');
    fs.exists(realPath, function(exists){
        if(!exists){

            return page_404(req, res, pathname);

        } else {
            var file = fs.createReadStream(realPath);

            res.writeHead(200, {
                'Content-Type': mimetype[realPath.split('.').pop()] || 'text/plain'
            });

            file.on('data', res.write.bind(res));
            file.on('close', res.end.bind(res));
            file.on('error', function(err){
                return page_500(req, res, err);
            });
        }
    });


