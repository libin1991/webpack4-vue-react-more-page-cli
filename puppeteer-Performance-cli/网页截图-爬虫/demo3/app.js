const puppeteer = require("puppeteer");
const path = require("path");

const getTrace = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.tracing.start({ path: path.join(__dirname, "trace.json") });
  await page.goto("https://www.baidu.com");
  await page.tracing.stop();
  await browser.close();
}

getTrace()