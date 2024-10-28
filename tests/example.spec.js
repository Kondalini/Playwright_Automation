// @ts-check
const { test, expect } = require('@playwright/test');

/*test('Page Playwright Test', async ({ page }) => {
  await page.goto("https://google.com")
  // get title assertion
  console.log(await page.title())
  await expect(page).toHaveTitle("Google")
      });*/


      test('Browser Context Playwright Test', async ({browser})=>
        {
       
    const contex =  await browser.newContext();
    const page = await contex.newPage();
    //page.route('**/*.css' OR {jpeg,jpg},route=> route.abort()); - block css extention
    const userName = page.locator('#username'); 
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    page.on('request',request=>console.log(request.url()));
    page.on('response',response=>console.log(response.url(),response.status()));
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     await userName.fill("raulshetty");
     await page.locator('#password').fill("learning");  
     await signIn.click();
     console.log(await page.locator("[style*='block']").textContent());
     await expect(page.locator("[style*='block']")).toContainText('Incorrect');

     await userName.fill("");
     await userName.fill("rahulshettyacademy");
     await signIn.click();
     console.log(await cardTitles.nth(1).textContent());
     console.log(await cardTitles.first().textContent());
     const allTitles =  cardTitles.allTextContents();
     console.log(allTitles);


    });
