const EventEmitter = require('events');
class Executor extends EventEmitter {
    constructor() {
        super();
        this.ctx = {};
        this.tasks = [];
    }

    use(name, fn) {
        this.tasks.push({name, fn});
    }

    createCtx(ctx = {}) {
        this.ctx = ctx;
    }

    compose(cb) {
        let current = 0;
        const {tasks, ctx} = this;
        const len = tasks.length;

        const done = (err) => {
            current++;
            if (current < len) {
                this.emit('task', tasks[current].name);
                tasks[current].fn(ctx, done);
            } else {
                cb();
            }
        };

        tasks[current].fn(ctx, done);
    }

    run() {
        return new Promise(resolve => {
            this.compose(()=>resolve(this.ctx));
        });
    }
}


module.exports = Executor;