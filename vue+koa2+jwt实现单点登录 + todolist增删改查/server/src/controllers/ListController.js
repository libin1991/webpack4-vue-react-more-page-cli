const list = require('../models/ListModels')

//获取待完成事件
let getTodoList = async (ctx,next) => {
  let { id } = ctx.request.query
  await list.getList(id)
  .then((data) => { 
    ctx.body = {
      data,
      type: 1
    }
  })
  .catch((data) => {
    ctx.body = {
      data,
      type: 1
    }
  })
}

//获取已完成事件
let getfulfilTodoList = async (ctx, next) => {
  let { id } = ctx.request.query
  await list.getfulfilList(id)
    .then((data) => {
      ctx.body = {
        data,
        type: 1
      }
    })
    .catch((data) => {
      ctx.body = {
        data,
        type: 1
      }
    })
}

//增加事件
let addTodoList = async (ctx, next) => {
  let {id, date, event} = ctx.request.body

  await list.addList(id, date, event)
  .then((data) => {
    ctx.body = {
      data,
      type: 1
    }
  })
  .catch((data) => {
    console.log(data);
  })
}
// 完成事件
let fulfilList = async (ctx, next) => {
  let { id } = ctx.request.body // 获取事件id
  await list.fulfilList(id)
  .then((data) => {
    ctx.body = {
      data,
      type: 1
    }
  })
  .catch((data) =>{
    ctx.body = {
      data,
      type: 0
    }
  })
}

//撤销完成事件
let cancelTodoList = async (ctx, next) => {
  let { id } = ctx.request.body
  await list.cancelList(id)
  .then((data) => {
    ctx.body = {
      data,
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

let deleteTodoList = async (ctx, next) => {
  let { id } = ctx.request.body
  await list.deleteList(id)
  .then((data) => {
    ctx.body = {
      data,
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

let updateDatas = async (ctx, next) => {
  let { id } = ctx.request.body
  await list.updateDatas(id)
  .then((data) => {
    ctx.body = {
      data,
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

let cancelFulfilData = async  (ctx, next) => {
  let { id } = ctx.request.body
  await list.cancelFulfilData(id)
  .then((data) => {
    ctx.body = {
      data,
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

let deleteFulfilData = async  (ctx, next) => {
  let { id } = ctx.request.body
  console.log(id);
  
  await list.deleteFulfilData(id)
  .then((data) => {
    ctx.body = {
      data,
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

module.exports = {
  addTodoList,
  getTodoList,
  fulfilList,
  getfulfilTodoList,
  cancelTodoList,
  deleteTodoList,
  updateDatas,
  cancelFulfilData,
  deleteFulfilData
}