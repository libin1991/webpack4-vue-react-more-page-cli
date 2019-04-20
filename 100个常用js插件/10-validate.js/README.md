## Pullrefresh.js

一个很简单的Javascript原生面向对象的表单验证插件

## 使用
```js

import Validate from './js/validate.js'

//自定义规则01
var validatorPassword = function (value, callback) {
  if(value === ''){
    callback(new Error('请输入密码'));
  } else if (!/^[A-Za-z0-9]{6,20}$/.test(value)) {
    callback(new Error('6-20位字母数字组合'));
  } else {
    callback();
  }
}

//自定义规则02
var validatorRadio = function (value, callback) {
  if(value === ''){
    callback(new Error('请选择一种水果'));
  } else if (value !== '1') {
    callback(new Error('请选择苹果哦'));
  } else {
    callback();
  }
}

//自定义规则03
var validatorCheckbox = function (value, callback) {
  if(value.length === 0){
    callback(new Error('请选择三种水果'));
  } else if (value.length < 3) {
    callback(new Error('请至少选择三个'));
  } else {
    callback();
  }
}

//自定义规则04
var validatorSelect = function (value, callback) {
  if(value === ''){
    callback(new Error('请选择一种水果'));
  } else if (value !== '2') {
    callback(new Error('请选择桃子哦'));
  } else {
    callback();
  }
}

//实例化
var validateDemo = new Validate({
  container: '.demo01', //表单form元素，必填
  itemParent: 'p', //表单元素的父级，当使用'radio'和'checkbox'的Dom属性验证时为必填, 默认为空
  focusError: true, //错误表单元素是否获取焦点，默认为true，选填
  submitHandler: function(form) { //表单通过时的回调，参数为表单Dom元素，选填
    form.submit();
  },
  errorMsg: { //默认提示文本，选填
    requiredMsg: function () {
      return '此项为必填项'
    },
    minlengthMsg: function (num) {
      return '至少为' + num + '个字符';
    },
    maxlengthMsg: function (num) {
      return '至多为' + num + '个字符';
    },
    minMsg: function (num) {
      return '至小为' + num + '的数字';
    },
    maxMsg: function (num) {
      return '至大为' + num + '的数字';
    },
    regexMsg: function (regex) {
      return '不匹配正则：' + regex;
    },
    isNaNMsg: function () {
      return '此值为非数字'
    },
    functionMsg: function () {
      return '此值为非函数'
    }
  },

  //validators为当使用Dom属性验证时且使用了validators作为属性则为必填
  validators: {
    validatorPassword: validatorPassword,
    validatorRadio: validatorRadio,
    validatorCheckbox: validatorCheckbox,
    validatorSelect: validatorSelect
  },

  //rules为当使用js规则验证时为必填，rules的属性必需与元素的name属性对应，自带验证规则包含以下
  //required: 是否必填
  //minlength: 至少字符串
  //maxlength: 至多字符串
  //min: 至小数字
  //max: 至大数字
  //regex: 正则表达式

  //trigger为触发条件，且为必填项
  //input: 值实时变化时
  //blur: 失去焦点时
  //change: 值改变且失去焦点时

  //validator为自定义规则的函数, 在验证规则里权限最高，假如存在validator，则会忽视其他自带规则
  //value: 传入的值('checkbox'时传入的是数组)
  //callback: 回调函数，为空时表示验证通过，不为空且为Error时为提示文本

  rules: {
    vInput: [
      { required: true, message: '此项为必填', trigger: 'input' },
      { minlength: 3, maxlength: 5, message: '长度在 3 到 5 个字符', trigger: 'input' }
    ],
    vNumber: [
      { required: true, message: '此项为必填', trigger: 'input' },
      { min: 3, max: 10, trigger: 'input' }
    ],
    vRegex: [
      { required: true, message: '此项为必填', trigger: 'blur' },
      { regex: /^1[34578]\d{9}$/, trigger: 'blur' }
    ],
    vPassword: [
      { validator: validatorPassword, trigger: 'input' }
    ],
    vTextarea: [
      { required: true, message: '此项为必填', trigger: 'blur' },
    ],
    vRadio: [
      { validator: validatorRadio, trigger: 'change' }
    ],
    vCheckbox: [
      { validator: validatorCheckbox, trigger: 'change' }
    ],
    vSelect: [
      { validator: validatorSelect, trigger: 'change' }
    ]
  }
});

//手动触发验证, 参数为空时表示验证全部, 不为空且为name组成的数组时为个别验证,
//注意此方法只做验证，不会触发submitHandler方法
//返回值为一个对象，包含指定元素的验证结果true或者false
var validateState = validateDemo.validate(['vInput', 'vNumber']);

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
