## Pullrefresh.js

一个很简单的Javascript原生面向对象的视差滚动插件(整体逻辑参考了[rellax](https://github.com/dixonandmoe/rellax))

## 使用
```js

import Parallax from './js/parallax.js';

//第一个参数为视差滚动的元素，默认值为".parallax"

//第二个参数为配置对象，可选
//speed: 默认滚动速度，可以为视差元素添加'data-parallax-speed'属性指定滚动速度，默认-2
//interval: 滚动速度的可控区间，最慢和最快都不会超过该区间，默认[-10, 10]

//speed比 0 小表示速度更小，比 0 大表示速度更大。
//默认speed存在三个临界值: 等于 -10 表示相对静止；等于 0 表示正常速度；等于 10 表示两倍速度

var parallaxDemo = new Parallax('.parallax', {
  speed: -2,
  interval: [-10, 10]
});

//动态添加视差元素后更新实例
parallaxDemo.update();

//销毁实例(注意：假如动态添加的元素含有行内样式，会被清空)
parallaxDemo.destory();

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
