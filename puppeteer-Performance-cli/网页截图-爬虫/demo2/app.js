// book info spider
const puppeteer = require("puppeteer");
const fs = require('fs')

const spider = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://search.jd.com/Search?keyword=javascript");

  const result = await page.evaluate(() => {
    let elements = document.querySelectorAll(".gl-item");

    const data = [...elements].map(i => {
      return {
        name: i.querySelector(".p-name em").innerText,
        description: i.querySelector('.p-name i').innerText,
        price: i.querySelector(".p-price").innerText,
        shop: i.querySelector('.p-shopnum').innerText,
        url: i.querySelector('.p-img a').href
      }
    });
    return data; // 返回数据
  });

  browser.close();
  return result;
};

spider().then(value => {
  fs.writeFile(`${__dirname}/javascript.json`, JSON.stringify(value), err => {
    if (err){
      throw err
    }
    console.log('file saved!')
  })
  console.log(value); // Success!
});
