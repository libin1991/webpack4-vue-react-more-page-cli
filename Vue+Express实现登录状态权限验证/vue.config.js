module.exports = {
/*     baseUrl: 'vue', */
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};