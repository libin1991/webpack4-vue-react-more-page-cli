const babel = require('babel-core');
const types = require('babel-types');

let code = `import { Button, Alert } from 'element-ui'`;

const importPlugin = {
  visitor: {
    ImportDeclaration(path) {
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

        // 替换树结构
        path.replaceWithMultiple(specifiers);
      }
    }
  }
};

let result = babel.transform(code, {
  plugins: [importPlugin]
});

console.log(result.code);

/*
 
node index.js
import Button from 'element-ui/lib/button';
import Alert from 'element-ui/lib/alert';

*/