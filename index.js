async function puppeteerTest() {
  const puppeteer = require("puppeteer");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://old.reddit.com/r/programming/");

  const titlesSelector = "p.title";
  await page.waitForSelector(titlesSelector);

  const links = await page.evaluate(titlesSelector => [...document.querySelectorAll(titlesSelector)].map(a => a.textContent), titlesSelector);

  console.log(links.join("\n"));

  await browser.close();
}

async function playwrightTest() {
  const playwright = require("playwright");

  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://old.reddit.com/r/programming/");

  const titlesSelector = "p.title";
  await page.waitForSelector(titlesSelector);

  const links = await page.$$eval(titlesSelector, n => n.map(x => x.textContent));

  console.log(links.join("\n"));

  await browser.close();
}

async function seleniumTest() {
  const webdriver = require("selenium-webdriver");
  require("chromedriver");

  const driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(o => {
    o.addArguments("--no-sandbox")
    return o;
  }).build();

  await driver.get("https://old.reddit.com/r/programming/");

  const titles = titles.findElements(webdriver.By.css("p.title"));

  console.log(titles);
}

(async() => {
    await seleniumTest();
})();