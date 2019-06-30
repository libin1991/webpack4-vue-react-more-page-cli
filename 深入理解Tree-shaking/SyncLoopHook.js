const { SyncLoopHook } = require('tapable');

// 创建实例
const syncLoopHook = new SyncLoopHook(['name', 'age']);

// 定义辅助变量
let total1 = 0;
let total2 = 0;

// 注册事件
syncLoopHook.tap('1', (name, age) => {
  console.log('1', name, age, total1);
  return total1++ < 2 ? true : undefined;
});

syncLoopHook.tap('2', (name, age) => {
  console.log('2', name, age, total2);
  return total2++ < 2 ? true : undefined;
});

syncLoopHook.tap('3', (name, age) => console.log('3', name, age));

// 触发事件，让监听函数执行
syncLoopHook.call('哈哈', 18);

//1 哈哈 18 0
//1 哈哈 18 1
//1 哈哈 18 2
//2 哈哈 18 0
//2 哈哈 18 1
//2 哈哈 18 2
//3 哈哈 18

/*通过上面的执行结果可以清楚的看到 SyncLoopHook 的执行机制，但有一点需要注意，
返回值必须严格是 true 才会触发循环，多次执行当前事件处理函数，必须严格返回 undefined，
才会结束循环，去执行后面的事件处理函数，
如果事件处理函数的返回值不是 true 也不是 undefined，则会死循环。 */