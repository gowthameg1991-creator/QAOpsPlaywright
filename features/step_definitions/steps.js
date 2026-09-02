const { When, Then, Given, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("a login to Ecommerce application with {string} and {string}", { timeout: 100 * 1000 }, async function (username, password) {
   this.UN = username;
   const loginPage = this.POM.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(username, password);
});

When("Add {string} to Cart", async function (productToSearch) {
   const dashboardPage = this.POM.getDashboardPage();
   await dashboardPage.searchProduct(productToSearch);
   await dashboardPage.navigateToCart();
});

Then("Verifty {string} is displayed in the Cart", async function (productToSearch) {
   await expect(this.page.getByRole("heading", { name: productToSearch }).first()).toBeVisible();
});

When("Enter valid details and Place the Order for {string} location", async function (country) {
   const placeOrder = this.POM.getPlaceOrder();
   await placeOrder.checkout();
   await placeOrder.selectCountry(country);
   await placeOrder.placeOrder(this.UN);
   this.orderID = await placeOrder.verifyOrderConfirmation();
   console.log(this.orderID);
});

Then("Verify order in present in the OrderHistory", async function () {
   const searchOrder = this.POM.getSearchMyOrder();
   await searchOrder.NavigateToMyOrder();
   await searchOrder.LocateMyOrder(this.orderID);
});

After(async function () {
   if (this.browser) {
      await this.browser.close();
   }
});

Given("a login to Ecommerce2 application with {string} and {string}", { timeout: 100 * 1000 }, async function (username, password) {
   const loginPage = this.POM.getLoginPage();
   await loginPage.goTo();
   await loginPage.invalidLogin(username, password);
});

Then("Verify Error message is displayed", { timeout: 30 * 1000 }, async function () {
   const errorMessage = await this.page.getByText("Incorrect email or password");
   console.log(errorMessage.textContent());
   await expect(errorMessage).toBeVisible();
});
