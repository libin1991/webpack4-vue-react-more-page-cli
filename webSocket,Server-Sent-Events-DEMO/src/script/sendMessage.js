import info from './info.js'

$('.send-message').onclick = function() {
	// 发送消息
	if($('.edit .inp').innerHTML == '') {
		return
	}
	const TEXT = $('.edit .inp').innerHTML.replace(/<div><br><\/div>/, '')
	$('.edit .inp').innerHTML = ''
	if(info.member == 'group' || info.member == '') {
		window.socket.emit('sendMessageGroup', {
			id: info.id,
			name: info.name,
			url: info.url,
			text: TEXT
		})
	} else {
		window.socket.emit('sendMessageMember', {
			memberId: info.member,
			id: info.id,
			name: info.name,
			url: info.url,
			text: TEXT
		})
	}
}

$('.edit .inp').onkeydown = function(event) {
	if(event.keyCode == 13) {
		event.preventDefault ? event.preventDefault() : event.returnValue = false
		$('.send-message').click()
		return false
	}
}

// 发送表情
function sendEmoticon(img = {}) {
	if(info.member == 'group' || info.member == '') {
		window.socket.emit('sendMessageGroup', Object.assign({
			id: info.id,
			name: info.name,
			url: info.url,
			// ...img
		}, img))
	} else {
		window.socket.emit('sendMessageMember', Object.assign({
			memberId: info.member,
			id: info.id,
			name: info.name,
			url: info.url,
			// ...img,
		}, img))
	}
}

$('.emoticon-wrap').onclick = e => {
	const eventDom = e.target.className
	if(eventDom == 'item') {
		const url = e.target.getElementsByClassName('img')[0].getAttribute('src')
		sendEmoticon({
			emoticon: url
		})
	} else if(eventDom == 'img') {
		const url = e.target.getAttribute('src')
		sendEmoticon({
			emoticon: url
		})
	} else if(eventDom == 'upload') {
		$('#file').click()
	}
	$('.mask').click() // 移动端关闭蒙版
}

$('#file').onchange = function(event) {
	sendEmoticon({
		file: event.target.files[0],
		fileType: event.target.files[0].name.split('.')[1]
	})
}