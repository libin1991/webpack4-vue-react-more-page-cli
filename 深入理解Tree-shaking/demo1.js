//引入tapable
const {
    SyncHook,
    AsyncParallelHook
} = require('tapable');

//创建类
class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(["newSpeed"]),
            break: new SyncHook(),
            calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
        };
    }
}

const myCar = new Car();

//绑定同步钩子
myCar.hooks.break.tap("WarningLampPlugin", () => console.log('WarningLampPlugin'));

//绑定同步钩子 并传参
myCar.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));



//绑定一个异步Promise钩子
myCar.hooks.calculateRoutes.tapPromise("calculateRoutes tapPromise", (source, target, routesList, callback) => {
    // return a promise
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(`tapPromise to ${source}${target}${routesList}`)
            resolve();
        },1000)
    })
});
//绑定一个异步Promise钩子
myCar.hooks.calculateRoutes.tapAsync("calculateRoutes tapAsync", (source, target, routesList, callback) => {
    // return a promise
    setTimeout(() => {
        console.log(`tapAsync to ${source}${target}${routesList}`)
        callback();
    }, 2000)
});

 

//执行同步钩子
myCar.hooks.break.call();
myCar.hooks.accelerate.call('hello');

console.time('cost');
console.time('cost2');
//执行异步钩子
myCar.hooks.calculateRoutes.promise('i', 'love', 'tapable').then(() => {
    console.timeEnd('cost');
}, err => {
    console.error(err);
    console.timeEnd('cost');
})

myCar.hooks.calculateRoutes.callAsync('i', 'like', 'tapable', err => {
    console.timeEnd('cost2');
    if(err) console.log(err)
})
 
/*
WarningLampPlugin
Accelerating to hello
tapPromise to ilovetapable
tapPromise to iliketapable
tapAsync to ilovetapable
cost: 2005.944ms
tapAsync to iliketapable
cost2: 2006.742ms
 */