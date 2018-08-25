# webpack4-vue-more-page
开箱即用的webpack4，vue，less多页面脚手架


## 前言

vue-cli是Vue.js官方推出的脚手架，它功能丰富、扩展性强，为Vue应用开发带来了极大的便捷，它提供了多种开发范式，诠释了开箱即用。vue-cli@3版本经历了alpha、beta、rc版本近7个月的迭代开发，在最近几天正式版终于发布，本文主要讲解如何使用vue-cli创建一个多入口工程，若要近一步了解vue-cli，请访问[官方文档](https://cli.vuejs.org/guide/)。

## 什么是多页应用

单页应用（SPA）往往只含有包含一个主入口文件与index.html，页面间切换通过局部刷新资源来完成。而在多页应用中，我们会为每个HTML文档文件都指定好一个JS入口，这样一来当页面跳转时用户会获得一个新的HTML文档，整个页面会重新加载。

单页应用、多页应用的优劣势在此就不进行分析了，总而言之，多页架构模式暂时是无法取代的，如果尝试把几十个不关联的页面做成一个，那么开发成本会非常大的，**Not every app has to be an SPA**。

## 初始化项目

首先我们安装好vue-cli脚手架，并初始化一个默认工程.
修改项目目录：
```
.
├── assets
│   └── logo.png
├── components
│   ├── About.vue
│   ├── HelloWorld.vue
│   └── Home.vue
├── pages
│   ├── page1
│   │   ├── page1.html
│   │   ├── page1.js
│   │   └── page1.vue
│   └── page2
│       ├── page2.html
│       ├── page2.js
│       └── page2.vue
└── style
    ├── common.css
    └── common.less

```
vue.config.js是一个可选文件，用户需要自行创建，它会被`@vue/cli-service`读取。当正确添加配置后，重启一下项目，测试一下项目在改变目录结构后能否正常运行。试想一下，若照着这个思路进行配置多入口，那么首先需要删除或修改掉原有webpack配置项，然后还需添加多入口的一些插件，虽然通过脚手架对外提供的API可以实现，可是这种修改方式还不是直接修改原生构建配置更快，那么还有其他解决方法吗？

### vue.config.js 配置
```
let path = require('path')
let glob = require('glob')
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = {},
		basename, tmp, pathname, appname;

	glob.sync(globPath).forEach(function(entry) {
		basename = path.basename(entry, path.extname(entry));
		// console.log(entry)
		tmp = entry.split('/').splice(-3);
		console.log(tmp)
		pathname = basename; // 正确输出js和html的路径

		// console.log(pathname)
		entries[pathname] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js',
			template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
			title:  tmp[2],
			filename: tmp[2]
		};
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.html');
console.log(pages)
//配置end

module.exports = {
	baseUrl: '/',
	productionSourceMap: false,
	pages,
	devServer: {
		index: 'page1.html', //默认启动serve 打开page1页面
		open: process.platform === 'darwin',
		host: '',
		port: 8088,
		https: false,
		hotOnly: false,
		proxy: {
			'/xrf/': {
				target: 'http://reg.tool.hexun.com/',
				changeOrigin: true,
				pathRewrite: {
					'^/xrf': ''
				}
			},
			'/wa/': {
				target: 'http://api.match.hexun.com/',
				changeOrigin: true,
				pathRewrite: {
					'^/wa': ''
				}
			}
		}, // 设置代理
		before: app => {}
	},
	chainWebpack: config => {
		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => {
				// 修改它的选项...
				options.limit = 100
				return options
			})
		Object.keys(pages).forEach(entryName => {
			config.plugins.delete(`prefetch-${entryName}`);
		});
		if(process.env.NODE_ENV === "production") {
			config.plugin("extract-css").tap(() => [{
				path: path.join(__dirname, "./dist"),
				filename: "css/[name].[contenthash:8].css"
			}]);
		}
	},
	configureWebpack: config => {
		if(process.env.NODE_ENV === "production") {
			config.output = {
				path: path.join(__dirname, "./dist"),
				filename: "js/[name].[contenthash:8].js"			
			};
		}
	}
}
```

## dist打包目录
```
├── css
│   ├── page1.9951d5a1.css
│   └── page2.009d0d6f.css
├── img
│   └── logo.82b9c7a5.png
├── js
│   ├── chunk-vendors.f061f10e.js
│   ├── page1.5a5322e0.js
│   └── page2.db57562b.js
├── page1.html
└── page2.html


```

## 开发环境配置webpack可视化
```
 var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

configureWebpack: {
		plugins: [
			process.env.NODE_ENV === "production"?function(){}:new BundleAnalyzerPlugin()
		]
	},
```
##  Vue 全局组件
```
const requireAll = context => context.keys().map(context);

const component = require.context('./components', false, /\.vue$/);   // false 不遍历子目录，true遍历子目录


requireAll(component).forEach(({default:item}) => {
	console.log(item)
	Vue.component(`wb-${item.name}`, item);
});
```

## 源码部分

@vue/cli-service通过判断是否传入pages参数来生成对应Webpack配置文件，让我们先来看看没有传入时的处理函数：

```
   if (!multiPageConfig) {
      // default, single page setup.
      htmlOptions.template = fs.existsSync(htmlPath)
        ? htmlPath
        : defaultHtmlPath

      webpackConfig
        .plugin('html')
          .use(HTMLPlugin, [htmlOptions])

      if (!isLegacyBundle) {
        // inject preload/prefetch to HTML
        ...
      }
    }
```

由源码可知，pages参数可用于生成三个插件：preload-plugin、prefetch-plugin、html-plugin，若不传html文件则会使用一个只空的默认html文件，而在多入口模式下，代码的逻辑也很简单，在此就不贴源码了，它会执行以下步骤：

1. 清除原有entry
2. 对pages字段的每个key做循环，解析每个入口对象的参数entry(必填)、title、template、filename、chunks
3. 通过entry字段生成webpack的entry入口
4. 通过其余参数生成对应的html-webpack-plugin，若不为传统模式，也会生成对应入口的preload插件与prefetch插件

## 局部优化

#### 移除prefetch

由于本人并不喜欢为将来做打算，因此并不希望预加载一些可能会用到的asyncChunk，因为会浪费掉一些带宽，而且在多页面中并不见得预加载其他入口的文件是一件好事情，于是我们通过chainWebpack进行删除：

```
modules.exports = {
	// ...
  chainWebpack: config => {
    Object.keys(pages).forEach(entryName => {
      config.plugins.delete(`prefetch-${entryName}`);
    });
  }
}
```

#### 关闭SourceMap

关闭之后不仅能加快生产环境的打包速度，也能避免源码暴露在浏览器端：

```
modules.exports = {
	// ...
    productionSourceMap: false,
}
```

#### 打包分类(强迫症患者福音)
首先回顾一下dist中的部分文件夹：

## dist打包目录
```
├── css
│   ├── page1.9951d5a1.css
│   └── page2.009d0d6f.css
├── img
│   └── logo.82b9c7a5.png
├── js
│   ├── chunk-vendors.f061f10e.js
│   ├── page1.5a5322e0.js
│   └── page2.db57562b.js
├── page1.html
└── page2.html


```



