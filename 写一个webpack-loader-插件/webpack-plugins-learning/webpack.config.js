var MyPlugin = require('./plugin');

module.exports = {
	entry: './index.js',
	output: {
		filename: 'out.js'
	},
	module: {
		loaders: [
			{
				test: /\.txt$/,
				loader: './loader',
			}
		]
	},
	plugins: [
		new MyPlugin()
	]
};