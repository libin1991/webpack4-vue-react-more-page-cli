## Zoom.js

一个很简单的Javascript原生面向对象的图片缩放插件

## 使用
```js

import Zoom from './js/zoom.js'

var zoom = new Zoom({
  callback: function (el) { //callback为图片加载并打开后的DOM对象
    console.log(el);
  }
});

//销毁实例
zoom.destroy()

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
