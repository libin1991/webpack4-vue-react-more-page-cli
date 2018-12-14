import main from './style/main.sass'

import tool from './script/tool.js'
import login from './script/login.js'
import sendMessage from './script/sendMessage.js'
import control from './script/control.js'

// 获取权限

if (Notification && Notification.requestPermission){
  Notification.requestPermission()
}
