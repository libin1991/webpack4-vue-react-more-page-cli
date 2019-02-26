const Browser = require('./base/Browser');
const getPerformanceTiming = require('./tasks/getPerformanceTiming');
const getPerformanceMetrics = require('./tasks/getPerformanceMetrics');
const getRequestCount = require('./tasks/getRequestCount');
const {transData} = require('./lib/utils');


/**
 * 启动 puppeteer
 *
 * @param {object} opt
 * @returns {primise}
 */
async function runBrowser(opt) {
    const result = {};
    const browser = new Browser(opt);
    browser.on('pageCreated', async (page) => {
        result.countData = await getRequestCount(page);
    });
    browser.use('perf', getPerformanceTiming(timing => {
        result.timing = timing;
    }));
    browser.use('metrics', getPerformanceMetrics(metrics => {
        result.metrics = metrics;
    }));
    
    try {
        await browser.run();
        const {chartData, countData} = transData(result);
        return {
            chartData, 
            countData
        };
    } catch(e) {
        await browser.close();
        throw e;
    }
};


module.exports = runBrowser;