### [移动端Web页面适配方案对比](https://github.com/libin1991/webpack4-vue-react-more-page-cli/tree/master/%E7%A7%BB%E5%8A%A8%E7%AB%AFWeb%E9%A1%B5%E9%9D%A2%E9%80%82%E9%85%8D%E6%96%B9%E6%A1%88%E5%AF%B9%E6%AF%94)
 ![https://juejin.im/post/5b1253055188257d6b5cf699](https://user-gold-cdn.xitu.io/2018/6/2/163bf944535afcc0?imageslim)
 #### [奇葩轮播banner图组件](https://juejin.im/post/5b1253055188257d6b5cf699)
 ### [Vue，React，微信小程序，快应用，TS 和 Koa 一把梭](https://github.com/libin1991/react-vue-koa)
 ### [轻量级滑块Swiper轮播图banner插件发布（仅3kb）](https://github.com/libin1991/webpack4-vue-react-more-page-cli/tree/master/%E8%BD%BB%E9%87%8F%E7%BA%A7%E6%BB%91%E5%9D%97Swiper%E8%BD%AE%E6%92%AD%E5%9B%BEbanner%E6%8F%92%E4%BB%B6%E5%8F%91%E5%B8%83%EF%BC%88%E4%BB%853kb%EF%BC%89)
 ![](https://raw.githubusercontent.com/libin1991/webpack4-vue-react-more-page-cli/master/%E8%BD%BB%E9%87%8F%E7%BA%A7%E6%BB%91%E5%9D%97Swiper%E6%8F%92%E4%BB%B6%E5%8F%91%E5%B8%83%EF%BC%88%E4%BB%853kb%EF%BC%89/1.jpg)
### 开箱即用的webpack4，vue，less多页面脚手架
### [Vue-cli@3.0 插件系统简析](https://juejin.im/post/5b8f586c5188255c9d55eedf)

```
export default {
	member: 'group',
	groupMessageList: [],
	setData(key, value) {
		this[key] = value
	}
}
```
## Vue 全局过滤器
```
//公用的过滤器
Vue.filter('fromNow', require('./filters/fromNow'));
Vue.filter('star', require('./filters/star'));

// star.js
function tpl(cls) {
  return `<i class="m-font m-font-star m-star-${cls}"></i>`;
}

function star(value) {
  if (!value) {
    return null;
  }
  let _v = value.replace(/\[星星]/g, tpl('full'));
  _v = _v.replace(/\[半星]/g, tpl('half'));
  _v = _v.replace(/\[空星]/g, tpl('null'));
  _v = _v.replace(/iconimg iconimg-xs/g, 'url-icon');
  return _v;
}
module.exports = star;
```
### 监听store
```
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

// 监听聊天列表的值， 发生变化就保存在localStorage中
store.watch(
  (state) => state.chatlist,
  (val) => {
    localStorage.setItem('vue-chat', JSON.stringify(val));
  },
  {
    deep: true
  }
)
```
### Vuex数据持久化
```
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	plugins: [
		createPersistedState({
			storage: {
				getItem: key => Cookies.get(key),
				setItem: (key, value) => Cookies.set(key, value, {
					expires: 0.25
				}),
				removeItem: key => Cookies.remove(key)
			}
		})
	]
})
```
---
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
##  Vue 全局组件  [require.context](https://juejin.im/post/5ab8bcdb6fb9a028b77acdbd)
```
const requireAll = context => context.keys().map(context);

const component = require.context('./components', false, /\.vue$/);   // false 不遍历子目录，true遍历子目录


requireAll(component).forEach(({default:item}) => {
	console.log(item)
	Vue.component(`wb-${item.name}`, item);
});
```
## 首字母大写
```
Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
})
```
## 利用require.context遍历目录所有图片
```
G:\Code\Vue\vue-global-component\src\assets>tree /f
卷 其它 的文件夹 PATH 列表
卷序列号为 1081-0973
G:.
│  logo.png
└─kittens
        kitten1.jpg
        kitten2.jpg
        kitten3.jpg
        kitten4.jpg
```
## [加载所有的图片](https://github.com/libin1991/webpack4-vue-more-page/blob/e1f91ec42047b9411e976398115a5639f022c362/vue-global-component/src/components/haha.vue)
```
<template>
	<div id="app">
		<img src="@/assets/logo.png">
		<li v-for="item in images">
			<h3>Image: {{ item }}</h3>
			<img :src="imgUrl(item)">
		</li>
	</div>
</template>

<script>
	var imagesContext = require.context('@/assets/kittens/', false, /\.jpg$/);
	console.log(imagesContext)
	console.log(imagesContext('./kitten1.jpg'))
	console.log(imagesContext.keys())
	export default {
		created: function() {
			this.images = imagesContext.keys();
		},
		name: 'haha',
		data() {
			return {
				images: [],
				msg: 'Welcome to Your Vue.js App'
			}
		},
		methods: {
			imgUrl: function(path) {
				//console.log('Path:' + path);
				return imagesContext(path)
			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
</style>
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
## webpack可视化
```
let path = require('path')
let glob = require('glob')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = {},
		basename, tmp, pathname, appname;

	glob.sync(globPath).forEach(function(entry) {
		
		tmp = entry.split('/').splice(-3);
		console.log(tmp)
		entries[tmp[1]] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/index.js',
			template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
			filename: tmp[1]+'.html'
		};
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.html');
console.log(pages)
//配置end

module.exports = {
	lintOnSave: false, //禁用eslint
	baseUrl:process.env.NODE_ENV === "production"?'//conchfairy.sinajs.cn/music/':'/',
	productionSourceMap: false,
	pages,
	devServer: {
		index: 'index.html',   //默认启动serve 打开index页面
		open: process.platform === 'darwin',
		host: '',
		port: 8088,
		https: false,
		hotOnly: false,
		 
		before: app => {}
	},
	chainWebpack: config => {
		 
	},
	configureWebpack: {
		plugins: [
			process.env.NODE_ENV === "production"?function(){}:new BundleAnalyzerPlugin()
		]
	}
}
```

### [memoize-one只计算一次，缓存](https://www.npmjs.com/package/memoize-one)
### [Memoize functions - 用于通过缓存具有相同输入的调用结果来加速连续函数调用的优化](https://www.npmjs.com/package/mem)

<details>
  <summary>给组件绑定的事件为什么无法触发？</summary>
  
  在 Vue 2.0 中，为**自定义**组件绑定**原生**事件必须使用 `.native` 修饰符：
  ```html
  <my-component @click.native="handleClick">Click Me</my-component>
  ```
  
  从易用性的角度出发，我们对 `Button` 组件进行了处理，使它可以监听 `click` 事件：
  ```html
  <el-button @click="handleButtonClick">Click Me</el-button>
  ```
  
  但是对于其他组件，还是需要添加 `.native` 修饰符。
</details>
