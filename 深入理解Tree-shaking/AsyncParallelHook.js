//tapAsync/callAsync:
//callAsync 的最后一个参数为回调函数，在所有事件处理函数执行完毕后执行。

const { AsyncParallelHook } = require('tapable');

// 创建实例
const asyncParallelHook = new AsyncParallelHook(['name', 'age']);

// 注册事件
console.time('time');
asyncParallelHook.tapAsync('1', (name, age, done) => {
  setTimeout(() => {
    console.log('1', name, age, new Date());
    done();
  }, 1000);
});

asyncParallelHook.tapAsync('2', (name, age, done) => {
  setTimeout(() => {
    console.log('2', name, age, new Date());
    done();
  }, 2000);
});

asyncParallelHook.tapAsync('3', (name, age, done) => {
  setTimeout(() => {
    console.log('3', name, age, new Date());
    done();
    console.timeEnd('time');
  }, 3000);
});

// 触发事件，让监听函数执行
asyncParallelHook.callAsync('哈哈', 18, () => {
  console.log('complete');
});


//1 哈哈 18 2019-05-18T08:53:56.481Z
//2 哈哈 18 2019-05-18T08:53:57.510Z
//3 哈哈 18 2019-05-18T08:53:58.490Z
//complete
//time: 3014.832ms

//异步并行是指，事件处理函数内三个定时器的异步操作最长时间为 3s，而三个事件处理函数执行完成总共用时接近 3s，所以三个事件处理函数是几乎同时执行的，不需等待。