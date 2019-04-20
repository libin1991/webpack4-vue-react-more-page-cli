const path = require('path');
const chalk = require('chalk');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const render = require('consolidate').handlebars.render;
const async = require('async');
const ora = require('ora');
const fs = require('fs-extra');

const pluginDir = process.argv[2];
const description = process.argv[3] || '';
let pluginName = '';

try {
  pluginName = pluginDir.split('-')[1].split('.js')[0];
} catch (error) {
  console.log(
    chalk.red('请输入初始化的插件名字: npm run init 01-pluginName.js')
  );
  return false;
}

const spinner = ora('Creating template');
spinner.start();
const metalsmith = Metalsmith(path.join(__dirname, '../template'));
metalsmith
  .use(renderTemplateFiles())
  .clean(false)
  .source('.')
  .destination(path.join(__dirname, '../', pluginDir))
  .build((err, files) => {
    spinner.stop();
    addLink();
    console.log(chalk.green('初始成功: ' + pluginDir));
    console.log(chalk.green('进入目录: cd ' + pluginDir));
    console.log(chalk.green('安装依赖: npm install'));
    console.log(chalk.green('开发模式: npm run dev'));
    console.log(chalk.green('打包发布: npm run build'));
  });

const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

function renderTemplateFiles() {
  return (files, metalsmith, done) => {
    const keys = Object.keys(files);
    async.each(
      keys,
      (file, next) => {
        const str = files[file].contents.toString();
        if (!/{{([^{}]+)}}/g.test(str)) {
          return next();
        }
        render(
          str,
          {
            name: pluginName,
            className: capitalize(pluginName),
            description: description
          },
          (err, res) => {
            if (err) {
              err.message = `[${file}] ${err.message}`;
              return next(err);
            }
            files[file].contents = new Buffer(res);
            next();
          }
        );
      },
      done
    );
  };
}

function addLink() {
  if(pluginDir === '00-test.js') return;
  const mark = '<!-- new -->';
  const newPlugin = `* [${pluginDir}(${description}插件)](https://zhw2590582.github.io/100plugins/${pluginDir}/)\n${mark}`;
  const markup = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');
  if (!markup.includes(mark) || markup.includes(pluginDir)) return;
  fs.writeFileSync(path.join(__dirname, '../README.md'), markup.replace(mark, newPlugin));
}
