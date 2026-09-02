const ExcelJs = require("exceljs");
const os = require("os");
const path = require("path");
const { test, expect } = require("@playwright/test");

async function writeExcelTest(searchText, replaceText, change, file) {
   const workbook = new ExcelJs.Workbook();
   await workbook.xlsx.readFile(file);
   const worksheet = workbook.getWorksheet("Sheet1");
   const output = await readExcel(worksheet, searchText);
   console.log("Excel file read successfully.");
   if (output.row === -1) {
      throw new Error(`${searchText} was not found in Sheet1.`);
   }

   const cell = worksheet.getCell(output.row, output.column + change.colChange);
   cell.value = replaceText;
   await workbook.xlsx.writeFile(file);
}

async function readExcel(worksheet, searchText) {
   let output = { row: -1, column: -1 };
   worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
         if (cell.value === searchText) {
            output.row = rowNumber;
            output.column = colNumber;
         }
      });
   });
   return output;
}

test("Upload download excel validation", async ({ page }, testInfo) => {
   const textSearch = "Banana";
   const updateValue = "100";
   await page.goto("https://rahulshettyacademy.com/upload-download-test/");
   const downloadPromise = page.waitForEvent("download");
   await page.getByRole("button", { name: "Download" }).click();
   const download = await downloadPromise;
   const filePath = path.join(os.homedir(), "Downloads", `${testInfo.testId}-${download.suggestedFilename()}`);
   await download.saveAs(filePath);
   console.log(filePath);
   await writeExcelTest(textSearch, updateValue, { colChange: 2 }, filePath);
   await page.locator("#fileinput").setInputFiles(filePath);
   const textLocator = page.getByText(textSearch);
   const desiredRow = await page.getByRole("row").filter({ has: textLocator });
   await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

   // await expect(page.getByText("Updated Excel Data Successfully.")).toBeVisible();
});
