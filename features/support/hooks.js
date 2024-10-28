const   playwright = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')


Before  ({tags: "@foo"}, async function(){


const browser =  await playwright.chromium.launch({

    //headless : false
});
    const contex =  await browser.newContext();
    this.page = await contex.newPage();
    this.poManager = new POManager(this.page);

    });

BeforeStep(function(){

});

AfterStep(async function({result}){
if(result.status === Status.FAILED){
await this.page.screenshot({path: 'screenshot.png'});

}
});




After( function(){


    console.log('I m the last to execute');
}




)