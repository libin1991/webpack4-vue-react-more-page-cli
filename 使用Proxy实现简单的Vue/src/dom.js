import { hasProperty, toKebabCase, isObject, isFunction, isString } from './util.js'
import Watcher from './data'
import Vue from './vue.js'

const updater = {
  text (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value
  },
  model (node, value) {
    node.value = typeof value === 'undefined' ? '' : value
  },
  html (node, value) {
    node.innerHTML = typeof value === 'undefined' ? '' : value
  },
  attr (node, value, attr) {
    let ret = value
    if (!value) {
      ret = ''
    } else if (attr === 'style') {
      ret = ''
      // 解析style对象
      for (let name of Object.keys(value)) {
        ret += `${toKebabCase(name)}: ${value[name]};`
      }
    } else if (attr === 'class') {
      ret = ''

      // 解析class字符串
      if (isString(value)) {
        ret = value
      } else {
        // 解析class对象，当属性为true添加class
        for (let name of Object.keys(value)) {
          ret += value[name] ? `${name} `: ''
        }
      }
    }
    node.setAttribute(attr, ret)
  }
}

const compileUtil = {
  /**
   * 统一绑定watcher
   */
  bind ({node, vm, exp, type, attr}) {
    const update = updater[type]
    let ret = this.getVal(vm, exp)

    update && update(node, ret, attr)

    /**
     * 针对:style = {
     *   fontSize: () => this.size
     * }
     * 这种，为每个属性增加watcher
     */
    if (isObject(exp)) {
      for (let key of Object.keys(exp)) {
        new Watcher(vm, exp[key], (value) => {
          ret[key] = value
          update && update(node, ret, attr)
        })
      }
    } else {
      new Watcher(vm, exp, (value) => {
        update && update(node, value, attr)
      })
    }
  },
  text (node, vm, exp) {
    this.bind({node, vm, exp, type: 'text'})
  },
  html (node, vm, exp) {
    this.bind({node, vm, exp, type: 'html'})
  },
  attr (node, vm, exp, attr) {
    this.bind({node, vm, exp, type: 'attr', attr})
  },
  model (node, vm, exp) {
    this.bind({node, vm, exp, type: 'model'})

    node.addEventListener('input', (e) => {
      const value = e.target.value
      this.setVal(vm, exp, value)
    })
  },
  getVal (vm, exp) {
    // 解析函数
    if (isFunction(exp)) {
      return exp.call(vm)
    }

    // 解析对象
    if (isObject(exp)) {
      let ret = {}
      for (let key of Object.keys(exp)) {
        ret[key] = isString(exp[key]) ? exp[key] : this.getVal(vm, exp[key])
      }
      return ret
    }

    // 解析a.b.c这种
    const expArr = exp.split('.')
    let val = vm

    expArr.forEach(prop => {
      val = val[prop]
    })
    return val
  },
  setVal (vm, exp, value) {
    let val = vm
    const expArr = exp.split('.')
    const len = expArr.length
    expArr.forEach((key, index) => {
      if (index >= len - 1) {
        val[key] = value
      } else {
        val = val[key]
      }
    })
  }
}

export default class Dom {
  constructor (vm) {
    // 确定每次节点都能访问到vm实例
    this._vm = vm

    return new Proxy({}, {
      get: this._getDom.bind(this)
    })
  }

  _getDom (target, tagName) {
    return (attrs = {}, ...childrens) => {
      this._elem = document.createElement(tagName)
      this._attrs = attrs
      this._childrens = childrens
      this._bindAttrs()
      this._addChildrens()

      return this._elem
    }
  }

  /**
   * 属性
   * @return {[type]} [description]
   */
  _bindAttrs () {
    const { _attrs, _elem, _vm } = this

    for (let attr in _attrs) {
      if (hasProperty(_attrs, attr)) {
        // 事件绑定
        if (attr.indexOf('@') === 0) {
          this._bindEvents(attr)
        } else if (attr.indexOf('$') === 0) {
          this._bindDirectives(attr, _elem)
        } else if (attr.indexOf(':') === 0) {
          compileUtil.attr(_elem, _vm, _attrs[attr], attr.slice(1))
        } else {
          _elem.setAttribute(attr, _attrs[attr])
        }
      }
    }
  }

  /**
   * 指令
   * @return {[type]} [description]
   */
  _bindDirectives (attr, _elem) {
    const { _attrs, _vm } = this

    // 绑定指令
    const exp = _attrs[attr]
    const type = attr.slice(1)

    if (!compileUtil[type]) {
      throw new Error('cannot find directive of ' + attr )
    }
    compileUtil[type](_elem, _vm, exp)
  }

  /**
   * 事件绑定
   * @return {[type]} [description]
   */
  _bindEvents (attr) {
    // TODO event decorator
    this._elem.addEventListener(attr.substr(1), this._attrs[attr], false)
  }

  /**
   * 渲染子节点
   */
  _addChildrens () {
    const { _childrens, _elem, _vm } = this
    
    _childrens.forEach(children => {
      const type = typeof children
      let child

      switch (type) {
        case 'function': 
          child = document.createTextNode('')
          compileUtil.text(child, _vm, children)
          break
        case 'string':
          child = document.createTextNode(children)
          break
        default:
          child = children
      }
      _elem.appendChild(child)
    })
  }
}
