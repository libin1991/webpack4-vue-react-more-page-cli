import info from './info.js'
import view from './view.js'

let member = ''
$('.group').onclick = () => { // 群聊
	$('.member').removeAttribute('data-now')
	$('.group').setAttribute('data-now', 'true')
	member = info.member
	info.setData('member', 'group')
	view.drawMessageList(info.groupMessageList)
	$('.top .group').removeAttribute('data-new')
	$('.top .group').setAttribute('data-message', 0)
}
$('.member').onclick = () => { // 成员
	$('.group').removeAttribute('data-now')
	$('.member').setAttribute('data-now', 'true')
	info.setData('member', member)
	view.drawMessageList(info[`member__${member}`])
	if($(`.item[data-id="${member}"]`)) {
		$(`.item[data-id="${member}"]`).removeAttribute('data-new')
		$(`.item[data-id="${member}"] .item-name`).setAttribute('data-message', 0)
	}
}

$('.emoticon').onclick = e => { // 打开表情
	e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
	$('.tool-bar').classList.toggle('emoticon-show')
	if(window.screen.width < 700) {
		// 移动端
		$('.message-wrap').setAttribute('data-blur', 'true')
		$('.mask').style.display = 'block'
	}
}
$('body').onclick = e => {
	$('.tool-bar').classList.remove('emoticon-show')
}

// 移动端打开用户列表
$('.open').onclick = e => {
	$('.message-wrap').setAttribute('data-blur', 'true')
	$('.mask').style.display = 'block'
	$('.user-list-wrap').style.left = "0px"
}
$('.mask').onclick = e => {
	$('.message-wrap').setAttribute('data-blur', 'fasle')
	$('.mask').style.display = 'none'
	$('.user-list-wrap').style.left = "-260px"
}

export default {
	bindEventUserList(dom) {
		tool.addEveArr(dom, 'click', (eve, _this) => {
			const userList = $('.user-list .item', 'all')
			for(let i = 0; i < userList.length; i++) {
				userList[i].removeAttribute('data-now')
			}
			_this.setAttribute('data-now', 'true')
			info.setData('member', _this.getAttribute('data-id'))
			$('.group').removeAttribute('data-now')
			$('.member').setAttribute('data-now', 'true')
			view.drawMessageList(info[`member__${info.member}`])
			if($(`.item[data-id="${info.member}"]`)) {
				$(`.item[data-id="${info.member}"]`).removeAttribute('data-new')
				$(`.item[data-id="${info.member}"] .item-name`).setAttribute('data-message', 0)
			}
			$('.mask').click()
		})
	},
	removeEventListener(dom, name, fun) {
		if(dom && name) {
			dom.removeEventListener(name, fun())
		}
	}
}