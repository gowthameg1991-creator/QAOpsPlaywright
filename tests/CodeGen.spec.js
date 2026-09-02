const { test, expect } = require("@playwright/test");

test("test", async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/angularpractice/");
   await page.locator('input[name="email"]').click();
   await page.getByRole("link", { name: "Shop" }).click();
   await page.locator("app-card").filter({ hasText: "iphone X $24.99 Lorem ipsum" }).getByRole("button").click();
   await page.locator("app-card").filter({ hasText: "Samsung Note 8 $24.99 Lorem" }).getByRole("button").click();
   await page.getByText("Checkout ( 2 ) (current)").click();
   await page.getByRole("button", { name: "Checkout" }).click();
   await page.getByText("I agree with the term &").click();
   await page.getByRole("button", { name: "Purchase" }).click();
   await expect(page.locator("app-checkout")).toContainText("× Success! Thank you! Your order will be delivered in next few weeks :-).");
});
