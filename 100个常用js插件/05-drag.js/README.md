## Drag.js

一个很简单的Javascript原生面向对象的DOM元素拖动插件

## 使用
```js

import Drag from './js/drag.js'

var drag = new Drag({
  container: '.drag_wrap', //被拖动的DOM
  dragEle: '.drag_header', //可被拖动的DOM
  ondrag: function (event) { //事件对象中有一个新对象drag包含当前container元素的坐标值
    document.querySelectorAll('.drag_x')[0].innerHTML = 'X: ' + event.drag.x;
    document.querySelectorAll('.drag_Y')[0].innerHTML = 'Y: ' + event.drag.y;
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
