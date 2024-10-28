const excelJs = require('exceljs');

const { test, expect } = require('@playwright/test');


async function writeExcelTest(searchText,replaceText,change,filePath)
{

    
const workbook = new excelJs.Workbook();
await workbook.xlsx.readFile(filePath)

const worksheet = workbook.getWorksheet('Sheet1');


 const output =  await readExcel(worksheet,searchText);  

const cell = worksheet.getCell(output.row,output.column + change.columnChange);
cell.value = replaceText;
await workbook.xlsx.writeFile(filePath)

}
async function readExcel(worksheet,searchText)
{
    let output = {row:-1,column:-1};
    worksheet.eachRow( (row,rowNumber) =>
        {
        row.eachCell((cell,colNumber) =>
        
        {
        if (cell.value === searchText)
        {
            output.row =rowNumber;
            output.column = colNumber;
        }
    })
    })
    return output
} 


//writeExcelTest("Mango",350,{rowChange:0,columnChange:2},"C:/Users/alex_/Downloads/download.xlsx");

test('Upload download excel validation', async ({page})=>
{
    const textSerach = 'Mango'
    const updatedValue = '350';
await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
await page.getByRole('button', {name:'Download'}).click();
    writeExcelTest(textSerach,updatedValue,{rowChange:0,columnChange:2},"C:/Users/alex_/Downloads/download.xlsx");
    const downloadPromise = page.waitForEvent('download');
    await page.locator("#fileinput").click();
    await downloadPromise;
    await page.locator("#fileinput").setInputFiles("C:/Users/alex_/Downloads/download.xlsx");
    const textLocator = page.getByText(textSerach);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedValue);




})

   