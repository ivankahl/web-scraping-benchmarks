const now = require("performance-now");

async function puppeteerTest() {
  const puppeteer = require("puppeteer");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto("https://old.reddit.com/r/programming/");

  const titlesSelector = "p.title";
  await page.waitForSelector(titlesSelector);

  const titles = await page.evaluate(
    (titlesSelector) =>
      [...document.querySelectorAll(titlesSelector)].map((a) => a.textContent),
    titlesSelector
  );

  await browser.close();
}

async function playwrightTest() {
  const playwright = require("playwright");

  const browser = await playwright.chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto("https://old.reddit.com/r/programming/");

  const titlesSelector = "p.title";
  await page.waitForSelector(titlesSelector);

  const titles = await page.$$eval(titlesSelector, (n) =>
    n.map((x) => x.textContent)
  );

  await browser.close();
}

async function seleniumTest() {
  const { Options } = require("selenium-webdriver/chrome");
  const webdriver = require("selenium-webdriver");
  require("chromedriver");

  const options = new Options();
  options.addArguments("headless");
  options.addArguments("no-sandbox");

  const driver = new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  await driver.get("https://old.reddit.com/r/programming/");

  const titleElements = await driver.findElements(webdriver.By.css("p.title"));
  const titles = await Promise.all(titleElements.map((x) => x.getText()));

  await driver.quit();
}

async function nightmareTest() {
  const Nightmare = require("nightmare");
  const nightmare = Nightmare({ show: false });

  const titlesSelector = "p.title";

  const titles = await nightmare
    .goto("https://old.reddit.com/r/programming/")
    .wait(titlesSelector)
    .evaluate((titlesSelector) => {
      const titleElements = document.querySelectorAll(titlesSelector);
      return Array.from(titleElements).map((a) => a.textContent);
    }, titlesSelector);

  await nightmare.end();
}

async function cypressTest() {
  const cypress = require("cypress");

  const result = await cypress.run({
    spec: "./cypress/e2e/spec.cy.js",
    headless: true,
    browser: "chrome",
    quiet: true,
  });
}

const tests = {
  Puppeteer: puppeteerTest,
  Playwright: playwrightTest,
  Selenium: seleniumTest,
  Nightmare: nightmareTest,
  Cypress: cypressTest,
};

async function executeNTimes(n = 5) {
  const times = {};
  for (const key of Object.keys(tests)) times[key] = [];

  for (let i = 0; i < n; i++) {
    for (const key of Object.keys(tests)) {
      const start = now();
      await tests[key]();
      const end = now();

      times[key].push(end - start);
    }
  }

  return times;
}

function calculateStats(times) {
  const stats = {};
  for (const key of Object.keys(times)) {
    stats[key] = {};
    stats[key].mean = times[key].reduce((a, b) => (a + b) / 2);
    stats[key].min = Math.min(...times[key]);
    stats[key].max = Math.max(...times[key]);
    stats[key].range = stats[key].max - stats[key].min;
  }

  return stats;
}

(async () => {
  const times = await executeNTimes(20);
  console.log(calculateStats(times));
})();
