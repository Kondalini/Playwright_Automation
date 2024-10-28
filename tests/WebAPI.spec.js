
const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('./utils/ApiIUtils');
const loginPayLoad = {userEmail:'anshika@gmail.com', userPassword: 'Iamking@000'};
const orderPayLoad = {orders:[{country:'Cuba', productOrderId: '66ffe28eae2afd4c0b8f19be'}]};

  let token;
  let orderId;
  let response;

test.beforeAll( async ()=>
{
const apiContext = await request.newContext();
const apiUtils  = new APIUtils(apiContext,loginPayLoad);
response =  await apiUtils.createOrder(orderPayLoad);

});
  
test('Create  the Order',async ({page}) =>{ 

  
   
    page.addInitScript(value =>{

  
        window.localStorage.setItem('token',value);
},response.token);
       await page.goto("https://rahulshettyacademy.com/client");
       await page.locator("button[routerlink*='myorders']").click();
       await page.locator("tbody").waitFor();
       const rows = await page.locator("tbody tr");
      for(let i=0;  i< await rows.count(); ++i){
       const rowOrderId =  await rows.nth(i).locator("th").textContent();
        if(response.orderId?.includes(rowOrderId)){
          await rows.nth(i).locator("button").first().click();
          break
        }

      }
     const orderIdDetails = await page.locator(".col-text").textContent();
     expect(response.orderId?.includes(orderIdDetails)).toBeTruthy();
       
    });

   

    