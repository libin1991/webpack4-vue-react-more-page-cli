const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const Safari = {
    viewport: {
        width: 1400,
        height: 1000
    },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36'
};

function launch(option = {}) {
    return async (context, done) => {
        context.browser = await puppeteer.launch(option);
        done();
    };
};

function close() {
    return async (context, done) => {
        await context.browser.close();
        done();
    };
}

function createPage({url, ua = 'mobile'}) {
    return async (context, done) => {
        const page = await context.browser.newPage();
        await page.emulate(ua === 'mobile' ? iPhone : Safari);
        context.page = page;
        this.emit('pageCreated', page);
        await page.goto(url, {waitUntil: 'load'});
        done();
    };
};

function createClient() {
    return async (context, done) => {
        const {page} = context;
        const client = await page.target().createCDPSession();
        context.client = client;
        await client.send('Performance.enable');
        done();
    };
};

module.exports = {
    launch,
    close,
    createPage,
    createClient
}