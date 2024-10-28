// @ts-check
const { test, expect } = require('@playwright/test');

  test.describe.configure({mode: 'parallel'});
  test.only('Popup Validations', async ({page})=>
 {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  page.on("dialog", dialog => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const framePage = page.frameLocator("#courses-iframe");
  //await framePage.locator("li a[href*='lifetime-access'] : visible").click();
  await framePage.locator("body > div > header > div.header-upper > div > div > div.nav-outer.clearfix > nav > div.navbar-collapse.collapse.clearfix > ul > li:nth-child(3) > a").click();
  const textCheck = await framePage.locator(".text h2").textContent();
  console.log(textCheck?.split(" ")[1]);









      
});
 
test('Screenshot ans visual comparison', async ({page})=>
  {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'partialscreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden();




  });

  test('visual', async ({page})=>
    { 

await page.goto("https://google.com/");
expect(await page.screenshot()).toMatchSnapshot('landing.png');



    });