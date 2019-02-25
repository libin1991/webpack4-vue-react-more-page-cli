const Executor = require('./Executor');
const {launch, close, createPage, createClient} = require('../tasks/browserLife');

class Browser extends Executor {

    static creatNewBrowser (opt) {
        return new Browser(opt);
    }

    constructor(opt) {
        super();
        this.createCtx({
            browser: null,
            page: null,
            client: null,
            opt
        });
    }

    unshfitUse() {
        super.use('lanuch browser', launch.call(this));
        super.use('create page', createPage.call(this, this.ctx.opt));
        super.use('create client', createClient.call(this));
        this._taskLen = this._taskLen + 3;
    }

    /**
     * overwrite
     *
     * @memberof Browser
     */
    use(name, fn) {
        if (this.tasks.length === 0) {
            this.unshfitUse();
        }
        super.use(name, fn);
    }

    /**
     * overwrite
     *
     * @memberof Browser
     */
    run() {
        this.use('close browser', close.call(this));
        return super.run();
    }
}

module.exports = Browser;