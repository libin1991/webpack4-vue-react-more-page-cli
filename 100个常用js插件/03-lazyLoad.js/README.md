## LazyLoad.js

一个很简单的Javascript原生面向对象的图像懒加载插件

## 使用
```js

import LazyLoad from './js/lazyLoad.js'

var LazyLoad = new LazyLoad({
  offset: 200, //距离容差
  throttle: 200, //加载时间容差
  loadCallback: function(element) { //加载完成的回调函数，参数为对应的DOM对象
    element.className = 'load';
  }
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
