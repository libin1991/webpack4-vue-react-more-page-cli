import control from './control.js'
import info from './info.js';
export default {
	drawPortraitList(list) {
		const imgArr = list.map(item => `
      <img class="por" src="${item}">
    `)
		const HTML = imgArr.join('')
		$('.select').innerHTML = HTML
	},
	drawEmoticonList(list) {
		const imgArr = list.map(item => `
      <div class="item"><img class="img" src="${item}"></div>
    `)
		const HTML = imgArr.join('') + '<div class="upload"></div>'
		$('.emoticon-wrap').innerHTML = HTML
	},
	drawUserList(user) {
		const TYPE = user.__proto__.constructor.name
		if(TYPE == 'Object') {
			// 有新用户进入
			$('.user-list').innerHTML += `
        <div class="item" data-id="${user.id}">
          <img class="item-por" src="${user.url}">
          <div class="item-info">
            <p class="item-name">
              <span>${user.name}</span>
            </p>
            <p class="item-text"></p>
          </div>
        </div>
      `
			control.bindEventUserList($('.user-list .item', 'all'))
		} else if(TYPE == 'Array') {
			// 首次登陆返回全部用户列表
			const HTML = user.filter(me => me.id != info.id).map(item => `
        <div class="item" data-id="${item.id}">
          <img class="item-por" src="${item.url}">
          <div class="item-info">
            <p class="item-name">
              <span>${item.name}</span>
            </p>
            <p class="item-text"></p>
          </div>
        </div>
      `)
			$('.user-list').innerHTML = HTML.join('')
			control.bindEventUserList($('.user-list .item', 'all'))
		} else if(TYPE == 'String') {
			// 用户退出
			if(!$(`.item[data-id="${user}"]`)) {
				return
			}
			control.removeEventListener($(`.item[data-id="${user}"]`), 'click', e => {})
			$('.user-list').removeChild($(`.item[data-id="${user}"]`))
		}
	},
	drawMessageList(list) {
		$('.message-wrap .list').innerHTML = ''
		if(!list) {
			return
		}
		const HTML = list.map(item => `
      <div class="item" data-me="${item.id == info.id}">
        <img class="portrait" src="${item.url}">
        <div class="text">
          ${computedHtml(item)}
          <i class="arrow"></i>
        </div>
      </div>
    `)
		$('.message-wrap .list').innerHTML = HTML.join('')
		$('.message-wrap .list').scrollTop = $('.message-wrap .list').scrollHeight

		function computedHtml(item) {
			if(item.text) {
				return `<p>${item.text}</p>`
			}
			if(item.emoticon) {
				return `<img class="emoticon" src="${item.emoticon}">`
			}
		}
	}
}