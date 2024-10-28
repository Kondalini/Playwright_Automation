const { test, expect, request } = require('@playwright/test');


test('Security test request intersept', async ({ page }) => {
    const email = 'ansika@gmail.com';
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value= 'Login']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor()
    await page.locator("button[routerlink*='myorders']").click();

    await page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("body > app-root > app-myorders > div.container.table-responsive.py-5 > table > tbody > tr:nth-child(1) > td:nth-child(6) > button").first().click();
    await  expect(page.locator("p").last()).toHaveText("You are not authorize to view this order ");







});