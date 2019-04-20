## Tags.js

一个很简单的 Javascript 原生面向对象的标签插件

## 使用

```js
import Tags from './js/tags.js';

var app = new Tags('.tags-container', {
    default: ['标签一', '标签二', '标签三'], // 默认标签
    closable: true, // 是否可删除
    filter: function(val, index){ // 对新增的标签值进行过滤，参数为当前标签值和下标
        return index + '-' + val
    },
    init: function(data) { // 初始化钩子，参数为当前标签列表
        
    },
    add: function(data, value) { // 新增标签钩子，参数为当前标签列表和新增的标签
        
    },
    remove: function(data, value) { // 删除标签钩子，参数为当前标签列表和新增的标签
        
    }
});

// 获取当前标签列表
app.getTags();

// 销毁，参数为true时会把dom清空
app.destroy(true);

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
