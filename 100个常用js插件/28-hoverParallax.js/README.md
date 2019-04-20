## hoverParallax.js

一个很简单的 Javascript 原生面向对象的鼠标经过视差插件

## 使用

```js
import HoverParallax from "./js/hoverParallax.js";

// 只需要传一个dom选择器，视差偏移值在html的data-depth设置
var app = new HoverParallax('.parallax');

// 销毁插件
app.destroy();

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
