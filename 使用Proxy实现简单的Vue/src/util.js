export const hasProperty = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

export const isObject = obj => {
  return Object.prototype.toString.call(obj) === "[object Object]"
}

export const isFunction = obj => {
  return typeof obj === 'function'
}

export const isString = obj => {
  return typeof obj === 'string'
}

export const toCamelCase = str => {
  return str.replace(/\-(\w)/g, (all, letter) => letter.toUpperCase)
}

export const toKebabCase = str => {
  return str.replace(/[A-Z]/g, (letter) => `-${letter}`).toLowerCase()
}

export const foreach = (obj, fn) => {
  const keys = Object.keys(obj)
  let ret
  console.log(keys)
  if (!keys.length) {
    return
  }

  for (let key of keys) {
    ret = fn.call(obj, obj[key], key)

    // 当返回false时，终止循环
    if (!ret) {
      break
    }
  }
}
