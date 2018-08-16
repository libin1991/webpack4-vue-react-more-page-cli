//金额转大写
function money2Chinese(num) {
	if(typeof num) throw new Error('参数为数字')
	let strOutput = ""
	let strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分'
	num += "00"
	const intPos = num.indexOf('.')
	if(intPos >= 0) {
		num = num.substring(0, intPos) + num.substr(intPos + 1, 2)
	}
	strUnit = strUnit.substr(strUnit.length - num.length)
	for(let i = 0; i < num.length; i++) {
		strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1)
	}

	return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
}

//生成随机颜色
constructedObj['color'] = '#' + this.randomColor();
randomColor() {
		return Math.floor(Math.random() * 16777215).toString(16);
	},

	//节流
	function throttle(fn, delay) {
		delay = delay || 50
		let statTime = 0
		return function() {
			statTime === 0 && fn.apply(arguments)
			let currentTime = new Date()
			if(currentTime = statTime > delay) {
				fn.apply(arguments)
				statTime = currentTime
			}
		}
	}

let throttleFn = throttle(fn)
throttleFn()
throttleFn()
throttleFn()
throttleFn() //只会执行一次
//防抖
function debounce(fn, delay) {
	delay = delay || 50
	let timer = null
	return function() {
		let self = this
		clearTimeout(timer)
		timer = setTimeout(fn.bind(self, arguments), delay);
	}
}


//你给我写一个原生bind方法
Function.prototype._bind = function (context) {
  let self = this
  let args_1 = [].prototype.slice.call(arguments, 1)
  return function () {
    let args_2 = [].prototype.slice.call(arguments)
    let args = args_1.concat(args_2)
    return this.apply(context, args)
  }
}
//这只是对bind的一种简单实现，如果有兴趣了解更多可以参考Javascript中bind()方法的使用与实现
//如何实现一个数组的展平
function (ary) {
    return ary.toString().split(',')
}


 