## progress.js

一个很简单的Javascript原生面向对象的加载条插件（精简版的 [NProgress.js](https://github.com/rstacruz/nprogress)）

## 使用
```js

import Progress from './js/progress.js';

//配置
Progress.configure({
  parent: 'body', //父元素
  speed: 300, //速度
  delay: 500, //延迟
  template: '<div id="progress"><div class="bar"></div></div>' //加载条Html
})

//开始
Progress.start();

//设置，范围为：0 ~ 1；
Progress.set(0.2);

//增加，范围为：0 ~ 1；
Progress.inc(0.2);

//完成
Progress.done();

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
