import info from './info.js'
import view from './view.js'

export default function() {

	window.socket = io()
	window.socket.on('connect', () => { // 连接成功
		const userInfo = {
			name: info.name,
			url: info.url,
			id: window.socket.id
		}
		info.setData('id', window.socket.id)
		window.socket.emit('login', userInfo)
	})

	// 登陆
	window.socket.on('login', userInfo => {
		view.drawUserList(userInfo)
	})
	// 获取当前在线列表
	window.socket.on('userList', userList => {
		view.drawUserList(userList)
	})
	// 退出
	window.socket.on('quit', id => {
		view.drawUserList(id)
	})
	// 接收群聊消息
	window.socket.on('sendMessageGroup', message => {
		info.groupMessageList.push(message)
		if(info.member == 'group') {
			view.drawMessageList(info.groupMessageList)
		} else {
			// 提示群聊新消息
			$('.top .group').setAttribute('data-new', 'true')

			let nNewNum = $('.top .group').getAttribute('data-message')
			$('.top .group').setAttribute('data-message', Number(nNewNum) + 1)

			new Notification('收到来自简言的新消息', {
				body: `${message.name}: ${message.text}`,
				icon: message.url
			})
		}
	})
	// 接收私聊消息
	window.socket.on('sendMessageMember', message => {
		if(message.id == info.id) { // 自己的消息回传
			if(info[`member__${message.memberId}`] == undefined) {
				info[`member__${message.memberId}`] = []
			}
			info[`member__${message.memberId}`].push(message)
			view.drawMessageList(info[`member__${message.memberId}`])
		} else { // 好友私聊消息
			if(info[`member__${message.id}`] == undefined) {
				info[`member__${message.id}`] = []
			}
			info[`member__${message.id}`].push(message)
		}

		if(info.member == message.id) {
			view.drawMessageList(info[`member__${message.id}`])
		} else {
			// 提示私聊新消息
			if($(`.item[data-id="${message.id}"]`)) {
				$(`.item[data-id="${message.id}"]`).setAttribute('data-new', 'true')

				let nNewNum = $(`.item[data-id="${message.id}"] .item-name`).getAttribute('data-message')
				$(`.item[data-id="${message.id}"] .item-name`).setAttribute('data-message', Number(nNewNum) + 1)

				new Notification('收到来自简言的新消息', {
					body: `${message.name}: ${message.text}`,
					icon: message.url
				})
			}
		}
		// userList 消息摘要
		if($(`.item[data-id="${message.id}"]`)) {
			$(`.item[data-id="${message.id}"] .item-text`).innerHTML = message.text || `[收到新灵魂]`
		}
	})
}