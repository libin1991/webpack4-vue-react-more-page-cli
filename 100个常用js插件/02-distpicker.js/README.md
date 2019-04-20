## Distpicker.js

一个很简单的Javascript原生面向对象的中国地区联动选择插件

## 使用
```js

import Distpicker from './js/distpicker.js'

var distpicker = new Distpicker({
  target: '#distpicker', //挂载DOM对象
  valueType: 'code', //返回格式，code表示返回编码，name表示返回城市中文名
  placeholder: ["请选择省", "请选择市", "请选择区"], //设置placeholder
  autoselect: ["山西省", "太原市", "小店区"], //设置默认值
  callback: function (value) { //每次地区下拉框改变后的回调函数，参数为返回值的数组
    console.log(value);
  }
});

//根据编码返回地区名
distpicker.getDistricts(130000)

//根据地区名返回编码
distpicker.getDistricts('广州市')

//返回当前值数组，可以是编码或者地区名
distpicker.getValue()

//重置实例
distpicker.reset();

//销毁实例
distpicker.destroy();

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
