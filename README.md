# Web Scraping Library Benchmarks

> Node.js that benchmarks scraping Reddit using Puppeteer, Playwright, Selenium, Nightmare, and Cypress.

I wanted to compare the performance of different JavaScript browser automation libraries to determine the most efficient. Unfortunately, I couldn't find any existing resources for the particular libraries I was looking at, so I decided to write a simple benchmark script to compare. 

I created a test method for each library. The test method will initialize the library and then load the [Old Reddit Programming page](https://old.reddit.com/r/programming/). The function then extracts all the titles of the posts shown on the first page and stores them in an array. To benchmark each of these methods, I used the [performance-now](https://www.npmjs.com/package/performance-now) NPM package to time the execution of each method. I then executed each library method `N` number of times, timing each execution in milliseconds. At the end of the executions, I compiled the list of times and calculated each library's mean, min, max, and range.

## The Results

For this benchmark, I used a Digital Ocean Droplet. I configured the virtual machine with 8GB RAM and 4 Intel vCPUs in the San Francisco 3 region. I used the latest LTS version of Node (v18.12.1) to run the script. Finally, I performed all tests using Google Chrome 108.0.5359.71. I set `N` to 20, so the script executed each library's test function 20 times.

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

Below is a line graph showing the execution times for each library over the 20 runs:

![image](https://user-images.githubusercontent.com/5931577/209339146-9ec2f2a8-39b7-4088-8593-01460716f369.png)

If we calculate the mean execution time for each library, we can derive the following graph:

![image](https://user-images.githubusercontent.com/5931577/209337945-741fec0e-db07-4f88-acac-522d4b5b438f.png)

Puppeteer came first in terms of performance, with Playwright coming second. Then there's a noticeable jump from second to third. Nightmare took roughly the same amount of time as Selenium. Lastly, Cypress had the worst performance of the five libraries. This gap is understandable, though, as Cypress is more an end-to-end testing library than a web scraping library, meaning it has additional overhead that is executed every time.

