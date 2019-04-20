## magnifier.js

一个很简单的 Javascript 原生面向对象的放大镜插件

## 使用

```js
import Magnifier from "./js/magnifier.js";

// 默认遍历含有'data-magnifier'属性的DOM元素
var app = new Magnifier({
    size: 200, // 放大镜大小
    position: "right", // 放大镜位置：top/right/bottom/left
    margin: 20, // 放大镜边距
    showTitle: true // 是否显示title
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
