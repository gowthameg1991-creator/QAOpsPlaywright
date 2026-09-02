const { test, expect } = require("@playwright/test");

let webContext;

test.beforeAll(async ({ browser }) => {
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
   await context.storageState({ path: "state.json" });
   await context.close();
   webContext = await browser.newContext({ storageState: "state.json" });
});

test.afterAll(async () => {
   await webContext?.close();
});

test("Second Playwright Test", async () => {
   const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   const products = page.locator(".card-body");

   //console.log(await page.title());

   // Attempt login with invalid credentials

   await products.filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: "Add To Cart" }).click();
   await page.getByRole("listitem").filter({ hasText: "Cart" }).getByRole("button", { name: "Cart" }).click();

   await page.locator("div li").first().waitFor();
   const bool = await page.getByText("ZARA COAT 3").isVisible();
   expect(bool).toBeTruthy();
   await page.getByRole("button", { name: "Checkout" }).click();
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
   await page.getByRole("button", { name: "India" }).nth(1).click();

   await expect(page.getByText("melinegg@gmail.com")).toBeVisible();
   await page.getByText("PLACE ORDER").click();

   await page.locator(".hero-primary").waitFor();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();

   const orderDetails = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderDetails);
   await page.locator("button[routerlink*='myorders']").click();

   const rows = page.locator("tbody tr");
   await rows.first().waitFor();
   const count2 = await rows.count();
   for (let i = 0; i < count2; ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderDetails.includes(rowOrderId)) {
         await expect(rows.nth(i).locator("th")).toHaveText(rowOrderId);
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }

   const orderDetailsText = await page.locator(".col-text").textContent();
   expect(orderDetails.includes(orderDetailsText)).toBeTruthy();

   // await products.first().waitFor();
   // console.log(await products.nth(1).textContent());
});
