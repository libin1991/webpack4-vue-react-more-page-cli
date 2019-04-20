## turntable.js

一个很简单的Javascript原生面向对象的图片动画插件

## 使用
```js

import Turntable from './js/turntable.js';

//接收两个参数
//第一个参数为字符串或者DOM
//第二个参数为配置对象

var turntableDemo = new Turntable('.turntableDemo1', {
  images: ['./images01.png', './images02.png', './images03.png'],  //需要被显示的序列图片数组，为必填
  trigger: 'hover', //触发方式，可选鼠标经过：'hover'、页面滚动：'scroll'
  throttle: 100 //由于需要异步预加载所有图片，故实例的初始化方法可能触发多次，可以根据具体图片加载情况来设置时间容差，达到限制初始化次数
});

//销毁实例
turntableDemo.destory();

//手动播放
turntableDemo.play();

```
## 开发

安装依赖
```sh
$ npm install
```

开发模式：http://localhost:8080/
```sh
$ npm run dev
```

发布模式
```sh
$ npm run build
```
