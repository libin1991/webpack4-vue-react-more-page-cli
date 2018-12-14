import initWebSocket from './initWebSocket.js'
import info from './info.js'
import view from './view.js'

tool.ajax('GET', '/loadImg', null, (res) => {
	view.drawPortraitList(res.portrait)
	view.drawEmoticonList(res.emoticon)
})

const oUserName = $('.user-name')
oUserName.oninput = e => {
	if(oUserName.innerHTML != '') {
		oUserName.classList.remove('contenteditable')
	} else {
		oUserName.classList.add('contenteditable')
	}
}

// 事件委托
let sPorSrc = ''
$('.select').onclick = e => {
	if(e.target.classList[0] == 'por') {
		sPorSrc = e.target.getAttribute('src')
		$('.tips').style.display = 'none'
		$('.my-por').style.display = 'block'
		$('.my-por').setAttribute('src', sPorSrc)
	}
}

$('.chat-btn').onclick = e => {
	const userName = oUserName.innerHTML
	login(userName, sPorSrc)
}

function login(userName, sPorSrc) {
	if(userName && sPorSrc) {
		$('.my-info .portrait').setAttribute('src', sPorSrc)
		$('.my-info .name').innerHTML = userName
		$('#chat-wrap').style.display = 'block'
		$('#login-wrap').style.display = 'none'
		info.setData('name', userName)
		info.setData('url', sPorSrc)
		initWebSocket()
		localStorage.setItem('YouChatName', userName)
		localStorage.setItem('YouChatPor', sPorSrc)
	}
}
login(localStorage.getItem('YouChatName'), localStorage.getItem('YouChatPor'))