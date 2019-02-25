const screenshot = function (path) {
    return async function (context, done) {
        const page = context.page;
        await page.screenshot({path});
        done();
    }
};

module.exports = screenshot;