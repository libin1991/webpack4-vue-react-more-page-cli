# vue-keep-scroll-position

A vue 2.0 directive to keep scroll position for keep-alived components. Forked from [vue-keep-scroll](https://github.com/mark-hahn/vue-keep-scroll) and rewritten for vue 2.0 compatibility.

## Install

```bash
npm i -S vue-keep-scroll-position
```

## Plug into vue

```js
import Vue from 'vue'
import VueKeepScrollPosition from 'vue-keep-scroll-position'
Vue.use VueKeepScrollPosition
```

## Usage

Just add `v-keep-scroll-position` to your components within `<keep-alive>`. For `router-view`:

```html
<keep-alive>
  <router-view v-keep-scroll-position></router-view>
</keep-alive>
```

For simple dynamic components:

```html
<keep-alive>
  <component :is="someComponentName" v-keep-scroll-position></component>
</keep-alive>
```