## Uploader.js

一个很简单的Javascript原生面向对象的图片上传插件

## 使用
```js

import Uploader from './js/uploader.js'

var uploader = new Uploader({
    target: '#uploader', //上传容器
    fileList: '#fileList', //文件预览容器
    url: "//jsonplaceholder.typicode.com/posts/", //上传路径
    paramName: 'file', //input的name属性
    maxFiles: 5, //最多可上传数量
    maxFilesize: 512, //最大文件体积
    acceptedFiles: '.jpg, .jpeg, .png, .gif', //允许文件格式
    autoUpload: true, //是否自动上传
    addRemoveLinks: true, //添加删除按钮
    uploadMultiple: true, //允许同时上传多个文件
    headers: { //请求头信息
      'accessToken': 'accessToken'
    },
    addedfile: function(fileList) { //添加文件回调
      console.log('----addedfile-----');
      console.log(fileList);
    },
    removedfile: function(file) { //删除文件回调
      console.log('----removedfile-----');
      console.log(file);
    },
    success: function(event, file) { //上传成功的回调
      console.log('----success-----');
      console.log(event, file);
    },
    error: function(event, file) { //上传失败的回调
      console.log('----error-----');
      console.log(event, file);
    },
    complete: function(event, file) { //上传成功和失败的回调
      console.log('----complete-----');
      console.log(event, file);
    },
    uploadprogress: function(file, total, progress) { //上传进度的回调
      console.log('----uploadprogress-----');
      console.log(file, total, progress);
    },
    message: { //提示信息
      uploadText: '将文件拖到此处，或点击上传',
      maxFilesText: '到达最多上传数目',
      maxFilesizeText: '文件过大',
      singleFileText: '只能上传单个文件',
      acceptedFilesText: '不支持该文件格式'
    },
    messageFn: function(tip) { //提示信息方式接口，可以结合其它插件
      alert(tip);
    }
});

//手动触发上传
uploader.upload()

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
