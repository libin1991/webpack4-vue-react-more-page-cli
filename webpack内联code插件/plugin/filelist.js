class FileListPlugin{
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.emit.tap('FileListPlugin',function (compilation) {
            let fileList = 'filelist:\n\n';
            for (let filename in compilation.assets) {
                fileList += ('- '+filename+'\n');
            }
            compilation.assets['filelist.md']={
                source() {
                    return fileList;
                },
                size() {
                    return fileList.length
                }
            }
        });
    }
}
module.exports = FileListPlugin;

 