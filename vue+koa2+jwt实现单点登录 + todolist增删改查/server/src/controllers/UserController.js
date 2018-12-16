const user = require('../models/UserModels')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const md5 = require('md5')
// 密码使用md5加密存储

//注册
let addUser =  async (ctx, next) => {
  let {username, password} = ctx.request.body
  password = md5(password) // md5加密处理
  await user.addUser(username,password) // 异步处理,因为ctx.body不支持异步回调
  .then((data)=> {
    ctx.body = {
      data,
      type: 1
    }
  })
  .catch((data)=> {
    ctx.body = {
      data,
      type: 0 // 有毛病 type字段我定于或者不定义 都是type:1 莫名其妙
    }
  })
}

//登录
let verifyUser = async (ctx, next) => {
  let {username, password} = ctx.request.body
  password = md5(password)
  
  await user.verifyUser(username, password)
  .then((data)=> {
    let {text, id} = data
    // 处理token  
    let token = jwt.sign({
      username,
      id
    }, config.secretOrPublicKey, {
      expiresIn: 60 * 60 * 24 // 24小时过期
    })
    ctx.body = {
      text,
      token,
      type: 1
    }
  })
  .catch((data) => {
    ctx.body = {
      data,
      type: 0
    }
  })
}

// 验证
let verification = async (ctx, next) => {
  let { token } = ctx.request.body
  try {
    await jwt.verify(token, config.secretOrPublicKey, (err, decoded)=> {
      if (err) {
        ctx.body = {
          data: '登录信息失效',
          type: 0 
        }
        return
      }
      if (decoded) {
        ctx.body = {
          type: 1
        }
      }
    })
  } catch (error) {
    ctx.body = {
      data: '登录信息出错',
      type: 0
    }
  }
}



module.exports = {
  addUser,
  verifyUser,
  verification
}