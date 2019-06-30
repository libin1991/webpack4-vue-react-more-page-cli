### webpack构建流程

#### 1. webpack入口`（webpack.config.js+shell options）`

从配置文件package.json 和 Shell 语句中读取与合并参数，得出最终的参数；
> 每次在命令行输入 webpack 后，操作系统都会去调用 `./node_modules/.bin/webpack` 这个 shell 脚本。
这个脚本会去调用 `./node_modules/webpack/bin/webpack.js` 并追加输入的参数，如 -p , -w 。

#### 2. 用yargs参数解析`（optimist）`
```
 yargs.parse(process.argv.slice(2), (err, argv, output) => {})
```    

[地址](https://github.com/webpack/webpack-cli/blob/master/bin/cli.js#L210)

#### 3.webpack初始化

（1）构建compiler对象
```
let compiler = new Webpack(options)
```   

[地址](https://github.com/webpack/webpack-cli/blob/master/bin/cli.js#L417)

（2）注册NOdeEnvironmentPlugin插件
```
    new NodeEnvironmentPlugin().apply(compiler);
```
[地址](https://github.com/webpack/webpack/blob/master/lib/webpack.js#L41)

（3）挂在options中的基础插件，调用`WebpackOptionsApply`库初始化基础插件。
```
    if (options.plugins && Array.isArray(options.plugins)) {
    	for (const plugin of options.plugins) {
    		if (typeof plugin === "function") {
    			plugin.apply(compiler);
    		} else {
    			plugin.apply(compiler);
    		}
    	}
    }
    compiler.hooks.environment.call();
    compiler.hooks.afterEnvironment.call();
    compiler.options = new WebpackOptionsApply().process(options, compiler);
```
[地址](https://github.com/webpack/webpack/blob/master/lib/webpack.js#L53)

#### 4. `run` 开始编译
```
    if (firstOptions.watch || options.watch) {
    	const watchOptions = firstOptions.watchOptions || firstOptions.watch || options.watch || {};
    	if (watchOptions.stdin) {
    		process.stdin.on("end", function(_) {
    			process.exit(); // eslint-disable-line
    		});
    		process.stdin.resume();
    	}
    	compiler.watch(watchOptions, compilerCallback);
    	if (outputOptions.infoVerbosity !== "none") console.log("\nwebpack is watching the files…\n");
    } else compiler.run(compilerCallback);
    
```
这里分为两种情况：

- Watching：监听文件变化
- run：执行编译

[地址](https://github.com/webpack/webpack-cli/blob/master/bin/cli.js#L495)

#### 5.触发`compile`

（1）在run的过程中，已经触发了一些钩子：`beforeRun->run->beforeCompile->compile->make->seal` (编写插件的时候，就可以将自定义的方挂在对应钩子上，按照编译的顺序被执行)

（2）构建了关键的 `Compilation`对象

在run()方法中，执行了this.compile（）

this.compile()中创建了compilation
```
    this.hooks.beforeRun.callAsync(this, err => {
        ...
    	this.hooks.run.callAsync(this, err => {
            ...
    		this.readRecords(err => {
                ...
    			this.compile(onCompiled);
    		});
    	});
    });
    
    ...
    
    compile(callback) {
    	const params = this.newCompilationParams();
    	this.hooks.beforeCompile.callAsync(params, err => {
    		...
    		this.hooks.compile.call(params);
    		const compilation = this.newCompilation(params);
    		this.hooks.make.callAsync(compilation, err => {
                ...
    			compilation.finish();
    			compilation.seal(err => {
                    ...
    				this.hooks.afterCompile.callAsync(compilation, err 
    				    ...
    					return callback(null, compilation);
    				});
    			});
    		});
    	});
    }
```    

[地址](https://github.com/webpack/webpack/blob/master/lib/Compiler.js#L265)
```
    const compilation = this.newCompilation(params);
```
`Compilation`负责整个编译过程，包含了每个构建环节所对应的方法。对象内部保留了对compiler的引用。

当 Webpack 以开发模式运行时，**每当检测到文件变化，一次新的 Compilation 将被创建**。

划重点：**Compilation很重要！编译生产资源变换文件都靠它**。

#### 6.addEntry() `make 分析入口文件创建模块对象`

compile中触发`make`事件并调用`addEntry`

webpack的make钩子中, tapAsync注册了一个`DllEntryPlugin`, 就是将入口模块通过调用compilation。

这一注册在Compiler.compile()方法中被执行。

addEntry方法将所有的入口模块添加到编译构建队列中，开启编译流程。

> DllEntryPlugin.js
```
    compiler.hooks.make.tapAsync("DllEntryPlugin", (compilation, callback) => {
    	compilation.addEntry(
    		this.context,
    		new DllEntryDependency(
    			this.entries.map((e, idx) => {
    				const dep = new SingleEntryDependency(e);
    				dep.loc = {
    					name: this.name,
    					index: idx
    				};
    				return dep;
    			}),
    			this.name
    		),
    		this.name,
    		callback
    	);
    });
```    

[地址](https://github.com/webpack/webpack/blob/master/lib/DllEntryPlugin.js#L33)

流程走到这里让我觉得很奇怪：刚刚还在Compiler.js中执行compile，怎么一下子就到了DllEntryPlugin.js?

这就要说道之前`WebpackOptionsApply.process()初始化插件的时候`，执行了`compiler.hooks.entryOption.call(options.context, options.entry)`;

> WebpackOptionsApply.js
```
    class WebpackOptionsApply extends OptionsApply {
    	process(options, compiler) {
    	    ...
    	    compiler.hooks.entryOption.call(options.context, options.entry);
    	}
    }
```
[process](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L79)

[entryOption](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js)

DllPlugin.js
```
    compiler.hooks.entryOption.tap("DllPlugin", (context, entry) => {
    	const itemToPlugin = (item, name) => {
    		if (Array.isArray(item)) {
    			return new DllEntryPlugin(context, item, name);
    		}
    		throw new Error("DllPlugin: supply an Array as entry");
    	};
    	if (typeof entry === "object" && !Array.isArray(entry)) {
    		Object.keys(entry).forEach(name => {
    			itemToPlugin(entry[name], name).apply(compiler);
    		});
    	} else {
    		itemToPlugin(entry, "main").apply(compiler);
    	}
    	returntrue;
    });
```    

[DllPlugin](https://github.com/webpack/webpack/blob/master/lib/DllPlugin.js#L26)

其实addEntry方法，存在很多入口，SingleEntryPlugin也注册了compiler.hooks.make.tapAsync钩子。这里主要再强调一下`WebpackOptionsApply.process()`流程（233）。

入口有很多，有兴趣可以调试一下先后顺序~

#### 7. 构建模块

`compilation.addEntry`中执行 `_addModuleChain()`这个方法主要做了两件事情:
- 一是根据模块的类型获取对应的模块工厂并创建模块，
- 二是构建模块。

通过 ModuleFactory.create方法创建模块，（有NormalModule , MultiModule , ContextModule , DelegatedModule 等）对模块使用的loader进行加载。**调用 acorn 解析经 loader 处理后的源文件生成抽象语法树 AST。遍历 AST，构建该模块所依赖的模块**
```
    addEntry(context, entry, name, callback) {
    	const slot = {
    		name: name,
    		request: entry.request,
    		module: null
    	};
    	this._preparedEntrypoints.push(slot);
    	this._addModuleChain(
    		context,
    		entry,
    		module => {
    			this.entries.push(module);
    		},
    		(err, module) => {
    			if (err) {
    				return callback(err);
    			}
    
    			if (module) {
    				slot.module = module;
    			} else {
    				const idx = this._preparedEntrypoints.indexOf(slot);
    				this._preparedEntrypoints.splice(idx, 1);
    			}
    			return callback(null, module);
    		}
    	);
    }
 ```
[addEntry addModuleChain()源码地址](https://github.com/webpack/webpack/blob/master/lib/Compilation.js#L1072)

#### 8. 封装构建结果（seal）

webpack 会监听 seal事件调用各插件对构建后的结果进行封装，要逐次对每个 module 和 chunk 进行整理，生成编译后的源码，合并，拆分，生成 hash 。 同时这是我们在开发时进行代码优化和功能添加的关键环节。
```
    template.getRenderMainfest.render()
```    

通过模板（MainTemplate、ChunkTemplate）把chunk生产_webpack_requie()的格式。

#### 9. 输出资源（emit）

把Assets输出到output的path中。

### 总结

webpack是一个插件合集，由 tapable 控制各插件在 webpack 事件流上运行。主要依赖的是compilation的编译模块和封装。

webpack 的入口文件其实就实例了Compiler并调用了run方法开启了编译，webpack的主要编译都按照下面的钩子调用顺序执行。

- Compiler:beforeRun 清除缓存
- Compiler:run 注册缓存数据钩子
- Compiler:beforeCompile
- Compiler:compile 开始编译
- Compiler:make 从入口分析依赖以及间接依赖模块，创建模块对象
- Compilation:buildModule 模块构建
- Compiler:normalModuleFactory 构建
- Compilation:seal 构建结果封装， 不可再更改
- Compiler:afterCompile 完成构建，缓存数据
- Compiler:emit 输出到dist目录

一个 Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。

Compilation 对象也提供了很多事件回调供插件做扩展。

Compilation中比较重要的部分是assets
如果我们要借助webpack帮你生成文件,就要在assets上添加对应的文件信息。

compilation.getStats()能得到生产文件以及chunkhash的一些信息等

