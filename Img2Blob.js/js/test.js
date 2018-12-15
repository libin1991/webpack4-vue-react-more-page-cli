initUpload();

//初始化上传
function initUpload() {
	var chunk = 100 * 1024; //每片大小
	var input = document.getElementById("file"); //input file
	input.onchange = function(e) {
		var file = this.files[0];
		var query = {};
		var chunks = [];
		if(!!file) {
			var start = 0;
			//文件分片
			for(var i = 0; i < Math.ceil(file.size / chunk); i++) {
				var end = start + chunk;
				chunks[i] = file.slice(start, end);
				start = end;
			}

			// 采用post方法上传文件
			// url query上拼接以下参数，用于记录上传偏移
			// post body中存放本次要上传的二进制数据
			query = {
				fileSize: file.size,
				dataSize: chunk,
				nextOffset: 0
			}

			upload(chunks, query, successPerUpload);
		}
	}
}

// 执行上传
function upload(chunks, query, cb) {
	var queryStr = Object.getOwnPropertyNames(query).map(key => {
		return key + "=" + query[key];
	}).join("&");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://xxxx/opload?" + queryStr);
	xhr.overrideMimeType("application/octet-stream");

	//获取post body中二进制数据
	var index = Math.floor(query.nextOffset / query.dataSize);
	getFileBinary(chunks[index], function(binary) {
		if(xhr.sendAsBinary) {
			xhr.sendAsBinary(binary);
		} else {
			xhr.send(binary);
		}

	});

	xhr.onreadystatechange = function(e) {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {
				var resp = JSON.parse(xhr.responseText);
				// 接口返回nextoffset
				// resp = {
				//  isFinish:false,
				//  offset:100*1024
				// }
				if(typeof cb === "function") {
					cb.call(this, resp, chunks, query)
				}
			}
		}
	}
}

// 每片上传成功后执行
function successPerUpload(resp, chunks, query) {
	if(resp.isFinish === true) {
		alert("上传成功");
	} else {
		//未上传完毕
		query.offset = resp.offset;
		upload(chunks, query, successPerUpload);
	}
}

// 获取文件二进制数据
function getFileBinary(file, cb) {
	var reader = new FileReader();
	reader.readAsArrayBuffer(file);
	reader.onload = function(e) {
		if(typeof cb === "function") {
			cb.call(this, this.result);
		}
	}
}