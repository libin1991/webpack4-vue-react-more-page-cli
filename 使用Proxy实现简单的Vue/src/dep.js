/**
 * 实现订阅
 */
let id = 0
export default class Dep {
  constructor() {
    this.id = ++id
    this._subscribes = new Map()
  }

  notify (prop) {
    const subscribes = this._subscribes.get(prop)
    if (subscribes) {
      subscribes.forEach(subscribe => {
        subscribe.update()
      })
    }
  }

  addSub (prop, subscribe) {
    const subscribes = this._subscribes.get(prop)
    if (subscribes) {
      subscribes.push(subscribe)
    } else {
      this._subscribes.set(prop, [subscribe])
    }
  }
}