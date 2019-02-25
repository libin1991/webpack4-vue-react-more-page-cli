// 那么就需要把@import "/static/css/vendor.wxss"; 改为：@import "/subPages/enjoy_given/static/css/vendor.wxss";

class CssPathTransfor {
  apply (compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      console.log('--CssPathTransfor emit')
      // 遍历所有资源文件
      for (var filePathName in compilation.assets) {
        // 查看对应的文件是否符合指定目录下的文件
        if (/static\/css\/pages/i.test(filePathName)) {
          // 引入路径正则
          const reg = /\/static\/css\/vendor\.wxss/i
          // 需要替换的最终字符串
          const finalStr = '/subPages/enjoy_given/static/css/vendor.wxss'
          // 获取文件内容
          let content = compilation.assets[filePathName].source() || ''
          
          content = content.replace(reg, finalStr)
          // 重写指定输出模块内容
          compilation.assets[filePathName] = {
            source () {
              return content;
            },
            size () {
              return content.length;
            }
          }
        }
      }
      callback()
    })
  }
}
module.exports = CssPathTransfor

