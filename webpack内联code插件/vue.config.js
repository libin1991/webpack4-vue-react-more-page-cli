const webpack = require('webpack')
const path = require('path');
const WebpackInlineSourcePlugin = require('./plugin/plugin2');
const WebpackfilelistPlugin = require('./plugin/filelist.js');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // 基本路径
    baseUrl: './',
    devServer: {
        port: 8888,
        open: true
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery'
            }),
            new WebpackInlineSourcePlugin([{
            	path:['./src/lib/jquery-3.2.1.min.js','./src/lib/vue.min.js']
            },{
            	path:['./src/lib/reset.min.css','./src/lib/A.css']
            }]),
            new WebpackfilelistPlugin()
        ]
    },
    productionSourceMap: false,
    lintOnSave: false,
    chainWebpack: config => {
        config.entry.app = ["babel-polyfill", resolve('src/main.js')]
        //config.resolve.alias.set('@', resolve('src'))
    }
}
