# vue-route-transition

> vue router 切换动画

## 特性

* 模拟前进后退动画
* 基于css3流畅动画
* 基于sessionStorage，页面刷新不影响路由记录
* 路由懒加载，返回可记录滚动条位置
* 前进后退的判断与路由路径规则无关
* 支持任意基于Vue的UI框架

## demo
<img src="https://github.com/dreamback/vue-route-transition/blob/master/src/assets/demo.gif?raw=true">  

## 手机扫码
<img src="https://github.com/dreamback/vue-route-transition/blob/master/src/assets/qrcode.png?raw=true">  

[在线预览](https://dreamback.github.io/vue-route-transition/)


## 说明
配套包含两个组件
* `vue-route-transition` 负责动画
* `router-layout` 负责页面排版。 主要是解决`transform`动画，`position:fixed`异常问题  

## 像往常一样使用
```
npm i vue-route-transition --save
```
main.js  
``` javascript
import RouteTransition from 'vue-route-transition'
Vue.use(RouteTransition)
```
App.vue
``` html
<template>
  <vue-route-transition id="app">
  </vue-route-transition>
</template>
```
页面，如果有吸附头部，或吸附底部元素的情况下才需要使用`router-layout`组件
``` html
<template>
  <router-layout>
    <header slot="header">
      头部导航
    </header>
    <div></div>
    <div></div>
    ...
    <footer slot="footer">
      <button>底部按钮</button>
    </footer>
  </router-layout>
</template>
```
如果存在子路由,需手动设置router-layout的`id`属性，滚动条定位作用。
``` html
<router-layout id="__index">
  <router-view></router-view>
  <van-tabbar slot="footer" :fixed="false" v-model="active">
    <van-tabbar-item to="/" icon="shop">标签</van-tabbar-item>
    <van-tabbar-item to="/tab" icon="chat">标签</van-tabbar-item>
    <van-tabbar-item to="/swipe" icon="records">标签</van-tabbar-item>
  </van-tabbar>
</router-layout>
```  

[github](https://github.com/dreamback/vue-route-transition)  



## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。
