const { test, expect } = require("@playwright/test");

test("Playwright Special Locators", async ({ page }) => {
   // Navigate to the login page
   test.setTimeout(60 * 1000);
   page.setDefaultTimeout(9000);
   await page.goto("https://rahulshettyacademy.com/angularpractice/");
   await page.getByLabel("Check me out if you Love IceCreams!").check();
   await page.getByLabel("Employed").check();
   await page.getByLabel("Gender").selectOption("Male");
   await page.getByPlaceholder("Password").fill("rahulshettyacademy");
   await page.getByRole("button", { name: "Submit" }).click();
   await page.getByText("Success! The Form has been submitted successfully!").waitFor();
   console.log;
   await slowExpect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible();
   await page.getByRole("link", { name: "Shop" }).click();
   await slowExpect(page.getByText("Shop")).toBeVisible();
   await page.getByRole("app-card").filter({ hasText: "Blackberry" }).getByRole("button").click();
});
