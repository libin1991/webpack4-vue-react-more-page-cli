## Danmu.js

一个很简单的 Javascript 原生面向对象的弹幕插件

## 使用

```js
import Danmu from "./js/danmu.js";

var app = new Danmu("#danmu", {
  zIndex: 100, // z-index 值
  speed: 7000, // 默认速度
  color: "#FFFFFF", // 默认颜色
  fontSize: [18, 24], // 小字号和大字号
  opacity: 0.9, // 透明度
  safeDistance: [10, 50] // 上下安全距离
});

// 开始播放
app.start();

// 加载弹幕，参数为弹幕对象组成的数值
app.setDanmu([]);

// 发送实时弹幕，第一个参数为为弹幕对象，第二个参数为回掉函数返回封装过的弹幕对象
app.send({}， callback);

// 弹幕对象
var danmu = {
    text: "这是弹幕1", // 文本
    color: "#fff", // 颜色
    border: "red", // 字体描边
    size: 0, // 字号大小，0为小，1为大
    time: 1000, // 加载的时间，实时弹幕时非必填
    speed: 1000 // 播放速度
}
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
