import Watcher, { observify } from './data.js'
import Dom from './dom.js'
import { foreach } from './util'

export default class MVVM {
  constructor(config) {
    this._config = config
    this._ticks = []
    // 用来存储指令
    this._initVM()
    this._initData(config.data)
    this._initComputed()
    this._bindVM()
    this._appendDom()

    return this._vm
  }
 
  /**
   * 初始化data为observable
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  _initData (data) {
    this._data = observify(data())
  }

  _initComputed () {
    const { _config, _vm } = this

    this._computed = {}

    foreach(_config.computed, (expFn, name) => {
      this._computed[name] = expFn.call(_vm)

      new Watcher(_vm, expFn, val => {
        this._computed[name] = val
      })
    })
  }

  /**
   * 将_vm与data进行绑定，访问_vm时，可直接访问到data上的属性
   */
  _initVM () {
    this._vm = new Proxy(this, {
      get: (target, prop, receiver) => {
        return this[prop] || this._data[prop] || this._computed[prop]
      },

      set: (target, prop, value) => {
        if (!this[prop]) {
          return Reflect.set(this._data, prop, value)
        }

        return Reflect.set(target, prop, value)
      }
    })
  }

  /**
   * render函数
   * 后续需要进行diff操作，不整个更新dom
   */
  _appendDom () {
    const { render, el } = this._config
    const targetEl = document.querySelector(el)

    // 为节点渲染绑定vm
    const dom = new Dom(this._vm)
    const result = render(dom)
    // 替换节点
    targetEl.appendChild(result)
  }

  /**
   * 为所有的函数绑定this
   */
  _bindVM () {
    const { _config } = this

    for(let key of Object.keys(_config)) {
      const val = _config[key]
      if (typeof(val) === 'function') {
        _config[key] = val.bind(this._vm)
      }
    }
  }
}
