const { test, expect } = require("@playwright/test");
const { customtest } = require("../utils/test-base.js");
const { POManager } = require("../pageobjects/POManager.js");
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test.describe.configure({ mode: "serial" });
test("@Web Client App E2E workflow - Login, Search, Purchase, and Verify Order", async ({ page }) => {
   const POM = new POManager(page);

   // Step 1: Login
   const loginPage = POM.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(dataSet.username, dataSet.password);

   // Step 2: Search for product and add to cart
   const dashboardPage = POM.getDashboardPage();
   await dashboardPage.searchProduct(dataSet.productToSearch);
   await dashboardPage.navigateToCart();

   // Step 3: Verify product is in cart
   await expect(page.getByRole("heading", { name: dataSet.productToSearch }).first()).toBeVisible();

   // Step 4: Proceed to checkout
   const placeOrder = POM.getPlaceOrder();
   await placeOrder.checkout();
   await placeOrder.selectCountry(dataSet.country);
   await placeOrder.placeOrder(dataSet.username);
   const orderID = await placeOrder.verifyOrderConfirmation();
   console.log(orderID);

   const searchOrder = POM.getSearchMyOrder();
   await searchOrder.NavigateToMyOrder();
   await searchOrder.LocateMyOrder(orderID);
});

customtest("Client App E2E workflow - fixture", async ({ page, testDataForOrder }) => {
   const POM = new POManager(page);

   // Step 1: Login
   const loginPage = POM.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

   // Step 2: Search for product and add to cart
   const dashboardPage = POM.getDashboardPage();
   await dashboardPage.searchProduct(testDataForOrder.productToSearch);
   await dashboardPage.navigateToCart();

   // Step 3: Verify product is in cart
   await expect(page.getByRole("heading", { name: testDataForOrder.productToSearch }).first()).toBeVisible();

   // Step 4: Proceed to checkout
   const placeOrder = POM.getPlaceOrder();
   await placeOrder.checkout();
   await placeOrder.selectCountry(testDataForOrder.country);
   await placeOrder.placeOrder(testDataForOrder.username);
   const orderID = await placeOrder.verifyOrderConfirmation();
   console.log(orderID);

   const searchOrder = POM.getSearchMyOrder();
   await searchOrder.NavigateToMyOrder();
   await searchOrder.LocateMyOrder(orderID);
});
