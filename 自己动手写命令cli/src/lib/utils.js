/**
 * pupeteer 跑出来的性能数据
 *
 * @param {object} data
 */
exports.transData = function(data) {
    const {
        timing: {
            domainLookupEnd,
            connectEnd,
            responseStart,
            responseEnd,
            domLoading,
            domInteractive,
            domContentLoadedEventStart,
            loadEventStart
        }, 
        metrics: {
            FirstMeaningfulPaint
        },
        countData
    } = data;

    return {
        chartData: {
            dnsFinish: domainLookupEnd,
            tcpFinish: connectEnd,
            ttfb: responseStart,
            downloadFinish: responseEnd,
            domParseStart: domLoading,
            domParseFinish: domInteractive,
            DOMContentLoaded: domContentLoadedEventStart,
            onload: loadEventStart,
            FirstMeaningfulPaint: FirstMeaningfulPaint 
        },
        countData
    };
};