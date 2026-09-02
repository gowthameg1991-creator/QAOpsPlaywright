const { expect } = require("@playwright/test");
const { customtest } = require("../utils/Fixtures.js");

customtest("Fixtures Demo", async ({ authenticatedPage, createOrder, testDataForOrder }) => {
   await authenticatedPage.goto("https://rahulshettyacademy.com/client");
   await authenticatedPage.locator("button[routerlink*='myorders']").click();
   await authenticatedPage.locator("tbody").waitFor();
   await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
   console.log(testDataForOrder.productName);
});
