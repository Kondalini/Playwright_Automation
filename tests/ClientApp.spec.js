
const { test, expect } = require('@playwright/test');


/*test('Page Playwright Test', async ({ page }) => {
  await page.goto("https://google.com")
  // get title assertion
  console.log(await page.title())
  await expect(page).toHaveTitle("Google")
      });*/


      test('Browser Context Validation errot login', async ({page})=>
        {
          await page.goto("https://rahulshettyacademy.com/client/");
          await page.locator("#userEmail").fill("ansika@gmail.com");
          await page.locator("#userPassword").fill("Iamking@000");
          await page.locator("[value= 'Login']").click();
          //await page.waitForLoadState('networkidle');
           await page.locator(".card-body b").first().waitFor();
          const titles =  await page.locator(".card-body b").allTextContents();
          console.log(titles);



       
        });

        test('UI controls', async  ({page})=>
        {
          await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
          const userName = page.locator('#username');
          const signIn = page.locator('#signInBtn');
          const dropdown = page.locator("select.form-control");
          const documentLink = page.locator("body > a");
          await dropdown.selectOption('consult');
          //await page.pause();
          await page.locator("#login-form > div:nth-child(4) > div > label:nth-child(2) > span.radiotextsty").click();
          await page.locator("#okayBtn").click()  ;
          console.log(await page.locator("#login-form > div:nth-child(4) > div > label:nth-child(2) > span.radiotextsty").isChecked());
           await expect(page.locator("#login-form > div:nth-child(4) > div > label:nth-child(2) > span.radiotextsty")).toBeChecked();
           //await page.pause(); 
           await page.locator('#terms').click();
           await expect(page.locator('#terms')).toBeChecked();
           await page.locator('#terms').uncheck();
           expect(await page.locator('#terms').isChecked()).toBeFalsy();
           await expect(documentLink).toHaveAttribute("class","blinkingText");
           console.log (documentLink);
    
            
           

                });
test('Child windows handling', async  ({browser})=>
{
  const contex =  await browser.newContext();
  const page = await contex.newPage();
  const userName = page.locator('#username');
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink = page.locator("body > a");

const[newPage] = await Promise.all(
[contex.waitForEvent('page'),//listen for any new page- pending;rejected;fulfiled
documentLink.click(), ]  )
 const text = await  newPage.locator(".red").textContent();
console.log(text);
const arrayText = text.split('@')
const domain = arrayText[1].split(' ')[0]
console.log(domain);
await page.locator('#username').fill(domain);
//await page.pause();
console.log(await page.locator('#username').textContent());


  });

  
  test('Client App login', async ({page})=>
    {
      const email = 'ansika@gmail.com';
      const productName = 'ZARA COAT 3';
      const products = page.locator('.card-body');
      await page.goto("https://rahulshettyacademy.com/client/");
      await page.locator("#userEmail").fill(email);
      await page.locator("#userPassword").fill("Iamking@000");
      await page.locator("[value= 'Login']").click();
      //await page.waitForLoadState('networkidle');
      await page.locator(".card-body b").first().waitFor();
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

      };
     const orderIdDetails = await page.locator(".col-text").textContent();
     expect(orderId?.includes(orderIdDetails)).toBeTruthy();

      //await page.pause();
     
    });


    test('Special locators', async ({page})=> 
    {
      await page.goto("https://rahulshettyacademy.com/angularpractice");
      await page.getByLabel("Check me out if you Love IceCreams!").click();
      await page.getByLabel("Employed").check();
      await page.getByLabel("Gender").selectOption("Female");
      await page.getByPlaceholder("Password").click();
      await page.getByRole("button", {name:'Submit'}).click();
      await page.getByText("Protractor Tutorial").isVisible();
      await page.getByRole("link", {name: 'Shop'}).click();
      await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();


    });
