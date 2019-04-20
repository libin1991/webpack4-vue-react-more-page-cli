## OnePageScroll.js

一个很简单的 Javascript 原生面向对象的单页面滚动插件，参考了[purejs-onepage-scroll](https://github.com/peachananr/purejs-onepage-scroll)

## 使用

```js
import OnePageScroll from './js/onePageScroll.js';

var app = new OnePageScroll('.page-container', {
  sectionContainer: 'section',
  easing: 'ease',
  animationTime: 1000,
  pagination: true,
  loop: false,
  keyboard: true,
  beforeMove: function(index) {
    console.log(index);
  },
  afterMove: function(index) {
    console.log(index);
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
