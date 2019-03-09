### Demo-Test

```
const puppeteer = require('puppeteer');　

const url = require('url');

　
//(async() => {　　
//	const browser = await puppeteer.launch({ headless: true });　　
//	const page = await browser.newPage();　　
//	await page.setViewport({ width: 2000, height: 800, });   //修改浏览器视窗大小
//	await page.goto('https://www.baidu.com/');
//	
//	
//	await page.focus("#kw");
//  await page.keyboard.sendCharacter('123');
//  await page.waitFor(".s_search");
//  await page.click(".s_search");
//	
//	console.log('123');
//	
//	
//	page.on("load", async () => {
//		const performanceTiming = JSON.parse(　　
//			await page.evaluate(() => JSON.stringify(window.peformance.timing))　　
//		);　　
//		console.log(performanceTiming);
//		 
//	});
//	
//	page.on('pageCreated', async (page) => {
//		
//		console.log('pageCreated')
//		
//       const performanceTiming = JSON.parse(　　
//			await page.evaluate(() => JSON.stringify(window.peformance.timing))　　
//		);　　
//		console.log(performanceTiming);
//  });
//  page.on('perf',async (page) =>   {
//  	
//  	console.log('perf')
//  	
//      const performanceTiming = JSON.parse(　　
//			await page.evaluate(() => JSON.stringify(window.peformance.timing))　　
//		);　　
//		console.log(performanceTiming);
//  });
//  page.on('metrics',async (page) =>   {
//  	
//  	console.log('metrics')
//  	
//      const performanceTiming = JSON.parse(　　
//			await page.evaluate(() => JSON.stringify(window.peformance.timing))　　
//		);　　
//		console.log(performanceTiming);
//  });　　　　
//})();

const extractDataFromPerformanceTiming = (timing, ...dataNames) => {　　
	const navigationStart = timing.navigationStart;　　
	const extractedData = {};　　
	dataNames.forEach(name => {　　
		extractedData[name] = timing[name] - navigationStart;　　
	});　　
	return extractedData;　　
};　　

async function testPage(page) {　　
	await page.goto("https://www.cnblogs.com");　
	const performanceTiming = JSON.parse(await page.evaluate(() => JSON.stringify(window.performance.timing)));　　
	return extractDataFromPerformanceTiming(
		performanceTiming,
		'domainLookupStart', // dns开始
		'domainLookupEnd', // dns结束
		'connectStart', // tcp开始
		'connectEnd', // tcp结束
		'responseStart', // ttfb，time to first byte，首字节抵达
		'responseEnd', // 最后一个字节抵达
		'domLoading', // dom 开始解析，即Document.readyState属性变为“loading”、相应的readystatechange事件触发
		'domInteractive', // 文档完成解析，但是诸如图像，样式表和框架之类的子资源仍在加载。即Document.readyState属性变为“interactive”、相应的readystatechange事件触发
		'domContentLoadedEventStart', // DOMContentLoaded 事件触发，即所有需要被执行的脚本已经被解析
		'domContentLoadedEventEnd', // 所有需要立即执行的脚本已经被执行
		'domComplete', // 文档和所有子资源已完成加载，即Document.readyState变为 'complete'且相对应的readystatechange 被触发，load 事件即将被触发
		'loadEventStart', // 文档触发load事件的时间。如果load事件没有触发，那么该接口就返回0
		'loadEventEnd' // 文档触发load事件结束后的时间。如果load事件没有触发，那么该接口就返回0
	);　　
}

function getRequestCount(page) {
	const res = {
		post: 0,
		get: 0,
		js: 0,
		css: 0
	};
	page.on('request', request => {
		const method = request.method();
		const pathname = url.parse(request.url()).pathname;
		if(method === 'GET') {
			res.get++;
		} else if(method === 'POST') {
			res.post++;
		}

		if(pathname.endsWith('.js')) {
			res.js++;
		} else if(pathname.endsWith('.css')) {
			res.css++;
		}
	});

	return new Promise(resolve => {
		page.on('load', () => {
			resolve(res);
		});
	})
};

(async() => {　　
	const browser = await puppeteer.launch();　　
	const page = await browser.newPage();

	//

	const res = {
		post: 0,
		get: 0,
		js: 0,
		css: 0
	};
	
//	page.on('load',async () => {
//		console.log("222222")
//		console.log(res)
//		
//		//await browser.close();
//	});
//	
//	page.on('request', request => {
//		console.log("1111")
//		const method = request.method();
//		const pathname = url.parse(request.url()).pathname;
//		if(method === 'GET') {
//			res.get++;
//		} else if(method === 'POST') {
//			res.post++;
//		}
//
//		if(pathname.endsWith('.js')) {
//			res.js++;
//		} else if(pathname.endsWith('.css')) {
//			res.css++;
//		}
//	});
	
	　　
	
	console.log(await testPage(page));
	console.log(await getRequestCount(page));
	await browser.close();　　
})();
```
