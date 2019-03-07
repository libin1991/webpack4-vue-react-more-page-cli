import { isObject } from './util.js'
import Dep from './dep'
import pushQueue from './batcher'

/**
 * 将对象转为监听对象
 * @param {*} obj 要监听的对象
 */
export const observify = (obj) => {
  if (!isObject(obj)) {
    return obj
  }

  // 深度监听
  Object.keys(obj).forEach(key => {
    obj[key] = observify(obj[key])
  })

  return defineReactive(obj)
}

function defineReactive (obj) {
  const dep = obj.__dep__ ? obj.__dep : new Dep()
  
  return new Proxy(obj, {
    get: (target, prop, receiver) => {
      // 添加'__dep__'属性
      if (prop === '__dep__') {
        return dep
      }

      // 为每个属性订阅自己的事件
      if (Dep.target) {
        dep.addSub(prop, Dep.target)

        // 同时监听下一级别，用于class/style等
        const child = target[prop]
        if (isObject(child)) {
          for (let key of Object.keys(child)) {
            child.__dep__.addSub(key, Dep.target)
          }
        }
      }
      
      return Reflect.get(target, prop, receiver)
    },

    set: (target, prop, value) => {
      const result = Reflect.set(target, prop, observify(value))
      // 触发订阅
      dep.notify(prop)
      return result  
    }
  })
}

/**
 * 简单实现data的读写监听
 */
export default class Watcher {
  constructor(vm, expFn, cb, deep) {
    this.vm = vm
    this.cb = cb
    this.expFn = expFn
    this.deep = deep
    this.value = this.get()
  }

  update () {
    pushQueue(this)
  }

  run () {
    const val = this.get()
    this.cb.call(this.vm, val, this.value)
    this.value = val
  }

  // subscribeAndGetVaule () {
  //   // 暂存依赖
  //   Dep.target = this
  //   this.value = this.get()
  // }
  /**
   * 根据expFn获取对应的值
   * 支持function, string
   * function: () => vm.a + vm.b
   * string: a.b
   */
  get () {
    const fn = this.expFn
    if (typeof fn === 'function') {
      Dep.target = this
      return fn.call(this.vm)
      Dep.target = null
    } else {
      const expArr = fn.split('.')
      let val = this.vm
      expArr.forEach((prop, index) => {
        if (index === expArr.length - 1) {
          Dep.target = this
        }
        val = val[prop]
      })

      // 深度监听，则依次触发value的getter,递归手机依赖
      if (this.deep) {
        this.deepSuscribe(val)
      }
      Dep.target = null
      return val
    }
  }
  /**
   * 深度监听
   * 其实就是将值深度获取一遍，触发getter
   * 就会将watcher添加到ge
   */
  deepSuscribe (value) {
    if (!isObject(value)) {
      return
    }

    for (let key of Object.keys(value)) {
      this.deepSuscribe(value[key])
    }
  }
}
