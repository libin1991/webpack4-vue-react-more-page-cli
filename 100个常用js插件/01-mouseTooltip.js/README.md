## MouseTooltip.js

一个很简单的Javascript原生面向对象的MouseTooltip插件

## 使用
```js

import MouseTooltip from './js/mouseTooltip.js'

/**
* 接受两个参数，第一个是DOM元素和id、class作为选择器
* 第二个为对象，moveIn为鼠标移入事件，moveOut为鼠标移出事件
*/
new MouseTooltip(".tooltipDemo", {
  moveIn: function (el, title, event) {
    console.log(event.type + " " + title);
  },
  moveOut: function (el, title, event) {
    console.log(event.type + " " + title);
  },
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
