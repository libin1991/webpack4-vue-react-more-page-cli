## Lottery.js

一个很简单的 Javascript 原生面向对象的抽奖插件

## 使用

```js
import Lottery from "./js/lottery.js";

// 第一个参数为容器，第二个参数为配置对象
var app = new Lottery(".lottery", {
  items: ".item", // 奖品类名
  time: 10000, // 运行时间（与实际时间不一致，有待优化）
  begin: function() { // 开始钩子
    console.log("抽奖开始");
  },
  end: function(index) { // 结束钩子，参数为中奖奖品的下标
    alert("中奖号码下标为：" + index);
  }
});

// 设置中奖下标
app.prize(7);

// 开始抽奖
app.start();

// 是否禁用抽奖，传一个布尔值
app.disabled(true)

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
