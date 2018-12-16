const mongo = require('../schema/ListSchema')


let addList = (id, date, event) => {
  return mongo.then((list) => {
    return new Promise((resolve, reject) => {
      list.find({}, (err, callback) => {
        if (!callback.length) { // 第一次添加
          list.create({
            user_id: id,
            event,
            date,
            status: true
          }, ((err) => {
            if (err) {
              reject('添加失败' + err)
            } else {
              resolve('添加成功')
            }
          }))
        } else {
          list.create({
            user_id: id,
            event,
            date,
            status: true
          }, ((err) => {
            if (err) {
              reject('添加失败' + err)
            } else {
              resolve('添加成功')
            }
          }))
        }
      })
    })
  })
}

let getList = (id) => {
  return mongo.then((list) => {
    return new Promise((resolve, reject) => {
      list.find({
        user_id: id,
        status: true
      }, (err, callback) => {
        if (err) {
          console.log("错误" + err);
          reject(err)
        } else {
          resolve(callback)
        }
      })
    })
  })
}

let fulfilList = (id) => {
  return mongo.then((list) => {
    console.log(id);
    return new Promise((resolve, reject) => {
      list.updateOne({
        _id: id
      }, {
        status: false
      }, (err, callback) => {
        if (err) {
          reject('数据更新失败')
        }
        if (callback) {
          resolve('数据已更新')
        }
      })
    })
  })
}

let getfulfilList = (id) => {
  return mongo.then((list) => {
    return new Promise((resolve, reject) => {
      list.find({
        user_id: id,
        status: false
      }, (err, callback) => {
        if (err) {
          console.log("错误" + err);
          reject(err)
        } else {
          resolve(callback)
        }
      })
    })
  })
}

let cancelList = (id) => {
  return mongo.then((list) => {
    return new Promise((resolve, reject) => {
      list.updateOne({
        _id: id
      }, {
        status: true
      }, (err, callback) => {
        if (err) {
          reject('数据更新失败')
        }
        if (callback) {
          resolve('数据已撤销到完成')
        }
      })
    })
  })
}

let deleteList = (id) => {
  return mongo.then((list) => {
    return new Promise((resolve, reject) => {
      list.deleteOne({
        _id: id
      }, (err, callback) => {
        if (err) {
          reject('数据更新失败')
        }
        if (callback) {
          resolve('数据已删除')
        }
      })
    })
  })
}

let updateDatas = (id) => {
  return mongo.then((list) => {
    return new Promise((resolve, reject) => {
      id.map((id) => {
        list.updateOne({
          _id: id
        }, {
          status: false
        }, (err, callback) => {
          if (err) {
            reject('选中事件更新失败')
            return
          }
        })
      })
      resolve('选中事件已更新')
    })
  })
}

let cancelFulfilData = (id) => {
  return mongo.then((list) => {
    return new Promise((resolve, reject) => {
      id.map((id) => {
        list.updateOne({
          _id: id
        }, {
          status: true
        }, (err, callback) => {
          if (err) {
            reject('选中事件更新失败')
            return
          }
        })
      })
      resolve('选中事件已更新')
    })
  })
}

let deleteFulfilData = (id) => {
  return mongo.then((list) => {
    return new Promise((resolve, reject) => {
      id.map((id) => {
        list.deleteOne({
          _id: id
        }, (err, callback) => {
          if (err) {
            reject('选中事件删除失败')
            return
          }
        })
      })
      resolve('选中事件已删除')
    })
  })
}


module.exports = {
  addList,
  getList,
  fulfilList,
  getfulfilList,
  cancelList,
  deleteList,
  updateDatas,
  cancelFulfilData,
  deleteFulfilData
}