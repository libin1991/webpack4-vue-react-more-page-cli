const { SyncWaterfallHook } = require('tapable');

// 创建实例
const syncWaterfallHook = new SyncWaterfallHook(['name', 'age']);

// 注册事件
syncWaterfallHook.tap('1', (name, age) => {
  console.log('1', name, age);
  return '1';
});

syncWaterfallHook.tap('2', data => {
  console.log('2', data);
  return '2';
});

syncWaterfallHook.tap('3', data => {
  console.log('3', data);
  return '3'
});

// 触发事件，让监听函数执行
let ret = syncWaterfallHook.call('哈哈', 18);
console.log('call', ret);

// 1 哈哈 18
// 2 1
// 3 2
// call 3


/*SyncWaterfallHook 名称中含有 “瀑布”，通过上面代码可以看出 “瀑布” 形象生动的描绘了事件处理函数执行的特点，
与 SyncHook 和 SyncBailHook 的区别就在于事件处理函数返回结果的流动性.*/