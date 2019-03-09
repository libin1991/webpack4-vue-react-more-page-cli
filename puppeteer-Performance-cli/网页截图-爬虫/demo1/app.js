// screen-shot
const puppeteer = require('puppeteer');

const getScreenShot = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto("https://baidu.com");
  await page.screenshot({path:"baidu.png"});

  await browser.close();
}

getScreenShot()

