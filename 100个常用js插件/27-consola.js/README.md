## consola.js

一个很简单的 Javascript 原生面向对象的日志拦截插件

## 使用

```js
import consola from "./js/consola.js";

// 创建
consola.creat({
    target: 'body', // 目标父元素，默认body
    position: 'right', // 挂载位置right、bottom，默认bottom
    size: '300px', // 尺寸大小，默认300px
    zIndex: 99 // z-index，默认99
});

// 清空
consola.clean();

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
