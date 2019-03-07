/**
 * 节流函数，timeStep内不会被触发两次或以上
 * @param  {Number} timeStep [description]
 */
export default (target, name, descriptor) => {
    const fn = descriptor.value

    descriptor.value = function (...args) {
      const vm = fn.apply(this, args)

      return new Proxy(vm, {
        get (target, prop, receiver) {
          return Reflect.get(target, prop, receiver)
        }
      })
    }

    return descriptor
  }
}
