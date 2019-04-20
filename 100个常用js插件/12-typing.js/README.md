## Typing.js

一个很简单的Javascript原生面向对象的打字效果插件（源码明明只有2.8kb，打包后却有20kb）

## 使用
```js

import Typing from './js/typing.js';

//接收两个参数
//第一个参数为字符串或者DOM，假如使用光标，则建议为浮动元素（例如span），默认为'.typing'，为必填
//第二个参数为配置对象

var typingDemo = new Typing('.typingDemo1', {
  strings: ['帝高阳之苗裔兮，朕皇考曰伯庸。', '摄提贞于孟陬兮，惟庚寅吾以降。'], //需要被显示的字符串数组，为必填
  typeSpeed: 100, //打字速度，默认为60，为选填
  backSpeed: 50, //删除速度，默认为30，为选填
  startDelay: 500, //开始延迟，默认为500，为选填
  backDelay: 1000, //删除延迟，默认为1000，为选填，为选填
  loop: true, //是否循环，默认为true，为选填
  showCursor: true, //是否显示，默认为true，为选填
  cursorChar: '|', //光标字符串，默认为'|'，为选填
  onFinished: function(a, b) { //当loop为false且打字结束时回调，a参数为strings的长度，b为最后一个的字符串长度，为选填
    console.log('结束了', a, b);
  }
});

//销毁实例
typingDemo.destory();

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
