//与 AsyncParallelHook 类似，tapPromise 注册事件的事件处理函数需要返回一个 Promise 实例，
//promise 方法最后也返回一个 Promise 实例。

const { AsyncSeriesHook } = require('tapable');

// 创建实例
let asyncSeriesHook = new AsyncSeriesHook(['name', 'age']);

// 注册事件
console.time('time');
asyncSeriesHook.tapPromise('1', (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('1', name, age, new Date());
      resolve('1');
    }, 1000);
  });
});

asyncSeriesHook.tapPromise('2', (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('2', name, age, new Date());
      resolve('2');
    }, 2000);
  });
});

asyncSeriesHook.tapPromise('3', (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('3', name, age, new Date());
      resolve('3');
    }, 3000);
  });
});

// 触发事件，让监听函数执行
asyncSeriesHook.promise('哈哈', 18).then(() => {
  console.log('ok');
  console.timeEnd('time');
});

/*
1 哈哈 18 2019-05-18T09:11:11.092Z
2 哈哈 18 2019-05-18T09:11:13.111Z
3 哈哈 18 2019-05-18T09:11:16.131Z
ok
time: 6062.758ms
*/

/*
 分析上面的执行过程，所有的事件处理函数都返回了 Promise 的实例，如果想实现 “串行”，
则需要让每一个返回的 Promise 实例都调用 then，并在 then 中执行下一个事件处理函数，
这样就保证了只有上一个事件处理函数执行完后才会执行下一个。
*/