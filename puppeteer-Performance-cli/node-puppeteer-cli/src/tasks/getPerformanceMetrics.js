

/**
 * 完整 PerformanceMetrics 内容如下：
 * [
    { name: 'Timestamp', value: 35037.202627 },
    { name: 'AudioHandlers', value: 0 },
    { name: 'Documents', value: 3 },
    { name: 'Frames', value: 2 },
    { name: 'JSEventListeners', value: 63 },
    { name: 'LayoutObjects', value: 435 },
    { name: 'MediaKeySessions', value: 0 },
    { name: 'MediaKeys', value: 0 },
    { name: 'Nodes', value: 506 },
    { name: 'Resources', value: 11 },
    { name: 'ScriptPromises', value: 0 },
    { name: 'PausableObjects', value: 39 },
    { name: 'V8PerContextDatas', value: 1 },
    { name: 'WorkerGlobalScopes', value: 1 },
    { name: 'UACSSResources', value: 0 },
    { name: 'LayoutCount', value: 2 },
    { name: 'RecalcStyleCount', value: 5 },
    { name: 'LayoutDuration', value: 0.0860430000029737 },
    { name: 'RecalcStyleDuration', value: 0.00374899999587797 },
    { name: 'ScriptDuration', value: 0.0770069999925909 },
    { name: 'TaskDuration', value: 0.297364000020025 },
    { name: 'JSHeapUsedSize', value: 6295344 },
    { name: 'JSHeapTotalSize', value: 10891264 },
    { name: 'FirstMeaningfulPaint', value: 35036.03356 },
    { name: 'DomContentLoaded', value: 35036.122972 },
    { name: 'NavigationStart', value: 35035.833805 },
    ]
 * 
 */


const getMetrics = function (cb) {
    return async function (context, done) {
        const {page, client} = context;
        let FirstMeaningfulPaint = 0;
        let metricsData = {};
        while (FirstMeaningfulPaint <= 0) {
            await page.waitFor(300);
            const performanceMetrics = await client.send('Performance.getMetrics');
            metricsData = extractDataFromPerformanceMetrics(
                performanceMetrics,
                'FirstMeaningfulPaint'
            )
            FirstMeaningfulPaint = metricsData.FirstMeaningfulPaint;
        }
        cb(metricsData);
        done();
    };
};

function extractDataFromPerformanceMetrics(metrics, ...keys) {
    const navigationStart = getTimeFromPerformanceMetrics(metrics, 'NavigationStart');
    return keys.reduce((prev, next) => {
        prev[next] = getTimeFromPerformanceMetrics(metrics, next) - navigationStart;
        return prev;
    }, {});
};

function getTimeFromPerformanceMetrics(metrics, name) {
    const val = metrics.metrics.find(x => x.name == name).value * 1000
    return Math.round(val);
};

module.exports = getMetrics;