

const { AsyncParallelHook } = require('tapable');

// 创建实例
const asyncParallelHook = new AsyncParallelHook(['name', 'age']);

// 注册事件
console.time('time');
asyncParallelHook.tapPromise('1', (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('1', name, age, new Date());
      resolve('1');
    }, 1000);
  });
});

asyncParallelHook.tapPromise('2', (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('2', name, age, new Date());
      resolve('2');
    }, 2000);
  });
});

asyncParallelHook.tapPromise('3', (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('3', name, age, new Date());
      resolve('3');
    }, 3000);
  });
});

// 触发事件，让监听函数执行
asyncParallelHook.promise('哈哈', 18).then(() => {
  console.log('ok');
  console.timeEnd('time');
});


/*
1 哈哈 18 2019-05-18T09:01:16.911Z
2 哈哈 18 2019-05-18T09:01:17.940Z
3 哈哈 18 2019-05-18T09:01:18.920Z
ok
time: 3023.350ms
 * */