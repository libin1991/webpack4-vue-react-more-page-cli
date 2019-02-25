class MyFisrtWbapckPlugin {
   
   apply(compiler){
      compiler.hooks.done.tapAsync("MyFisrtWbapckPlugin", (stats, cb) => {
	     const res = [];
		 for(let assetName in stats.compilation.assets) {
		     res.push(assetName);
		 }
		 console.log(res.join("\n"));
		 // 处理完毕后执行 callback 以通知 Webpack 
         // 如果不执行 callback，运行流程将会一直卡在这不往下执行
		 cb();
	  })
   }
}

module.exports = MyFisrtWbapckPlugin;