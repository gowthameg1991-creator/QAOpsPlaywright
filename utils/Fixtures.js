const base = require("@playwright/test");
const { APiUtils } = require("./APIUtils");
const loginPayLoad = { userEmail: "melinegg@gmail.com", userPassword: "Playwright@2026" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

exports.customtest = base.test.extend({
   authenticatedPage: async ({ browser }, use) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const userEmail = page.getByPlaceholder("email@example.com");
      const login = page.getByRole("button", { name: "Login" });
      const userPassword = page.getByPlaceholder("enter your passsword");
      await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
      await userEmail.fill("melinegg@gmail.com");
      await userPassword.fill("Playwright@2026");

      // Submit login form with valid credentials
      await login.click();
      await page.waitForLoadState("networkidle");
      await use(page);
      await context.close();
   },

   createOrder: async ({ request }, use) => {
      const apiUtils = new APiUtils(request, loginPayLoad);
      const response = await apiUtils.createOrder(orderPayLoad);
      await use(response);
   },

   testDataForOrder: {
      productName: "ZARA COAT 3",
   },
});
