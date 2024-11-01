export class APIUtils{
apiContext:any;
loginPayLoad:string;

    constuctor(apiContext:any,loginPayLoad:string){
      this.apiContext = apiContext;
      this.loginPayLoad = loginPayLoad;
    }

async getToken()
{
const loginResponse =await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:this.loginPayLoad
    })

const loginResponseJson =  await loginResponse.json();
 const token = loginResponseJson.token;
console.log(token);
return token;

}

  async createOrder(orderPayLoad:string) {
   
let response = {token:String, orderId:String};
response.token = await this.getToken
const orderResponse =  await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order");
{
    data: orderPayLoad,
    headers; {
  'Authorization', this.getToken(),
  'Content-Type' , 'application/json'
}
}
const orderResponseJson = await orderResponse.json();
const orderId = orderResponseJson.orders[0];
response.orderId = orderId
return response;
 

}

}
module.exports = {APIUtils};