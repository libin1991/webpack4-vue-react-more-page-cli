/**
 * 节流函数，timeStep内不会被触发两次或以上
 * @param  {Number} timeStep [description]
 */
export default timeStep => {
  return (target, name, descriptor) => {
    const fn = descriptor.value
    let timer

    descriptor.value = function (...args) {
      clearTimeout(timer)
      timer = setTimeout(_ => fn.apply(this, args), timeStep)
    }

    return descriptor
  }
}
