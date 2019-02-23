const {inlineSource} = require('inline-source');

class InlineSourceWebpackPlugin {
    constructor(options = {}) {
        this.deleteBundles = [];
        this.options = Object.assign({
            compress: false
        }, options);
    }

    /**
     * process html
     * @param compilation
     * @param data
     * @param cb
     * @private
     */
    _process(compilation, data, cb) {
        const options = Object.assign({}, this.options);
        options.handlers = (source, context) => {
            const bundle = source.props.bundle;
            if (bundle) {
                for (let name in compilation.assets) {
                    if (name.indexOf(bundle) > -1) {
                        source.content = compilation.assets[name].source();
                        if (source.props['bundle-delete']) {
                            // mark the bundle that need to delete
                            this.deleteBundles.push(name);
                        }
                        break;
                    }
                }
                if (!source.content) {
                    compilation.errors.push(new Error(`[${this.constructor.name}]:no asset match '${bundle}'.`));
                }
            }
            if (source.filepath) {
                // watch inline target
                if (compilation.fileDependencies.add) {
                    compilation.fileDependencies.add(source.filepath);
                } else {
                    // Before Webpack 4
                    // fileDepenencies was an array
                    compilation.fileDependencies.push(source.filepath);
                }
            }
            if (this.options.handlers) {
                return this.options.handlers(source, context);
            }
            return Promise.resolve();
        };
        inlineSource(data.html, options)
            .then(html => {
                data.html = html;
                cb(null, data);
            })
            .catch(error => {
                cb(null, data);
                compilation.errors.push(error);
            });
    }

    /**
     * delete target bundle
     * @param compilation
     * @private
     */
    _deleteBundle(compilation) {
        if (this.deleteBundles.length) {
            this.deleteBundles.forEach(bundle => delete compilation.assets[bundle]);
        }
        this.deleteBundles = [];
    }

    apply(compiler) {
        if ('hooks' in compiler) {
            const name = this.constructor.name;
            // webpack 4 or higher
            compiler.hooks.compilation.tap(name, compilation => {
                // if htmlWebpackPlugin is not exist, just do nothing
                if (compilation.hooks.htmlWebpackPluginAfterHtmlProcessing) {
                    compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
                        name,
                        (data, cb) => {
                            this._process(compilation, data, cb);
                        }
                    );
                }
            });
            compiler.hooks.emit.tapAsync(name, (compilation, callback) => {
                this._deleteBundle(compilation);
                callback && callback();
            });
        } else {
            // webpack 2 or 3
            compiler.plugin('compilation', compilation => {
                compilation.plugin('html-webpack-plugin-after-html-processing', (data, cb) => {
                    this._process(compilation, data, cb);
                });
            });
            compiler.plugin('emit', (compilation, callback) => {
                this._deleteBundle(compilation);
                callback && callback();
            });
        }
    }
}

module.exports = InlineSourceWebpackPlugin;
