## tree.js

一个很简单的 Javascript 原生面向对象的树结构插件

## 使用

```js
import Tree from './js/tree.js';

var nodes = [
  {
    value: 'value1', // value
    label: 'label1', // 展示文字
    checked: true, // 默认是否选中
    expanded: true, // 默认是否展开
    children: [ // 子数组
      { value: 'value1-1', label: 'label1-1' },
      { value: 'value1-2', label: 'label1-2' },
      { value: 'value1-3', label: 'label1-3' }
    ]
  }
];

var app = new Tree({
  el: '.tree-container', // 容器
  nodes: nodes, // 节点
  checkbox: true, // 是否展示checkbox
  accordion: false, // 是否手风琴展示
  onCheck: function(e) { // checkbox改变时
    console.log(e);
  },
  onExpand: function(e) { // accordion改变时
    console.log(e);
  }
});

// 获取当前选中项
app.getChecked();

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
