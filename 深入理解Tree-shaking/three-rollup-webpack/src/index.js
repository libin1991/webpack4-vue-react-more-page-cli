goog.provide('main')
goog.require('util')
goog.require('menu')

import {post} from './util.js'   //tree-shaking有效
import menu from './menu.js'   //tree-shaking无效

let baz = () => {
  post()
  var l=100
  var x = "我是无效变量1"
  console.log(x)
  function unused () {
    return "我是无效函数"
  }
  return l;
}

baz()
