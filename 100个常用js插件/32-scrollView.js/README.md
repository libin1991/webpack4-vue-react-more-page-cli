## scrollView.js

一个很简单的 Javascript 原生面向对象的滚动效果插件

## 使用

```js
import ScrollView from "./js/scrollView.js";

var app = new ScrollView({
      rootMargin: '0% 50%', // 边距
      threshold: 0.5, // 容差
      animateClassName: 'sv-animate', // 动画类名
      selector: '[data-sv]', // 目标元素
      once: true // 是否只运行一次
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
