# Light-Swiper
> 专注于移动端、轻量级Swiper原生插件（3kb gziped）。触摸事件基于element，不影响页面的触摸事件（如右滑返回上一页）

> 重构于Swipe，实现自定义swipe宽度、偏移量、无限轮播、事件复制等功能，体验更加流畅

# 预览
<img src="https://p0.meituan.net/dpgroup/21b2252b405605a068f19c97b9d7c96b16823.png" width=120>

[预览](https://simonzhangiter.github.io/light-swiper/)

# 安装

```javascript
npm install light-swiper
// or
yarn add light-swiper
```

或者通过`script`标签的形式引入

```javascript
<script src="./swiper.min.js"></script>
```
现在，你可以使用全局变量`lightSwiper`


# 用法

light-swiper只需要遵循简单的布局模式，如：

```html
<div class="light-swiper">
  <div class="swiper-wrap">
    <div class="swipe-item"></div>
    <div class="swipe-item"></div>
    <div class="swipe-item"></div>
    <div class="swipe-item"></div>
  </div>
</div>
```

以上是最初需要的结构：一系列元素包裹在两个容器中。 在每个swipe-item可以自定义你想要的内容。初始化Swiper只需简单一行代码，传入swiper的最外层DOM即可，如下所示：

```javascript
import Swiper from 'light-swiper'

const mySwiper = new Swiper(document.querySelector('.light-swiper'));
```

除此之外，还需要一些简单的CSS样式：

```css
.light-swiper {
  overflow: hidden;
  position: relative;
}

.swiper-wrap {
  overflow: hidden;
  position: relative;
}

.swipe-item {
  float: left;
  width: 100%;
  position: relative;
}
```

# 自定义配置选项

滑动可以选择第二个参数: [options]

| 参数        | 说明    |  类型  |   默认值  |
| --------   | -----   | ----  |   ----   |
| startSlide     | 默认的索引位置    |   int    |   0   |
| speed   | 动画执行时间     |   int   |   300    |
| auto   |  是否自动播放, 传入切换时间      |   int    |   -    |
| continuous  |  是否循环播放     |   boolean    |   false    |
| width     | 单个swipe的宽度，一般在需要预览多个swipe时使用    |   int    |   -   |
| offset     | 距离左边的偏移量，一般在需要预览多个swipe时使用    |   int    |   -   |
| disableScroll  |  禁用Swiper的所有触摸事件     |   boolean    |   false    |
| stopPropagation  |  阻止事件冒泡     |   boolean    |   false    |
| callback  |  事件回调     |   Function    |   (index, currentEl)    |
| transitionEnd  |  动画完成事件     |   Function    |   (index, currentEl)    |
| swiping  |  使用已刷过的全宽度的百分比（0-1）进行滑动时调用     |   Function    |   (percent)    |

## 例子

```javascript
const mySwiper = new Swiper(document.querySelector('.light-swiper'), {
  width: 310,
  offset: 30,
  startSlide: 2,
  speed: 400,
  auto: 3000,
  continuous: true,
  disableScroll: false,
  stopPropagation: false,
  callback: function(index, elem) {},
  transitionEnd: function(index, elem) {}
});
```

# API

light-swiper暴露了以下可以控制滑动的API：

`prev() ` 滑动到上一页

`next()` 滑动到下一页

`getPos()` 返回当前位置的索引

`getNumSlides()` 返回滑块总数量

`kill()` 销毁当前Swiper实例

# 兼容性

Swipe现在兼容所有浏览器，包括IE7 +。 Swipe最适合支持CSS变换和触摸的设备，但也可以在没有这些设备的情况下使用。 一些辅助方法确定触摸和CSS转换支持并相应地选择适当的动画方法。
