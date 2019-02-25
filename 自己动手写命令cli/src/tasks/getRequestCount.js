const url = require('url');

/**
 * 监听 page，计算请求
 *
 * @param {*} page
 * @returns {promise}
 */
function getRequestCount (page) {
    const res = {
        post: 0,
        get: 0,
        js: 0,
        css: 0
    };
    page.on('request', request => {
        const method = request.method();
        const pathname = url.parse(request.url()).pathname;
        if (method === 'GET') {
            res.get++;
        }
        else if (method === 'POST'){
            res.post++;
        }

        if (pathname.endsWith('.js')) {
            res.js++;
        }
        else if(pathname.endsWith('.css')) {
            res.css++;
        }
    });
    
    return new Promise(resolve => {
        page.on('load', () => {
            resolve(res);
        });
    })
};

module.exports = getRequestCount;

