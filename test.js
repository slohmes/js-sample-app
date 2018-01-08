const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    //headless: false,
    userDataDir: '/Users/sarahlohmeier/projects/js-sample-app/tmp/mockUserDataDir'
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForFunction('document.querySelector("#demo").innerHTML.length > 0').catch(err => console.log("something's wrong", err));
  await page.screenshot({path: 'tmp/localhost3000-4.png'}); // if there's already an image saved, what happens?

  console.log("saved screenshot");
  await browser.close();
})();

// add in an else here - if something goes wrong, exit.
