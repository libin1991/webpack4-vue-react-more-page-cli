
/**
 * 完整 PerformanceTiming 内容如下：
 * {
    navigationStart: 1513433544980,
    unloadEventStart: 0,
    unloadEventEnd: 0,
    redirectStart: 1513433544980,
    redirectEnd: 1513433545292,
    fetchStart: 1513433545292,
    domainLookupStart: 1513433545292,
    domainLookupEnd: 1513433545292,
    connectStart: 1513433545292,
    connectEnd: 1513433545292,
    secureConnectionStart: 0,
    requestStart: 1513433545019,
    responseStart: 1513433545289,
    responseEnd: 1513433545292,
    domLoading: 1513433545296,
    domInteractive: 1513433545339,
    domContentLoadedEventStart: 1513433545540,
    domContentLoadedEventEnd: 1513433545540,
    domComplete: 1513433545602,
    loadEventStart: 1513433545602,
    loadEventEnd: 1513433545602,
   }
 */


const getPerformanceTiming = function (cb) {
    return async function (context, done) {
        const page = context.page;
        const performanceTiming = JSON.parse(
            await page.evaluate(() => JSON.stringify(window.performance.timing))
        );
        const data = extractDataFromPerformanceTiming(
            performanceTiming,
            'domainLookupStart', // dns开始
            'domainLookupEnd', // dns结束
            'connectStart', // tcp开始
            'connectEnd', // tcp结束
            'responseStart', // ttfb，time to first byte，首字节抵达
            'responseEnd',  // 最后一个字节抵达
            'domLoading', // dom 开始解析，即Document.readyState属性变为“loading”、相应的readystatechange事件触发
            'domInteractive',  // 文档完成解析，但是诸如图像，样式表和框架之类的子资源仍在加载。即Document.readyState属性变为“interactive”、相应的readystatechange事件触发
            'domContentLoadedEventStart', // DOMContentLoaded 事件触发，即所有需要被执行的脚本已经被解析
            'domContentLoadedEventEnd', // 所有需要立即执行的脚本已经被执行
            'domComplete', // 文档和所有子资源已完成加载，即Document.readyState变为 'complete'且相对应的readystatechange 被触发，load 事件即将被触发
            'loadEventStart', // 文档触发load事件的时间。如果load事件没有触发，那么该接口就返回0
            'loadEventEnd' // 文档触发load事件结束后的时间。如果load事件没有触发，那么该接口就返回0
        );

        cb(data);
        done();
    };
};

function extractDataFromPerformanceTiming(timing, ...keys) {
    const navigationStart = timing.navigationStart;
    return keys.reduce((prev, next) => {
        prev[next] = timing[next] - navigationStart;
        return prev;
    }, {});
};

module.exports = getPerformanceTiming;