import { observable, action, runInAction, flow } from 'mobx'
import Axios from '../utils/request'
// observable就是封装了state
// const appStore = observable({
//   counter: 0
// })
// Actions 就是用来更新state的
// appStore.addCount = action(()=>{
//   appStore.counter += 1
// })
// appStore.subCount = action(()=>{
//   if (appStore.counter <= 0) return;
//   appStore.counter -= 1
// })

// use decorator 	packaging class
class appStore {
  @observable itemList = ['3']
  @observable counter = 0
  @observable balance = ''
  @observable summary = ''
  @observable cardData = ''
  @observable Error = false

  @action
  addCount() {
    this.counter +=1
  }

  @action
  addItem(item) {
    if (this.itemList.indexOf(item) !== -1) return;
    this.itemList.push(item)
  }
  // 把class实例提前绑定在该方法
  @action.bound
  removeItem(item) {
    this.itemLis = this.itemList.filter((x, index)=>{
      return x !== item;
    })
  }
  // 异步数据请求
  @action.bound
  async query() {
    try {
      this.status = 'pending'
      const result = await Axios.get('/h5/misc/config')

      runInAction(() => {
        this.itemList = result.List
        this.counter = result.counter
      })
    } catch (e) {
      runInAction(() => this.status = 'failed')
      console.log(e)
    }
  }

  // <- note the star, this a generator function!
  // 多个数据请求
  @action.bound
  loadEquity = flow(function* () {
    // yield instead of await
    try {
      const account = yield Axios.get('/h5/misc/config')
      const summary = yield Axios.get('/h5/misc/config')
      const equityList = yield Axios.get('/h5/misc/config')
      // the asynchronous blocks will automatically be wrapped in actions and can modify state
      this.accountId = account.accountId
      this.balance = account.balance
      this.summary = summary
      this.cardData = equityList
    } catch (e) {
      this.Error = true
    }
  })
}

export default new appStore();