const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const baseConfig = {
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    stats: {
        children: false
    },
    module: {
        rules: [{
            test: /\.js/,
            use: 'happypack/loader?id=babel',
            include: path.resolve('./src'),
            exclude: /node_modules/,
        }, ],
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            threads: 4,
            loaders: ['babel-loader'],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            minify: true,
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'other.html',
            template: './src/other.html',
            minify: true,
            inject: 'body'
        }),
        new CopyWebpackPlugin([{
            from: './src/assets/',
            to: './assets/',
        }, ]),
    ],
}

module.exports = (env, argv) => {
    let {
        module: {
            rules
        },
        plugins
    } = baseConfig
    let config = null
    // dev config
    if (argv.mode === 'development') {
        config = {
            devtool: 'cheap-module-eval-source-map',

            devServer: {
                contentBase: path.resolve(__dirname, './dist'),
                host: '127.0.0.1',
                port: 8080,
                open: true,
                clientLogLevel: 'none'
            },

            module: {
                rules: [
                    ...rules,
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                    },
                ],
            },

            plugins: [...plugins],
        }
    } else if (argv.mode === 'production') {
        // production config
        config = {
            devtool: '#source-map',

            module: {
                rules: [{
                    test: /\.css$/,
                    use: [{
                            loader: MiniCssExtractPlugin.loader,
                        },
                        'css-loader',
                    ],
                }],
            },

            plugins: [
                new CleanWebpackPlugin(['dist'], {
                    root: __dirname,
                }),
                ...plugins,
                new MiniCssExtractPlugin({
                    filename: '/css/[name].css',
                    chunkFilename: '/css/[id].css',
                }),
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify('production'),
                    },
                }),
            ],
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    minSize: 30000,
                    minChunks: 1,
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3,
                    automaticNameDelimiter: '.',
                    name: true,
                    cacheGroups: {
                        jquery: {
                            test: module => /jquery/.test(module.context),
                            priority: 0,
                        },
                        vendors: {
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                        },
                        default: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true,
                        },
                    },
                },
                minimizer: [
                    new UglifyJsPlugin({
                        cache: true,
                        parallel: true,
                        sourceMap: true, // set to true if you want JS source maps
                    }),
                    new OptimizeCSSAssetsPlugin({}),
                ],
            },
        }
    }

    config = Object.assign({}, baseConfig, config)

    return config
}