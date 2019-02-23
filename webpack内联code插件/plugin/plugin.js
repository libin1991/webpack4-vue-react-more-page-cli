const assert = require('assert');
const fs = require('fs');

function typeOf(value, type) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === type.toLowerCase();
}

function normalizeAssets(assets, normalized = {
	body: [],
	head: []
}) {
	if(typeOf(assets, 'string')) {
		normalized.body.push({
			path: assets,
			type: 'js'
		});
	} else if(typeOf(assets, 'object')) {
		normalized[assets.inject === 'head' ? 'head' : 'body'].push({
			path: assets.path,
			type: assets.type === 'css' ? 'css' : 'js'
		});
	} else if(typeOf(assets, 'array')) {
		assets.forEach((asset) => {
			normalized = normalizeAssets(asset, normalized);
		});
	}
	return normalized;
}

function extractSource(path) {
	return fs.readFileSync(path, {
		encoding: 'utf8'
	}).toString();
}

function processAsset(asset) {
	if(asset.type === 'css') {
		return `<style type="text/css">${extractSource(asset.path)}</style>`;
	}
	return `<script type="text/javascript">${extractSource(asset.path)}</script>`;
}

function defaultAssetFilter( /* htmlPluginData, asset */ ) {
	return true;
}

function WebpackInlineSourcePlugin(assets, filter) {
	assert(
		typeOf(assets, 'array') ||
		typeOf(assets, 'object') ||
		typeOf(assets, 'string'),
		'Should assign a String, Object or Array<String|Object> asset configuration'
	);
	this.assets = normalizeAssets(assets);
	this.assetFilter = filter || defaultAssetFilter;
}

WebpackInlineSourcePlugin.prototype.apply = function(compiler) {
	const self = this;
	compiler.plugin('compilation', (compilation) => {
		compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
			const assetFilter = self.assetFilter.bind(self, htmlPluginData);
			const bodyAssets = self.assets.body.filter(assetFilter).map(processAsset);
			const headAssets = self.assets.head.filter(assetFilter).map(processAsset);
			htmlPluginData.html = htmlPluginData.html.replace(/(<\/head>)/i, (match, head) => headAssets.join('\n') + head);
			htmlPluginData.html = htmlPluginData.html.replace(/(<\/body>)/i, (match, body) => bodyAssets.join('\n') + body);
			//callback(htmlPluginData);
		});

	});
	compiler.plugin('done', function() {
		console.log('Hello World!');
	});
};

module.exports = WebpackInlineSourcePlugin;