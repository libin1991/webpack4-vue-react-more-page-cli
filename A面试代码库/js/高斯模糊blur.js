// 随机数，生成滤镜Id的工具函数
var randomID = function() {
	return '_' + Math.random().toString(36).substr(2, 9)
}

var SVG = {
	// 命名空间
	svgns: 'http://www.w3.org/2000/svg',
	xlink: 'http://www.w3.org/1999/xlink',

	// 创建svg元素
	createElement(name, attrs) {
		//创建一个具有指定的命名空间URI和限定名称的元素
		var element = document.createElementNS(SVG.svgns, name)

		if(attrs) {
			SVG.setAttr(element, attrs)
		}
		return element
	},

	// 添加属性
	setAttr(element, attrs) {
		for(var i in attrs) {
			if(i === 'href') { // path of an image should be stored as xlink:href attribute
				element.setAttributeNS(SVG.xlink, i, attrs[i])
			} else {
				element.setAttribute(i, attrs[i])
			}
		}
		return element
	}
}

/**
 * 
 * @param {*} element 
 * @param {*} options 
 *  url: '', // 图片的url
    blurAmount: 10, //模糊度
    imageClass: '', // 该样式将应用在image和svg元素上
    overlayClass: '', // 将覆盖模糊图像的元素的CSS类
    duration: false, 
    opacity: 1 
 */
var Blur = function(element, options) {
	this.internalID = randomID()
	this.element = element
	this.width = element.offsetWidth
	this.height = element.offsetHeight
	this.parent = this.element.parentNode
	this.options = Object.assign({}, Blur.DEFAULTS, options)
	this.overlayEl = this.createOverlay()
	this.blurredImage = null
	this.generateBlurredImage(this.options.url)
}

Blur.DEFAULTS = {
	url: '',
	blurAmount: 10,
	imageClass: '',
	overlayClass: '',
	duration: false,
	opacity: 1
}

Blur.prototype.setBlurAmount = function(blurAmount) {
	this.options.blurAmount = blurAmount
}

Blur.prototype.generateBlurredImage = function(url) {
	const previousImage = this.blurredImage
	this.internalID = randomID()

	if(previousImage) {
		previousImage.parentNode.removeChild(previousImage)
	}

	this.blurredImage = this.createSVG(url, this.width, this.height)
}

Blur.prototype.createOverlay = function() {
	if(this.options.overlayClass && this.options.overlayClass !== '') {
		const div = document.createElement('div')
		div.classList.add(this.options.overlayClass)
		this.parent.insertBefore(div, this.element)
		return div
	}
	return false
}

Blur.prototype.createSVG = function(url, width, height) {
	var that = this
	var svg = SVG.createElement('svg', {
		xmlns: SVG.svgns,
		version: '1.1',
		width: width,
		height: height,
		id: 'blurred' + this.internalID,
		class: this.options.imageClass,
		viewBox: '0 0 ' + width + ' ' + height, // 起始点x,y，w,h
		preserveAspectRatio: 'none' //强制统一缩放比来保持图形的宽高比
	})

	var filterId = 'blur' + this.internalID
	var filter = SVG.createElement('filter', { // filter
		id: filterId
	})

	var gaussianBlur = SVG.createElement('feGaussianBlur', { // gaussian blur element
		'in': 'SourceGraphic',
		stdDeviation: this.options.blurAmount // 强度的模糊
	})

	var image = SVG.createElement('image', { // The image that uses the filter of blur
		x: 0,
		y: 0,
		width: width,
		height: height,
		'externalResourcesRequired': 'true',
		href: url,
		style: 'filter:url(#' + filterId + ')', // filter link
		preserveAspectRatio: 'none'
	})

	filter.appendChild(gaussianBlur)
	svg.appendChild(filter)
	svg.appendChild(image)

	// 确保图像在持续时间100毫秒后显示，以防SVG加载事件没有触发或占用太长时间
	if(that.options.duration && that.options.duration > 0) {
		svg.style.opacity = 0
		window.setTimeout(function() {
			if(getStyle(svg, 'opacity') === '0') {
				svg.style.opacity = 1
			}
		}, this.options.duration + 100)
	}
	this.element.insertBefore(svg, this.element.firstChild)
	return svg
}

function getStyle(ele, prop) {
	return window.getComputedStyle(ele, null).getPropertyValue(prop)
}






/******************************/
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>svg 高斯模糊</title>
  <script src="blur.js"></script>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    #container{
      margin: 0 auto;
      max-width: 750px;
      width: 100%;
      height: 200px;
    }
  </style>
</head>
<body>
  <div id="container"></div>
  <script>
    (function(){
      var BlurFn = new Blur(document.querySelector('#container'),{
        url: 'timg.jpg',
        blurAmount: 20,
        duration: 500, 
        opacity: 1 ,
        overlayClass:'_class'
      })
    })()
  </script>
  <!-- 
    高斯模糊(毛玻璃效果)实现方式
      1：css
        .blur {	
            -webkit-filter: blur(10px); /* Chrome, Opera */
              -moz-filter: blur(10px);
                -ms-filter: blur(10px);    
                    filter: blur(10px);
            
            filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
        }
      2：canvas StackBlur.js 借用
      3：svg 
    文选用方式 优势：比canvas库小，库源码算法较难懂；实现比 css 样式效果更好，之前遇到过该类需求filter大后 css边会变的模糊，效果较差
    step1：利用svg,高斯模模糊属性，生成图片的滤镜，高斯模糊效果，相关api参照http://www.w3school.com.cn/svg/svg_filters_gaussian.asp
    结构
    <svg width="100%" height="100%" version="1.1"
      xmlns="http://www.w3.org/2000/svg">
      <filter id="Gaussian_Blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
      </filter>
      <image xlink:href="xxx.jpg" x="" y="" height="" width="" style="filter:url(#Gaussian_Blur)></image>
    </svg>
    文档注释
      <filter> 标签的 id 属性可为滤镜定义一个唯一的名称（同一滤镜可被文档中的多个元素使用）
      filter:url 属性用来把元素链接到滤镜。当链接滤镜 id 时，必须使用 # 字符
      滤镜效果是通过 <feGaussianBlur> 标签进行定义的。fe 后缀可用于所有的滤镜
      <feGaussianBlur> 标签的 stdDeviation 属性可定义模糊的程度
      in="SourceGraphic" 这个部分定义了由整个图像创建效果
    step2:coding
    使用：
     var BlurFn = new Blur(document.querySelector('#container'),{
        url: 'timg.jpg',
        blurAmount: 20,
        duration: 500, 
        opacity: 1 ,
        overlayClass:'_class'
      })
      实例提供setBlurAmount，generateBlurredImage两个接口动态设置
   -->
</body>
</html>