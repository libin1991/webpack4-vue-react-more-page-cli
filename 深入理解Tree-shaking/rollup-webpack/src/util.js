goog.provide('util')

export function post () {
  console.log('do post')
}

post.prototype.before = () => {
  console.log('before')
}

export function get () {
  console.log('do get')
}
