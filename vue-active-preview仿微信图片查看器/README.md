# vue-active-preview

![NPM](https://nodei.co/npm/vue-active-preview.png?downloads=true&downloadRank=true&stars=true)

![img](https://img.shields.io/npm/v/vue-active-preview.svg) ![img](https://img.shields.io/bundlephobia/minzip/vue-active-preview.svg) ![img](https://img.shields.io/npm/dt/vue-active-preview.svg) ![img](https://img.shields.io/github/license/accforgit/vue-active-preview.svg)

`vue-active-preview` 是一个面向移动端、无依赖、轻量级的 `vue`放大预览组件(`image gallery`)

![img](https://raw.githubusercontent.com/accforgit/vue-active-preview/master/public/preview_1.gif)

[English](https://github.com/accforgit/vue-active-preview/blob/master/README_US.md) | 简体中文

## 示例

- [Basic Demo](https://accforgit.github.io/vue-active-preview/basic.html)

- [vue-active-preview](https://github.com/accforgit/vue-active-preview) 与 [vue-active-swiper](https://github.com/accforgit/vue-active-swiper)结合使用的 [Live Demo](https://accforgit.github.io/vue-active-preview/swiper_preview.html)

## 安装

```
npm install vue-active-preview --save
```

## 导入

### 全局导入

```js
// 样式引用
import 'vue-active-preview/dist/VueActivePreview.css'

import Vue from 'vue'
import VueActivePreview from 'vue-active-preview'

Vue.use(VueActivePreview)
```

### 局部导入

```js
// 样式引用
import 'vue-active-preview/dist/VueActivePreview.css'

// in ES6 modules
import VueActivePreview from 'vue-active-preview'

// in CommonJS
const VueActivePreview = require('vue-active-preview')

export default {
  components: {
    VueActivePreview
  }
}
```

### script 脚本形式导入

```html
<link rel="stylesheet" href="../node-modules/vue-active-preview/dist/VueActivePreview.css" charset="utf-8">
<script src="../node-modules/vue-active-preview/dist/VueActivePreview.umd.min.js"></script>
```

```js
new Vue({
  el: '#app',
  components: {
    VueActivePreview
  }
})
```

## 用法

在 `Vue`组件实例中使用:
```html
<VueActivePreview :urlList="[
  'https://dummyimage.com/375x100/FB8A80?text=1',
  'https://dummyimage.com/375x100/29A90F?text=2',
  'https://dummyimage.com/375x100/6F9DFF?text=3'
]" />
```

## Options

### Props

|参数|类型|描述|默认值|是否必须|
|----|---|----|----|---|
|urlList|Array|传入的图片数组|[]|否|
|backgroundSize|String|图片以何种缩放的形式铺在滑动容器框(`Swiper`)内，取值及效果都与 `CSS background-size`一致 <br>只有当指定了 urlList 时才有效|contain|否|
|maxScaleValue|Number|最大放大倍数，如果设置为 0，表示不限制最大放大倍数|5|否|
|showCounter|Boolean|是否需要默认的计数器|false|否|
|counterStyle|Object|自定义默认计数器的样式 <br>只有当 `showCounter`为 `true`时才有效|null|否|
|startIndex|Number|起始渲染显示的previewItem index|0|否|
|criticalValue|Number|临界点的比例值，当超过此值代表的临界点，则将自动滑动到下一张图片|1/3|否|
|autoPlayDelay|Number|如果指定了此参数，并且值 `>= 0`，则将会将此值当做 自动轮播`delay`的时间(单位为 `ms`)进行自动轮播；不指定则不自动轮播 <br>如果想要指定此值，一般建议设置为 `3000`|null|否|
|duration|Number|自动滚动到稳定位置所需的时间，单位是秒(ms)|350|否|
|noDragWhenSingle|Boolean|如果只有一个 swipeItem，是否禁止拖动|true|否|

### Events

|事件名|描述|参数|
|---|---|---|
|click|整个组件的点击事件（可用于控制组件的显示/隐藏）|activeIndex|
|change|每次滚动结束后的回调|activeIndex|

## 额外的能力

### slot

`VueActivePreview`组件还可以接收一个 `slot`，方便开发者更加自由地定制化组件，但请注意的是，此 `slot`只是作为 `VueActivePreview`组件的一个普通子元素，而不是可缩放预览的图片组件

```html
<VueActivePreview :urlList="urlList">
  <p>slot content</p>
</VueActivePreview>
```

## License

MIT
