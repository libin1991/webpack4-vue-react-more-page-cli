## counterUp.js

一个很简单的 Javascript 原生面向对象的数字累计插件

## 使用

```js
import CounterUp from "./js/counterUp.js";

var app = new CounterUp('.counter', {
    delay: 20, // 更新速度，选填
    time: 1000, // 总时间，选填
    counterFn: function (number, el) { // 格式化自定义数字，选填，参数为当前数字和对应的dom元素
        return '$ ' + number;
    },
    startCallback: function (number, el) { // 开始钩子，选填，参数为当前数字和对应的dom元素
        console.log('开始：' + number);
    },
    endCallback: function (number, el) { // 结束钩子，选填，参数为当前数字和对应的dom元素
        console.log('结束：' + number);
    }
});

// 开始
app.start();

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
