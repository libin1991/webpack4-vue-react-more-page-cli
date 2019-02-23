const gzipSize = require('gzip-size');
const filesize = require('filesize');
const herb = require('herb');   //表格输出

module.exports = class TablePlugin {
  constructor(
    options = {
      errorSize: 1024 * 1024 * 500
    }
  ) {
    this.options = options;
  }

  apply(compiler) {
    const errorSize = this.options.errorSize;
    const beforeMsg = this.options.beforeMsg;
    const afterMsg = this.options.afterMsg;
    compiler.hooks.done.tapPromise('table-plugin', async (stats) => {
      if (stats.hasErrors()) return;
      const assets = stats.compilation.assets;

      const gzipedSizes = await Promise.all(
        Object.keys(assets).map(async (name) => {
        	console.log('--------------------------')
          console.log(name)
          const size = await gzipSize(assets[name].source());
          return size;
        })
      );
      const headers = ['asset', 'size', 'gziped'];
      const rows = Object.keys(assets).map((name, i) => {
        let row = [name, filesize(assets[name].size()), filesize(gzipedSizes[i])];
        if (assets[name].size() >= errorSize) {
          row = row.map(herb.red);
        }
        return row;
      });
      if (beforeMsg) {
        console.log(beforeMsg, '\n');
      }
      herb.table({
        headers,
        rows,
        borders: false
      });
      if (afterMsg) {
        console.log('\n', afterMsg);
      }
      return Promise.resolve();
    });
  }
};
