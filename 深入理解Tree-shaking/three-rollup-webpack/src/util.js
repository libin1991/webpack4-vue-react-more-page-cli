goog.provide('util')

export function post () {
  console.log('我是post方法')
}

post.prototype.before = () => {
  console.log('before')
}

export function get () {
  console.log('我是get方法')
}
