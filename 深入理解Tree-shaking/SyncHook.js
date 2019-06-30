const { SyncHook } = require('tapable');

// 创建实例
const syncHook = new SyncHook(['name', 'age']);

// 注册事件
syncHook.tap('1', (name, age) => console.log('1', name, age));
syncHook.tap('2', (name, age) => console.log('2', name, age));
syncHook.tap('3', (name, age) => console.log('3', name, age));

// 触发事件，让监听函数执行
syncHook.call('哈哈', 18);

// 1 哈哈 18
// 2 哈哈 18
// 3 哈哈 18



/*在 tapable 解构的 SyncHook 是一个类，注册事件需先创建实例，创建实例时支持传入一个数组，
数组内存储事件触发时传入的参数，实例的 tap 方法用于注册事件，支持传入两个参数，
第一个参数为事件名称，在 Webpack 中一般用于存储事件对应的插件名称（名字随意，只是起到注释作用），
 第二个参数为事件处理函数，函数参数为执行 call 方法触发事件时所传入的参数的形参。*/