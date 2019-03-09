const clui = require('clui');
const chalk = require('chalk');
const figlet = require('figlet');
const wunderbar = require('@gribnoysup/wunderbar');
const Line = clui.Line;

function wunderbarChart(data) {
    const input = Object.entries(data).map(([key, value]) => {
        return {
            value,
            label: key
        };
    });
    const {__raw} = wunderbar(input, {
        min: 0,
        length: 42,
    });
    return __raw;
};

exports.logo = function () {
    console.log();
    console.log(figlet.textSync('Odonata'));
    console.log();
}

exports.chart = function (data) {
    const input = wunderbarChart(data);
    const len = input.chartLength;
    new Line()
        .padding(5)
        .column('[performance]', 30, [chalk.magenta.bold])
        .fill()
        .output();
    input.normalizedValues.forEach(({lineLength, rawValue, label}) => {
        new Line()
            .padding(5)
            .column(label, 25, [chalk.cyan])
            .column(clui.Gauge(lineLength, len, len), len + 5)
            .column(` ${rawValue} ms`, 20, [chalk.yellow])
            .fill()
            .output();
    });
    console.log('\n');
};

exports.count = function (data) {
    new Line()
        .padding(5)
        .column('[request count]', 30, [chalk.magenta.bold])
        .fill()
        .output();
    Object.entries(data).forEach(([key, value]) => {
        new Line()
            .padding(5)
            .column(key, 5, [chalk.cyan])
            .column('' + value, 20, [chalk.yellow])
            .fill()
            .output();
    });
    console.log('\n');
};