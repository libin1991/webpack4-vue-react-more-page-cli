## chosen.js

一个很简单的 Javascript 原生面向对象的下拉框插件，样式来自 [chosen](https://github.com/harvesthq/chosen)

## 使用

```js
import Chosen from "./js/chosen.js";

var select = new Chosen('.select', {
    search: true, // 是否显示搜索
    no_results: 'Oops, nothing found!', // 搜索无结果提示，可选
    deselect: true, // 是否可清空
    width: "50%" // 相对宽度，可选
});

// 监听变化
select.change(function (selected) {
    console.log(selected);
});

// 获取当前值
select.value()

// 销毁插件
select.destroy()

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
