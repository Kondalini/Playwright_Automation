import {test, expect,Locator, Page} from '@playwright/test';
export class DashboardPage{

   products: Locator;
   productsText: Locator;
   cart : Locator;
   orders: Locator;
    page:Page;  

constructor(page:Page){

``

this.page = page;
this.products = page.locator(".card-body");
this.productsText = page.locator(".card-body b");
this.cart =  page.locator("[routerlink*='cart']");
this.orders = page.locator("button[routerlink*='myorders']");



}

 async serachProductAddCart(productName:string){

    //await page.waitForLoadState('networkidle');
       const titles =  await this.productsText.allTextContents();
    console.log(titles);
       const countItems  = await this.products.count();
    console.log(countItems);
    for(let i=0; i<countItems; ++i)
    {
    if (await this.products.nth(i).locator("b").textContent() === productName){
        //add to card
        await this.products.nth(i).locator("text= Add To Cart").click();
                 break;
    }
    }
   }
    async navigateToOrders()
{
    await this.orders.click();
}

 async navigateToCart()
 {
    await this.cart.click();


 }


}
module.exports = {DashboardPage};