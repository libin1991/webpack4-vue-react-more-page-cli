
class EventBus {

    constructor() {
        this.events = {};
    }

    on(type, callback, scope, ...args) {
        if (typeof this.events[type] == "undefined") {
            this.events[type] = [];
        }
        this.events[type].push({scope: scope, callback: callback, args: args});
    }

    off(type, callback, scope) {
        if (typeof this.events[type] == "undefined") {
            return;
        }
        let numOfCallbacks = this.events[type].length;
        let newArray = [];
        for (let i = 0; i < numOfCallbacks; i++) {
            let event = this.events[type][i];
            if (event.scope == scope && event.callback == callback) {

            } else {
                newArray.push(event);
            }
        }
        this.events[type] = newArray;
    }

    has(type, callback, scope) {
        if (typeof this.events[type] == "undefined") {
            return false;
        }
        let numOfCallbacks = this.events[type].length;
        if (callback === undefined && scope === undefined) {
            return numOfCallbacks > 0;
        }
        for (let i = 0; i < numOfCallbacks; i++) {
            let event = this.events[type][i];
            if ((scope ? event.scope == scope : true) && event.callback == callback) {
                return true;
            }
        }
        return false;
    }

    emit(type, target, ...args) {
        if (typeof this.events[type] == "undefined") {
            return;
        }
        let bag = {
            type: type,
            target: target
        };
        args = [bag].concat(args);
        let events = this.events[type].slice();
        let numOfCallbacks = events.length;
        for (let i = 0; i < numOfCallbacks; i++) {
            let event = events[i];
            if (event && event.callback) {
                let concatArgs = args.concat(event.args);
                event.callback.apply(event.scope, concatArgs);
            }
        }
    }

    debug() {
        let str = "";
        for (let type in this.events) {
            let numOfCallbacks = this.events[type].length;
            for (let i = 0; i < numOfCallbacks; i++) {
                let event = this.events[type][i];
                let className = "Anonymous";
                if (event.scope) {
                    if (event.scope.constructor.name) {
                        className = event.scope.constructor.name;
                    }
                }
                str += `${className} listening for "${type}"\n`;
            }
        }
        return str;
    }

};

export default new EventBus();




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EventBus Examples</title>
</head>
<body>

<script type="module">
    import EventBus from '/src/eventbus.js';
    // Simple example
    {
        function myHandler(event) {
            console.log("myHandler / type: " + event.type);
        }
        EventBus.on("my_event", myHandler);
        EventBus.emit("my_event");
    }
    // Keeping the scope
    {
        class TestClass1 {
            constructor() {
                this.className = "TestClass1";
                EventBus.on("callback_event", this.callback, this);
            }
            callback(event) {
                console.log(this.className + " / type: " + event.type + " / dispatcher: " + event.target.className);
            }
        }
        class TestClass2 {
            constructor() {
                this.className = "TestClass2";
            }
            dispatch() {
                EventBus.emit("callback_event", this);
            }
        }
        let t1 = new TestClass1();
        let t2 = new TestClass2();
        t2.dispatch();
    }
    // Passing additional parameters
    {
        class TestClass1 {
            constructor() {
                this.className = "TestClass1";
                EventBus.on("custom_event", this.doSomething, this);
            }
            doSomething(event, param1, param2) {
                console.log(this.className + ".doSomething");
                console.log("type=" + event.type);
                console.log("params=" + param1 + param2);
                console.log("coming from=" + event.target.className);
            }
        }
        class TestClass2 {
            constructor() {
                this.className = "TestClass2";
            }
            ready() {
                EventBus.emit("custom_event", this, "javascript events", " are really useful");
            }
        }
        let t1 = new TestClass1();
        let t2 = new TestClass2();
        t2.ready();
    }
    // Debugging
    console.log(EventBus.debug());
    // Removing a registered handler
    {
        var handler = function() {
            console.log('example callback');
        };
        EventBus.on('EXAMPLE_EVENT', handler);
        EventBus.emit('EXAMPLE_EVENT');
        EventBus.off('EXAMPLE_EVENT', handler);
        // Not emitted because event was removed
        EventBus.emit('EXAMPLE_EVENT');
    }
</script>
</body>
</html>
