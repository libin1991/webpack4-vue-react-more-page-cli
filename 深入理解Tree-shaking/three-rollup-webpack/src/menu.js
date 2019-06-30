goog.provide('menu')

export default class Menu {
  constructor () {
    this.display = '不确定'
  }
  show () {
    this.display = '显示'
  }
  hide () {
    this.display = '隐藏'
  }
  isShow () {
    return this.display === '隐藏'
  }
}
