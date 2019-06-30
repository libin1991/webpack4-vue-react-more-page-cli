
// 村风目录： ~node_modules/babel-plugin-my-import.js

const babel = require('babel-core');
const types = require('babel-types');

const importPlugin = {
  visitor: {
    ImportDeclaration(path) {
    	
    	console.log(path)
    	
      let node = path.node;
      let source = node.source.value;
      let specifiers = node.specifiers;

      // 判断是否是默认导出，其中一个不是默认导出，则都不是默认导出
      if (!types.isImportDefaultSpecifier(specifiers[0])) {
        // 如果不是默认导出，则需要转换
        specifiers = specifiers.map(specifier => {
          // 数组内容：当前默认导出的标识、从哪里导入
          return types.importDeclaration(
            [types.importDefaultSpecifier(specifier.local)],
            types.stringLiteral(
              `${source}/lib/${specifier.local.name.toLowerCase()}`
            )
          );
        });

        // 替换树解构
        path.replaceWithMultiple(specifiers);
      }
    }
  }
};

module.exports = importPlugin;