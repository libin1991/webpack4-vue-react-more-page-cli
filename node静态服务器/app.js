var http = require('http');
var url = require('url');
var fs = require('fs');
var util = require('util');

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

var page_500 = function(req, res, error){

    res.writeHead(500, {
      'Content-Type': 'text/html'
    });
    res.write('<!doctype html>\n');
    res.write('<title>Internal Server Error</title>\n');
    res.write('<h1>Internal Server Error</h1>');
    res.write('<pre>' + util.inspect(error) + '</pre>');
}


http.createServer(function (req, res) {
 
    var pathname = url.parse(req.url).pathname;
    var realPath = __dirname +  "/static" + pathname;

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
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
