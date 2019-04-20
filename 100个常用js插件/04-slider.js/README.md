## Slider.js

一个很简单的Javascript原生面向对象的幻灯片插件

## 使用
```js

import Slider from './js/slider.js'

var slider = new Slider({
  container: '.slider',
  mode: 'fade', //fade或者slide
  duration: 50, //过渡时间
  delay: 2000, //停留时间
  start: 0, //开始下标
  auto: true, //自动播放
  loop: true, //循环播放
  direction: true, //显示方向箭头
  controls: true, //显示分页控制
  captions: true //显示图片标题
});

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
