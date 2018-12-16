const getConnect = require('./Connect')
const config = require('../config/config')

module.exports =  getConnect(config.DB)
  .then((mongo) => {

    let Schema = mongo.Schema

    let Users = new Schema({ // 建立模型
      User_id: {
        type: Number
      },
      username: {
        type: String
      },
      password: {
        type: String
      }
    })

    let user = mongo.model('users', Users)
    return user
    
  })
  .catch(() => {
    console.log('连接获取失败');
  })