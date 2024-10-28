
const { test, expect } = require('@playwright/test');
const{customtest} = require('../utils/test-base')

const { POManager } = require('../pageobjects/POManager');
//Json-> string-> object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeholderTestData")));



for(const data of dataset)
{
test(`Client App login PO for  ${data.productName}`, async ({ page }) => {
  const poManager = new POManager(page);
  const products = page.locator('.card-body');
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.serachProductAddCart(data.productName);
  await dashboardPage.navigateToCart()

  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
       expect(bool).toBeTruthy();
 
  expect(bool).toBeTruthy();
  console.log(bool);
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").pressSequentially('ind', { delay: 100 });
  const dropdown = await page.locator(".ta-results");
  await dropdown.waitFor(); ``
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if
      (text === " India") {
      await dropdown.locator("button").nth(i).click();
      console.log(text);

      break;
    }

  }
  expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
  await page.locator(".action__submit").click();
  
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId?.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break
    }

  };
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId?.includes(orderIdDetails)).toBeTruthy();

  //await page.pause();

});


function newFunction() {
  return require('../pageobjects/DashboadPage');
}

}


customtest('Client App login PO', async ({ page,testDataForOrder }) => {
  const poManager = new POManager(page);
  
  const products = page.locator('.card-body');
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.serachProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart()

  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
 
  expect(bool).toBeTruthy();
  console.log(bool);
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").pressSequentially('ind', { delay: 100 });
  const dropdown = await page.locator(".ta-results");
  await dropdown.waitFor(); ``
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if
      (text === " India") {
      await dropdown.locator("button").nth(i).click();
      console.log(text);

      break;
    }

  }
  expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
  await page.locator(".action__submit").click();
  
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId?.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break
    }

  };
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId?.includes(orderIdDetails)).toBeTruthy();

  //await page.pause();

});


function newFunction() {
  return require('../pageobjects/DashboadPage');
}




test('Client App login', async ({page})=>
  {
    const poManager = new POManager(page);
     //js file- Login js, DashboardPage
      const username = "anshika@gmail.com";
      const password = "Iamking@000"
      const productName = 'Zara Coat 4';
      const products = page.locator(".card-body");
      const loginPage = poManager.getLoginPage();
      await loginPage.goTo();
      await loginPage.validLogin(username,password);
      const dashboardPage = poManager.getDashboardPage();
      await dashboardPage.searchProductAddCart(productName);
      await dashboardPage.navigateToCart();
 
     const cartPage = poManager.getCartPage();
     await cartPage.VerifyProductIsDisplayed(productName);
     await cartPage.Checkout();
 
     const ordersReviewPage = poManager.getOrdersReviewPage();
     await ordersReviewPage.searchCountryAndSelect("ind","India");
     const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
 
     
     
    //Zara Coat 4
  
  
  });