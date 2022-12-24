# Web Scraping Library Benchmarks

> Node.js that benchmarks scraping Reddit using Puppeteer, Playwright, Selenium, Nightmare, and Cypress.

I wanted to compare the performance of different JavaScript browser automation libraries to determine the most efficient. Unfortunately, I couldn't find any existing resources for the particular libraries I was looking at, so I decided to write a simple benchmark script to compare. 

## How It Works

The file structure is not too elaborate for this benchmark. I created test functions for each of the libraries inside the `index.js` file. These are called `puppeteerTest`, `playwrightTest`, `seleniumTest`, `nightmareTest` and `cypressTest`. In each function, I use the corresponding library to open a new browser instance and navigate to the [Old Reddit Programming Subreddit](https://old.reddit.com/r/programming/). After that, each function uses the appropriate library to extract an array of post titles present on the front page of the subreddit. Each function makes sure to the close the browser completely.

Each of these `xxxTest` methods are added to a dictionary. I then created a function that lets you specify how many Runs/Iterations you want to use to benchmark using a parameter called `n`. The function will then loop from `0` to `n - 1` and execute each of the test functions. I get the current timestamp before and after each test function's execution using the [performance-now](https://www.npmjs.com/package/performance-now) NPM package. This package lets me time the method execution accurately. Once all the iterations are complete, the function returns an object where the key is the name of each library and the value is an array of the times for each run/iteration.

I then have another method which accepts this "stats" object and computes the mean, max, min and range for each library. This is then outputted to the console.

## The Test

I ran this script so that I could get an idea how the different libraries performed. I used Google Chrome on Ubuntu when executing the tests

### The Environment

#### Server

The server was a Digital Ocean Droplet hosted in the San Francisco 3 region.

- 8GB RAM
- 4 Intel vCPUs

#### Software

- Ubuntu 22.10
- Node 18.12.1 (latest LTS)
- Google Chrome 108.0.5359.71

#### Network

I tried to reduce the risk of network speed affecting the results by running the tests from a data center. I ran Speedtest.net several times and these are the final average speeds and ping:

- **Server:** Sonic.net, Inc. (San Jose, CA) [12.66 km]
- **Ping:** 1.6334 ms
- **Download:** 2 307.51 Mbit/s
- **Upload:** 1 758.13 Mbit/s

### Parameters

I executed the `index.js` file as is, using `n = 20` as my parameter. This means that there were 20 iterations/runs.

### Results

<details>
<summary><b>Raw Results</b></summary>

```json
{
  "Puppeteer": {
    "mean": 1643.1469511669916,
    "min": 1537.5361500000581,
    "max": 2271.8459969996475,
    "range": 734.3098469995894,
    "times": [
      1928.3420899999328,
      2271.8459969996475,
      1642.9828340001404,
      1709.3644560002722,
      2018.690910000354,
      1576.8950769999065,
      1749.515677000396,
      1638.8156090001576,
      1935.6038359999657,
      1692.7202450004406,
      1692.6081720003858,
      1747.9159519998357,
      1863.597107999958,
      1786.312955999747,
      2078.3692459999584,
      1730.50540000014,
      1939.5651330002584,
      1624.645843999926,
      1742.033071000129,
      1537.5361500000581
    ]
  },
  "Playwright": {
    "mean": 1856.2908305211959,
    "min": 1699.8476590001956,
    "max": 3072.305281000212,
    "range": 1372.4576220000163,
    "times": [
      3072.305281000212,
      2386.7047190000303,
      2417.8961869999766,
      1803.3579739998095,
      1812.9076169999316,
      1787.4591919998638,
      1753.2518259999342,
      1770.573585999664,
      1700.7235980001278,
      1828.3124810000882,
      1872.2950889999047,
      1858.8318900000304,
      2023.93325500004,
      1917.9055750002153,
      2158.088520999998,
      2010.9584160000086,
      1863.174780999776,
      1699.8476590001956,
      2164.1673260000534,
      1719.3235329999588
    ]
  },
  "Selenium": {
    "mean": 3034.3709003950426,
    "min": 1991.7241730000824,
    "max": 3513.212168000173,
    "range": 1521.4879950000905,
    "times": [
      2597.3183989999816,
      2269.637477000244,
      2491.1111210002564,
      2975.3189010000788,
      2684.9782340000384,
      2106.2630819999613,
      3047.0517710000277,
      2206.284098999575,
      2332.964389000088,
      2242.824516000226,
      2023.7416459997185,
      1991.7241730000824,
      2010.4374850001186,
      2406.13556699967,
      2611.160707999952,
      3513.212168000173,
      3225.3291710000485,
      2834.6442080000415,
      2780.9108040002175,
      3195.7159979999997
    ]
  },
  "Nightmare": {
    "mean": 2970.9844776571244,
    "min": 2306.345174000133,
    "max": 3440.314868000336,
    "range": 1133.9696940002032,
    "times": [
      2825.031655000057,
      2311.00467699999,
      2317.5563210002147,
      2956.431164999958,
      3440.314868000336,
      3053.8536449996755,
      3304.1957649998367,
      2906.787066000048,
      2972.513772999868,
      2680.52647599997,
      2371.705127000343,
      2615.5839669997804,
      2306.345174000133,
      2353.730772000272,
      2947.632855999749,
      2727.5696330000646,
      2733.2696190001443,
      3187.5502289999276,
      2893.2117159999907,
      3019.029581000097
    ]
  },
  "Cypress": {
    "mean": 13304.47232425455,
    "min": 12458.96676900005,
    "max": 18509.784184999764,
    "range": 6050.817415999714,
    "times": [
      13579.576239000075,
      12458.96676900005,
      12672.777289999649,
      13153.564375000075,
      12892.368786999956,
      13559.813064999878,
      13869.824397000019,
      13840.663665999658,
      13788.659838999622,
      13903.668721999973,
      14849.136721000075,
      14473.280269999988,
      15325.555235999636,
      15284.516143999994,
      18509.784184999764,
      12770.869092999958,
      13440.44753899984,
      12886.543018999975,
      12951.708025999833,
      13383.698429000098
    ]
  }
}
```

</details>

Below is a line graph showing the execution times for each library over the 20 runs. 

![image](https://user-images.githubusercontent.com/5931577/209339146-9ec2f2a8-39b7-4088-8593-01460716f369.png)

You can see that Playwright and Puppeteer performed consistently fast. Selenium and Nightmare were a bit slower and also had a large range, meaning the times were less consistent. Finally, Cypress is found to be the slowest. This is understandable since Cypress is more than a web scraper, it's a full browser automation test library. Hence, Cypress has additional overhead and intialization that occurs. All of this overhead means that the library performed slower for web scraping.

If we calculate the mean execution time for each library, we can derive the following graph:

![image](https://user-images.githubusercontent.com/5931577/209337945-741fec0e-db07-4f88-acac-522d4b5b438f.png)

Puppeteer came first in terms of performance, with Playwright coming second. Then there's a noticeable jump from second to third. Nightmare took roughly the same amount of time as Selenium. Lastly, Cypress had the worst performance of the five libraries, presumable for the reasons stated above.

## Conclusion

It appears that the two most popular, modern web scraping frameworks, Puppeteer and Playwright, have the best performance for web scraping. However, Selenium, which has been around for many years, is not far behind and so it's still a viable option. Nightmare might not have the same traction as the first three libraries but it also remains a viable option. Cypress might work for web scraping, and it's simple API makes it an attractive option, however the performance might not be beneficial for your needs.

Overall this was an interesting test and hopefully one that can help you as well.

