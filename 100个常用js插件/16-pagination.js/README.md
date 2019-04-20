## Pagination.js

一个很简单的 Javascript 原生面向对象的分页插件

## 使用

```js
import Pagination from './js/pagination.js';

// 接收两个参数
// 第一个为容器，默认为'.paginate-container'
// 第二个为配置对象
var app = new Pagination('.paginate-container', {
    current: 25, // 默认当前页
    total: 50, // 默认总页数
    show: 10, // 默认展示页数
    previous: 'Previous', // 上一页提示
    next: 'Next', // 下一页提示
    callback: function(e){ // 点击分页的回调函数，其中事件对象包含一个额外属性对象'pagination'
        app.set('current', e.pagination.nextPage);
        console.log(e.pagination);
    }
});


// 实例对象有两个个公用方法
// set用于动态设置参数，可以操作如下
app.set('current', 10);
app.set('total', 10);
app.set('show', 10);
app.set('previous', '上一页');
app.set('next', '下一页');
app.set('callback', function(e){  });

// destory用于销毁实例，参数为布尔类型，为ture时会把视图的Dom对象移除
app.destory(true);

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
