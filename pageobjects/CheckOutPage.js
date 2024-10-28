class CheckOutPage{

constructor(page){

this.checkOutButton = page.locator("text=Checkout");
this.productTextInCart = page.locator("h3:has-text('ZARA COAT 3')");
this.firstProduct = page.locator("div li");

}



}
module.exports = {CheckOutPage};