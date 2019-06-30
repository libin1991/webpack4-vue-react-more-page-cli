// 与 AsyncParallelHook 的 callAsync 方法类似，AsyncSeriesHook 的 callAsync 方法也是通过传入回调函数的方式，
//在所有事件处理函数执行完毕后执行 callAsync 的回调函数。


const { AsyncSeriesHook } = require('tapable');

// 创建实例
const asyncSeriesHook = new AsyncSeriesHook(['name', 'age']);

// 注册事件
console.time('time');
asyncSeriesHook.tapAsync('1', (name, age, next) => {
  setTimeout(() => {
    console.log('1', name, age, new Date());
    next();
  }, 1000);
});

asyncSeriesHook.tapAsync('2', (name, age, next) => {
  setTimeout(() => {
    console.log('2', name, age, new Date());
    next();
  }, 2000);
});

asyncSeriesHook.tapAsync('3', (name, age, next) => {
  setTimeout(() => {
    console.log('3', name, age, new Date());
    next();
  }, 3000);
});

// 触发事件，让监听函数执行
asyncSeriesHook.callAsync('哈哈', 18, () => {
  console.log('complete');
  console.timeEnd('time');
});

/*
1 哈哈 18 2019-05-18T09:05:49.031Z
2 哈哈 18 2019-05-18T09:05:51.050Z
3 哈哈 18 2019-05-18T09:05:54.058Z
complete
time: 6051.961ms
*/

/*
异步串行是指，事件处理函数内三个定时器的异步执行时间分别为 1s、2s 和 3s，而三个事件处理函数执行完总共用时接近 6s，
所以三个事件处理函数执行是需要排队的，必须一个一个执行，当前事件处理函数执行完才能执行下一个。

AsyncSeriesHook 类的 tabAsync 方法注册的事件处理函数参数中的 next 可以与 AsyncParallelHook 
类中 tabAsync 方法参数的 done 进行类比，同为回调函数，不同点在于 AsyncSeriesHook 与
AsyncParallelHook 的 callAsync 方法的 “并行” 和 “串行” 的实现方式。
*/
 