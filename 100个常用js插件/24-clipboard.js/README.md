## clipboard.js

一个很简单的 Javascript 原生面向对象的复制插件

## 使用

```js
import Clipboard from "./js/clipboard.js";

var app = new Clipboard({
    target: "#bar", // 被复制的目标元素
    trigger: "#btn", // 点击触发的元素
    beforecopy: function(e){ // 复制前的钩子
        return e.text + " + 附加文本";
    }
});

// 复制成功的钩子
app.on("success", function(e){
    alert("复制成功：" + e.text);
});

// 复制失败的钩子
app.on("error", function(e){
    console.error('error', e);
});

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
