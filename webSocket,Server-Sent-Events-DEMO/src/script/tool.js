window.$ = (tag, all) => {
	if(!tag) {
		console.warn('请检查传入的css选择器是否正确')
		return null
	}
	if(!document.querySelector) {
		console.warn('浏览器不支持querySelector')
		return null
	}
	if(all) {
		return document.querySelectorAll(tag)
	} else {
		return document.querySelector(tag)
	}
}
window.tool = {
	addEveArr(domArr, eventName, fun) {
		if(domArr.__proto__.constructor.name == 'NodeList') {
			for(let i = 0; i < domArr.length; i++) {
				domArr[i].addEventListener(eventName, e => {
					fun(e, domArr[i])
				})
			}
		} else {
			domArr.addEventListener(eventName, e => {
				fun(e, domArr)
			})
		}
	},
	ajax(type, url, data, fun) {
		const ajax = new XMLHttpRequest()
		ajax.open(type, url, true)
		ajax.send(data)
		ajax.onreadystatechange = function() {
			if(ajax.readyState == 4 && ajax.status == 200) {
				const res = JSON.parse(ajax.responseText)
				if(ajax.responseText && res && res.ret == 1) {
					fun(res.data)
				} else {
					alert('网络请求故障，请重试！')
				}
			}
		}
	}
}