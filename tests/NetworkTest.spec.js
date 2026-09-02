const { test, expect, request } = require("@playwright/test");
const { APiUtils } = require("../utils/APIUtils");
const loginPayLoad = { userEmail: "melinegg@gmail.com", userPassword: "Playwright@2026" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext, loginPayLoad);
   response = await apiUtils.createOrder(orderPayLoad);
});

//create order is success
test("@API Place the order", async ({ page }) => {
   await page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
   }, response.token);
   await page.goto("https://rahulshettyacademy.com/client");
   await page.route("**/api/ecom/order/get-orders-for-customer/**", async (route) => {
      const response = await page.request.fetch(route.request());
      await route.fulfill({
         response,
         body: JSON.stringify(fakePayloadOrders),
      });
   });
   await page.locator("button[routerlink*='myorders']").click();
   page.waitForResponse("**/api/ecom/order/get-orders-for-customer/**");
   await expect(page.getByText("You have No Orders to show at this time.")).toBeVisible();
   console.log(await page.locator(".mt-4").textContent());
});

//Verify if order created is showing in history page
// Precondition - create order -
