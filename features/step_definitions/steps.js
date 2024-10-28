const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const   playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    
    products = this.Whenpage.locator('.card-body');
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
    
});

When('Add {string} to Cart',  async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.serachProductAddCart(productName);
    await this.dashboardPage.navigateToCart()
  
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('Enter valid details and Place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
});

Then('Verify order is present in the  OrderHistory',async  function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {     
    // Write code here that turns the phrase above into concrete actions

    const userName = this.page.locator('#username'); 
    const signIn = this.page.locator('#signInBtn');
   await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     await userName.fill(username);
     await this.page.locator('#password').fill(password);  
     await signIn.click();
     

  Then('Verify Error message is displayed', async function () {
   
   console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
  });
  });

     
