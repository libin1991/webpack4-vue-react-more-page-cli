## split.js

一个很简单的 Javascript 原生面向对象的视图分割插件

## 使用

```js
import Split from "./js/split.js";

var app = new Split({
    parent: '.split-parent', // 父视图
    children: '.split-children', // 子视图
    defaultSize: 100, // 默认尺寸，单位px
    minSize: 50, // 最小尺寸，单位px
    maxSize: 500, // 最大尺寸，单位px
    onDragStart: function(e, el) { // 拖动开始，参数为事件对象和变化的元素
        console.log('开始：' + el.textContent);
    },
    onDragEnd: function(e, el) { // 拖动结束，参数为事件对象和变化的元素
        console.log('结束：' + el.textContent);
    },
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
