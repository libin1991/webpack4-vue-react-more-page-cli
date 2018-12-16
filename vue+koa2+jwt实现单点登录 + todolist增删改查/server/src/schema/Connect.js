const mongoose = require('mongoose')

//获取链接
function getConnect(url) { // user表连接
  return new Promise((resolve, reject) => {
    mongoose.connect(url, { useNewUrlParser: true })
    let db = mongoose.connection
    isDone(db)
    .then(()=> {
      resolve(mongoose) // 成功则返回当前链接 便于后面的操作
    })
    .catch(()=> {
      reject()
    })
  })
}

// 项目启动检查
function isDone(db) {
  return new Promise((resolve, reject) => {
    db.once('open', () => { // 成功回调
      console.log(`[mongodb] is start`)
      resolve()
    })
    db.on('error', () => { // 失败回调
      console.log(`[mongodb] is error`)
      reject()
    })
  })
}
module.exports = getConnect