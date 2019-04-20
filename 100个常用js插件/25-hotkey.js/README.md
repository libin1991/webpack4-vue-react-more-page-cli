## hotkey.js

一个很简单的 Javascript 原生面向对象的键盘绑定插件

## 使用

```js
import hotkey from "./js/hotkey.js";

// 监听所有按键，注意此时回调函数返回两个参数
hotkey('*', function (type, { event, key, name }) {
    event.preventDefault();
    console.log("你按下了" + name + "键");
});

// 监听单个字符串按键
hotkey('a', function ({ event, key, name }) {
    event.preventDefault();
    console.log("你按下了" + name + "键");
});

// 监听单个键码按键
hotkey(66, function ({ event, key, name }) {
    event.preventDefault();
    console.log("你按下了" + name + "键");
});

// 监听组合按键，顺序为：shift、ctrl、alt、command
hotkey('shift + ctrl + a', function ({ event, key, name }) {
    event.preventDefault();
    console.log("你按下了" + name + "键");
});

// 销毁插件
hotkey.destroy();

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
