const assert = require('assert'); //断言库
const fs = require('fs');

function typeOf(value, type) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === type.toLowerCase();
}

function normalizeAssets(assets, normalized = {
	js: [], 
	css: []
}) {
	if(typeOf(assets, 'array')) {
		assets.forEach((item, index) => {
			if(!index) {
				normalized.js.push(...item.path)
			} else {
				normalized.css.push(...item.path)
			}
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

function WebpackInlineSourcePlugin(assets, filter) {
	this.assets = normalizeAssets(assets);

}

WebpackInlineSourcePlugin.prototype.apply = function(compiler) {
	const self = this;
	compiler.plugin('compilation', (compilation) => {
		compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData) => {

			const bodyAssets = self.assets.js.map((item)=>{
				return {
					path:item,
					type:'js'
				}
			}).map(processAsset);
			 
			const headAssets = self.assets.css.map((item)=>{
				return {
					path:item,
					type:'css'
				}
			}).map(processAsset);
          
			htmlPluginData.html = htmlPluginData.html.replace(/(<\/head>)/i, (match, head) => headAssets.join('\n') + head);
			htmlPluginData.html = htmlPluginData.html.replace(/(<\/body>)/i, (match, body) => bodyAssets.join('\n') + body);
		});

	});
	compiler.plugin('done', function() {
		console.log('Hello World!');
	});
};

module.exports = WebpackInlineSourcePlugin;