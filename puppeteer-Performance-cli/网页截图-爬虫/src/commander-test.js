const program = require('commander')

program
  .version('0.0.1')
  .description('a test cli program')
  .option('-n, --name <name>', 'your name', 'zhl')
  .option('-a, --age <age>', 'your age', '22')
  .option('-e, --enjoy [enjoy]')
  .action(option => {
    console.log('name: ', option.name);
    console.log('age: ', option.age);
    console.log('enjoy: ', option.enjoy);
  })

program.parse(process.argv)