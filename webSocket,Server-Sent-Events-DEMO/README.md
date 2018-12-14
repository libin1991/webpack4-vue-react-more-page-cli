
## 基于webSocket的web通信应用（兼容移动端），后台使用node+express搭建基础http服务，使用socket.io搭建通讯层的ws服务。实现了全部成员的群聊、针对某一成员的私聊以及新消息提示等一些常用功能。前端用原生js编写实现了发送表情以及发送本地图片功能，还用到了 manifest 相关的一些概念，可以通过桌面直接进入。**

 

### 启动流程

 

`npm install`

`node server.js`

本地访问地址 http://127.0.0.1:8686/YouChat

(没顾上做动态编译 `webpack` 是构建命令每次修改代码都要运行一次)


**登录页**
![](https://upload-images.jianshu.io/upload_images/13130832-21fd678dda16e7f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**群聊以及私聊功能**
![](https://upload-images.jianshu.io/upload_images/13130832-664251039f05c125.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/13130832-7456a9a1258013d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**发送表情包发送本地图片**
![](https://upload-images.jianshu.io/upload_images/13130832-051ae2b7535609c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**移动端UI展现**

![](https://upload-images.jianshu.io/upload_images/13130832-d039d9d2fd70c9c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/13130832-30e02f6d1946555b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/13130832-3ccb944acd45e328.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**h5 Notification 的表现效果**
![](https://upload-images.jianshu.io/upload_images/13130832-7e34c5ecb780061f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/13130832-cc9feb2241c19539.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<br/>
<br/>

### 另外要说两个知识点是 manifest 和 Notification
**manifest**
manifest是PWA用到的一个技术点，关于PWA早就想学习一下了，直到最近才看了官方的文档，我们用link标签在页面头部引入一个manifest配置文件，在manifest配置文件里可以配置页面图标、启动动画、应用名称等一些属性，然后通过浏览器把应用发送到桌面下次就可以直接从桌面进入，表现的效果接近原生的app，因为隐藏了浏览器的一些工具栏等操作区。交互性能上也要好很多，下面是相关的表现UI。

桌面图标

![](https://upload-images.jianshu.io/upload_images/13130832-2926ba0ce5d66fcc.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

启动动画

![](https://upload-images.jianshu.io/upload_images/13130832-459bc714b244c39d.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


主要功能

![](https://upload-images.jianshu.io/upload_images/13130832-3aba93d39a603bc6.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/13130832-8f237dc2546835c1.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

*manifest只是PWA相关技术栈的一个技术点，PWA还涉及到离线加载等很多的东西，本应用就只是用manifest配置了一下展现UI。*


**Notification**
Notification是H5的api作用是基于浏览器来触发消息通知而不是页面，也就是说把页面最小化或者切换到别的tab页，Notification的通知消息还是可以正常触发。但是有一个限制在Chrome里必须是https协议，而safari则不对协议做限制，UI表现在上面已经给出来了。
