# click-colorful 点击特效，五颜六色的小球绽放
![click-colorful](./demo.gif 'click-colorful')

实现见掘金https://juejin.im/post/5be3817de51d457844614b42
> 背景： 一般这种动画会用canvas实现，但是canvas不是万能的，如果首页加载需要这个动画，页面加载会有大量的请求，这时会阻塞js，造成卡顿
本插件秉着页面加载时尽可能减少js执行原则，采用CSS3结合js，利用硬件加速，提升性能，解决卡顿
> 默认配置
```javascript
var params = {
        colors: ["#eb125f", "#6eff8a", "#6386ff", "#f9f383"], // 自定义颜色
        size: 30, // 小球大小
	maxCount: 50, // 点击一次出现多少个球
  }
```
> 使用方式
 - 引入click-colorful.js ``` <script src="click-colorful.js"></script>```
 - 实力化插件
 ```javascript
//params不传，则走默认配置
var color = new colorBall(params)
// 绽放一次
color.fly(x, y)
// 绽放5次,间隔300ms
color.fly(x, y, 5, 300)
```
 
