function EventEmitter(){
    this._events = {} ;// 事件库
    this.count = 0 ; // 同类事件最大的监听数
}
// 最大监听数默认是10
EventEmitter.defaultMaxListeners = 10;
// 获取最大监听数
EventEmitter.prototype.getMaxListeners = function(){
    return this.count || EventEmitter.defaultMaxListeners
}
// 设置最大监听数
EventEmitter.prototype.setMaxListeners = function(n){
    this.count = n;
    return this
}
// addListener 和  on同样的作用
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

/**
 * 实现on方法
 * @param {string} eventName 订阅事件名
 * @param {function} callback 回调函数
 * @param {boolean} flag 是否添加到函数列表的第一位（是否第一次执行）
 */
EventEmitter.prototype.on = function(eventName,callback,flag){
    // 通常情况下 我们使用EventEmitter是通过util.inherits来继承EventEmitter的公有方法,而EventEmitter的_events属性是在实例上的 因此 如果检测到是通过继承拿到的 那么就为这个类添加_events属性
    if(!this._events) this._events = Object.create(null);
    // 如果事件名不是newListener 那么检测如果订阅了newListener那么就执行
    if(eventName !== 'newListener' && this._events["newListener"] && this._events["newListener"].length){
        this._events['newListener'].forEach(fn =>fn(eventName));
    }
    if(this._events[eventName]){
        // 如果之前添加过这个事件
        if(flag){
            this._events[eventName].unshift(callback)
        }else{
            this._events[eventName].push(callback)
        }
    }else{
        this._events[eventName] = [callback]
    }
     // 判断订阅事件数 超过最大个数 打印警告
     if (this._events[eventName].length >= this.getMaxListeners()) {
        console.warn('MaxListenersExceededWarning');
    }
}
/**
 * 返回当前订阅的事件名集合
 */
EventEmitter.prototype.eventNames = function(){
    return Object.keys(this._events)
}
/**
 * 返回订阅的事件绑定的函数个数
 * @param {string} eventName 
 */
EventEmitter.prototype.listenerCount = function(eventName){
    return (this._events[eventName] || []).length
}
/**
 * 返回订阅的事件绑定函数的copy
 * @param {string} eventName 
 */
EventEmitter.prototype.listeners = function(eventName){
    return [...(this._events[eventName] || [])]
}

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
/**
 * 移除某个事件下的执行函数
 * @param {string} eventName 
 * @param {function} callback 
 */
EventEmitter.prototype.removeListener = function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter((fn) => {
            return fn != callback && fn.realCallback !== callback;// 这里判断了fn是不是等于callback，同时也解决我们因为once操作而把原有的回调函数包裹一层的问题，通过暴露出来的原有回调作对比
        })
    }
    return this
}
/**
 * 移除某个事件的所有回调
 * @param {string} eventName 
 */
EventEmitter.prototype.removeAllListeners = function(eventName){
    if(this._events[eventName]){
        this._events[eventName] = []
    }
    return this
}
/**
 * 添加一个单次 listener 函数到名为 eventName 的事件。 下次触发 eventName 事件时，监听器会被移除，然后调用。
 * @param {string} eventName 
 * @param {function} callback 
 * @param {boolean} flag 
 */
EventEmitter.prototype.once = function(eventName,callback,flag){
    function wrap(){
        callback();
        this.removeListener(eventName,wrap)
    }
    wrap.realCallback = callback;// 这里因为once的回调函数被重新包裹了一层 因此当你removeListener的时候如果用原来的fn去判断是否相等的话就判断不到了，因此需要把原来的fn暴露到一个属性上，方便删除操作的时候去做对比
    this.on(eventName,wrap,flag)
    return this;
}
/**
 * 向数组前面添加事件
 * @param {string} eventName 
 * @param {function} callback 
 */
EventEmitter.prototype.prependListener = function (eventName, callback) {
    this.on(eventName, callback, true);
}
/**
 * 向数组前面添加事件 并且只执行一次
 * @param {string} eventName 
 * @param {function} callback 
 */
EventEmitter.prototype.prependOnceListener = function(eventName, callback){
    this.once(eventName,callback,true);
}
/**
 * 触发事件
 * @param {string} eventName 
 */
EventEmitter.prototype.emit = function (eventName) {
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => {
            fn.call(this);
        });
    }
}
作者： LeslieMay
链接： https: //juejin.im/post/5b7be4ba51882542aa1b3114
	来源： 掘金
著作权归作者所有。 商业转载请联系作者获得授权， 非商业转载请注明出处。