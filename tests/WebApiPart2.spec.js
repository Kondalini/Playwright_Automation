const { test, expect } = require('@playwright/test');
let webContex;

test.beforeAll( async ({browser}) =>{
  
  const context = await browser.newContext();
  const page =  await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.getByPlaceholder("email@example.com").fill('anshika@gmail.com');
  await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
  await page.getByRole("button", {name: 'Login'}).click();
  //await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  await context.storageState({path: 'state.json'});
  webContex = await browser.newContext({storageState: 'state.json'});
 

});

test('Client App login', async ({page}) =>{

const email = '';
const productName = 'ZARA COAT 3';
const pagee = await webContex.newPage();
await page.goto("https://rahulshettyacademy.com/client/");
const products = page.locator('.card-body');
const titles =  await page.locator(".card-body b").allTextContents();
      console.log(titles);
      console.log(products);
      const countItems  = await products.count();
      console.log(countItems);
      for(let i=0; i<countItems; ++i)
      {
      if (await products.nth(i).locator("b").textContent() === productName){
          //add to card
          await products.nth(i).locator("text= Add To Cart").click();
                   break;
      }
      }
       await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
       const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
       expect(bool).toBeTruthy();
       console.log(bool);
       await page.locator("text=Checkout").click();
       await page.locator("[placeholder*='Country']").pressSequentially('ind');
       const dropdown = await page.locator(".ta-results");
       await dropdown.waitFor();
       const optionsCount =  await dropdown.locator("button").count();
       for(let i= 0; i<optionsCount; ++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if
          (text === " India"){
            await dropdown.locator("button").nth(i).click();
            console.log(text);

            break;
          }
        
       }
       expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
       await page.locator(".action__submit").click();
       await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
       const orderId =await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
       console.log(orderId);
       await page.locator("button[routerlink*='myorders']").click();
       await page.locator("tbody").waitFor();
       const rows = await page.locator("tbody tr");
      for(let i=0;  i< await rows.count(); ++i){
       const rowOrderId =  await rows.nth(i).locator("th").textContent();
        if(orderId?.includes(rowOrderId)){
          await rows.nth(i).locator("button").first().click();
          break
        }

      }
     const orderIdDetails = await page.locator(".col-text").textContent();
     expect(orderId?.includes(orderIdDetails)).toBeTruthy();

      //await page.pause();
     
    });

