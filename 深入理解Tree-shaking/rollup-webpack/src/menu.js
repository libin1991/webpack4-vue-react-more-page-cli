goog.provide('menu')

export default class Menu {
  constructor () {
    this.display = 'none'
  }
  show () {
    this.display = 'block'
  }
  hide () {
    this.display = 'none'
  }
  isShow () {
    return this.display === 'block'
  }
}
