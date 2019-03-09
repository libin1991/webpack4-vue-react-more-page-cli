const ora = require('ora');
const output = require('../lib/output');
const runBrowser = require('../index');

async function cli(dir, cmd) {
    const spinner = ora('runing odonata').start();
    const opt = {
        url: cmd.args[0],
        ua: cmd.ua
    };
    let spendTime = 0
    setInterval(() => {
        spendTime = spendTime + 1; 
        spinner.text = 'running odonata in ' + spendTime + 's...';
    }, 1000);

    try {
        const startTime = Date.now(); 
        const {chartData, countData} = await runBrowser(opt);
        output.logo();
        output.chart(chartData);
        output.count(countData);
        spinner.succeed(`success after ${Date.now() - startTime}ms! \n`);
        process.exit();
    } catch(e) {
        spinner.fail(['Ops!, something error!']);
        throw e;
    }
};

module.exports = cli;