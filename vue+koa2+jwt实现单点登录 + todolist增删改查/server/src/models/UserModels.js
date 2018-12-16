const user = require('../schema/UserSchema')

let addUser = (username, password) => {
  return user.then( (user)=> {

    return new Promise((resolve, reject) => {
      
      user.findOne({username}, (err, callback)=> {
        if (err) {
          reject('数据库内部出错')
        } else {
          if (!callback) { // 查询不到说明不存在该用户
            user.create({
              username,
              password
            }, (err) => {
              if (err) {
                reject('数据无法插入')
              } else {
                resolve('注册成功,请登录')
              }
            })
          } else {
            reject('该用户已经存在')
          }
        }
      })
    })
      
  })
}

let verifyUser = (username, password) => {
  return user.then((user) => {

    return new Promise((resolve, reject) => {

      user.findOne({ username }, (err, data) => {
        if (err) {
          reject('数据库内部出错')
        } else {
          if (data) { // 不存在即为{} 存在 {_id: .., username: ...,password: ....}
            if (password === data.password) {
              console.log(data);
              resolve({
                text: '登陆成功',
                id: data._id
              })
            } else {
              reject('密码错误')
            }
          } else {
            reject('用户不存在')
          }
        }
      })
    })
  })
}

module.exports = {
  addUser,
  verifyUser
}