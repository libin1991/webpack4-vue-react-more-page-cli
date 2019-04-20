## Pullrefresh.js

一个很简单的Javascript原生面向对象的下拉刷新插件

## 使用
```js

import Pullrefresh from './js/pullrefresh.js'

var pullrefresh_demo = new Pullrefresh({
  container: '.app', //被下拉的元素，默认整体容器为'document.body'
  pullText: '↓ 下拉', //下拉时显示文字
  dropText: '↑ 释放', //释放时显示文字
  loadingText: '刷新中...', //加载时显示的文字，默认维持1秒钟
  loadDistance: 200, //刷新距离，最大可拉动距离为屏幕的1/3
  onRefresh: function () { //刷新回调
    alert('刷新中...');
    window.location.reload();
  }
});

//销毁插件
pullrefresh_demo.destory()

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
