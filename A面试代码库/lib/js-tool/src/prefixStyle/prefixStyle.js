/**
 * @desc 对css属性针对不同浏览器加私有前缀
 */
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let tranformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform',
  }

  for (let key in tranformNames) {
    if (elementStyle[tranformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

function prefixStyle (style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

module.exports = prefixStyle