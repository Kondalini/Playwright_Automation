
const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('../utils/ApiIUtils');
const loginPayLoad = {userEmail:'anshika@gmail.com', userPassword: 'Iamking@000'};
const orderPayLoad = {orders:[{country:'Cuba', productOrderId: '66ffe28eae2afd4c0b8f19be'}]};
const fakePayloadOrders = {data: [], message: "No orders"};

  let token;
  let orderId;
  let response;

test.beforeAll( async ()=>
{
const apiContext = await request.newContext();
const apiUtils  = new APIUtils(apiContext,loginPayLoad);
response =  await apiUtils.createOrder(orderPayLoad);

})
  
test('Create  the Order',async ({page}) =>{ 
         page.addInitScript(value =>{

          window.localStorage.setItem('token',value);
},response.token);
       await page.goto("https://rahulshettyacademy.com/client");
       await page.route(
'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
async route =>{
const response = await page.request.fetch(route.request());
let body = JSON.stringify(fakePayloadOrders);
route.fulfill(
  {
    response,body,
  }
);

});
       await page.locator("button[routerlink*='myorders']").click();
       await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
       console.log(await page.locator('.mt-4').textContent());
      
       
    });

   

    