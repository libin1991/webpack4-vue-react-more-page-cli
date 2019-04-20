## Tsorter.js

一个很简单的 Javascript 原生面向对象的表格排序插件

## 使用

```js
import Tsorter from './js/tsorter.js';

// html属性
// data-tsorter-type: 内置过滤名称，目前只有'numeric'表示按数字排序
// data-tsorter-name: 排序的名称，可用于记录保存当前排序状态
// data-tsorter-fn: 自定义排序函数名称,优先级最大

// 自定义排序规则，有三个参数，第一为当前tr元素，第二个为下一个元素，第三个为当前排序类型
var sorter01 = function(a, b, type) {
  a = a.textContent;
  b = b.textContent;
  return type == 'ascend' ? b - a : a - b;
};

// 实例化
var app = new Tsorter('.table', {
  sorters: { // 自定义排序函数
    sorter01: sorter01
  },
  default: 'number=ascend', // 默认排序
  update: function(str) { // 排序更新钩子
    console.log(str);
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
