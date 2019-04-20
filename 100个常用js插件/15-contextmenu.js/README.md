## Contextmenu.js

一个很简单的 Javascript 原生面向对象的弹出菜单插件

## 使用

```js
import Contextmenu from './js/contextmenu.js';

// 接收两个参数
// 第一个为容器，默认为'body'
// 第二个为配置对象，属性menu为数组类型

// menu数组用对象组成，属性有
// name: 菜单名字
// disabled: 是否禁用
// border: 是否显示底边
// callback: 点击的回调，有两个事件对象，分别对应为当前右键的dom和菜单的dom，可用以更丰富的功能扩展
// children: 子菜单列表，属性同menu

var app = new Contextmenu('.app', {
  menu: [
    {
      name: '返回',
      disabled: true
    },
    {
      name: '前进',
      disabled: true
    },
    {
      name: '重新加载',
      border: true,
      callback: function() {
        console.log('你点击了：重新加载');
        app.hide();
      }
    },
    {
      name: '另存为...',
      callback: function() {
        console.log('你点击了：另存为');
        app.hide();
      }
    },
    {
      name: '打印...',
      callback: function() {
        console.log('你点击了：打印');
        app.hide();
      }
    },
    {
      name: '投射...',
      border: true,
      callback: function() {
        console.log('你点击了：投射');
        app.hide();
      }
    },
    {
      name: '更多...',
      children: [
        {
          name: '显示网页源码',
          callback: function() {
            console.log('你点击了：显示网页源码');
            app.hide();
          }
        },
        {
          name: '检测视图',
          callback: function() {
            console.log('你点击了：检测视图');
            app.hide();
          }
        }
      ]
    }
  ]
});

// 实例对象有三个公用方法
// update用于动态更新菜单项，更新方式为直接覆盖
app.update({
    name: '新菜单01'
},{
    name: '新菜单02'
});

// destory用于销毁实例
app.destory();

// hide用于隐藏当前菜单，想在点击菜单后隐藏菜单，需要显式调用该方法
app.hide();
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
