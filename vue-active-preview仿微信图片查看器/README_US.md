# vue-active-preview

![NPM](https://nodei.co/npm/vue-active-preview.png?downloads=true&downloadRank=true&stars=true)

![img](https://img.shields.io/npm/v/vue-active-preview.svg) ![img](https://img.shields.io/bundlephobia/minzip/vue-active-preview.svg) ![img](https://img.shields.io/npm/dt/vue-active-preview.svg) ![img](https://img.shields.io/github/license/accforgit/vue-active-preview.svg)

`vue-active-preview` is a Mobile-oriented、No dependencies、Lightweight PhotoSwipe Component(`image gallery`) for Vue.

![img](https://raw.githubusercontent.com/accforgit/vue-active-preview/master/public/preview_1.gif)

[简体中文](https://github.com/accforgit/vue-active-preview/blob/master/README.md) | English

## Example

- [Basic Demo](https://accforgit.github.io/vue-active-preview/basic.html)

- [vue-active-preview](https://github.com/accforgit/vue-active-preview) && [vue-active-swiper](https://github.com/accforgit/vue-active-swiper) [Live Demo](https://accforgit.github.io/vue-active-preview/swiper_preview.html)

## Install

```
npm install vue-active-preview --save
```

## Import

### import with global

```js
// require styles
import 'vue-active-preview/dist/VueActivePreview.css'

import Vue from 'vue'
import VueActivePreview from 'vue-active-preview'

Vue.use(VueActivePreview)
```

### import with component

```js
// require styles
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

### import with script

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

## Usage

Work on a Vue instance:
```html
<VueActivePreview :urlList="[
  'https://dummyimage.com/375x100/FB8A80?text=1',
  'https://dummyimage.com/375x100/29A90F?text=2',
  'https://dummyimage.com/375x100/6F9DFF?text=3'
]" />
```

## Options

### Props

|Option|Type|Description|Default|necessary|
|----|---|----|----|---|
|urlList|Array|image array|[]|false|
|backgroundSize|String|Specifies how the image is scaled in the sliding-container-box，Value and Effect are the same as `CSS background-size`|contain|false|
|maxScaleValue|Number|Maximum magnification，if the value is 0，then no limit|5|false|
|showCounter|Boolean|if need a default counter|false|false|
|counterStyle|Object|Customize the style of the default counter <br>Valid only when `showCounter` is `true`|null|false|
|startIndex|Number|Start preview item index|0|false|
|criticalValue|Number|Proportional value of critical point <br>When it exceeds the critical point represented by this value, it will automatically slide to the next picture.|1/3|false|
|autoPlayDelay|Number|If this parameter is specified and the value `>= 0`, the value will be taken as the time of automatic rotation `delay`(`ms`) for automatic rotation;Non-designated non-automatic rotation <br>If you want to specify this value, it is generally recommended to set it to `3000`|null|false|
|duration|Number|The time(`ms`) required to automatically scroll to a stable position|350|false|
|noDragWhenSingle|Boolean|If there is only one `swipeItem`, is dragging prohibited|true|false|

### Events

|Event Name|Description|params|
|---|---|---|
|click|Click events for the component|activeIndex|
|change|Callback after each scroll|activeIndex|

## Extra

### slot

`Swiper` can also receive a slot，make it easier for developers to customize components more freely:
```html
<VueActivePreview :urlList="urlList">
  <p>slot content</p>
</VueActivePreview>
```

## License

MIT
