var prompt = require('prompt');
prompt.start();

require('chromedriver');
var hel = require('./helper.js')
const { Driver, Builder, By, Key, until } = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
let driver = new Builder()
.forBrowser('chrome')
    .setChromeOptions(eval(`new chrome.Options().windowSize({width:1366,height:768})`))
    .withCapabilities({
        browserName: 'chrome',
        chromeOptions: { args: ['user-agent="iphone ios apple iphone 8'] }
    })
    .build();

(async () => {
    try {
        var { querySearch } = await prompt.get(['querySearch']);
        var siteUrl = 'youtube.com';
        var sleepTime = 1000;

        await driver.get(`http://${siteUrl}`);
        var pageTitle = await (await driver).getTitle();
        console.log(pageTitle)

        // execute javascript
        // call js from cdnjs
        // await driver.executeScript(`
        //     var s = document.createElement("script");
        //     s.type = "text/javascript";
        //     s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js";
        //     $("head").append(s);

        //     // remove img elements on page
        //     setTimeout(function(){
        //         jQuery('img').remove()
        //      },1500)
        //     `,
        // []);

        // ytd-search-input-xs-map : //*[@id="search"]
        await driver.findElement(By.id('search')).sendKeys(querySearch, Key.RETURN)
        await driver.sleep(2000);

        var pageTitle = await (await driver).getTitle();
        console.log(pageTitle)

        await (await driver).takeScreenshot()
        .then(d => {
            hel.saveimg(d)
        })

        await driver.sleep(sleepTime);
        await driver.quit()

    } catch {
        await driver.sleep(10000);
        await driver.quit()
    }

})()