const { base} = require('@playwright/test');

exports.customtest = base.test.extend(
{

 testDataForOrder : {
    username : "ansika@gmail.com",
    password : "Iamking@000",
    productName : "ZARA COAT 3"
    }

})

