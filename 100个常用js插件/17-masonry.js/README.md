## Masonry.js

一个很简单的 Javascript 原生面向对象的瀑布流排版插件

## 使用

```js
import Masonry from './js/masonry.js';

var app = new Masonry('.masonry-container', {
    margin: 20, // 边距
    columns: 6, // 分栏
    breakAt: { // 自适应分栏
        1200: 5,
        940: 3,
        520: 2,
        400: 1
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
