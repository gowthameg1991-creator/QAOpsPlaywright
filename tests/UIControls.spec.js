const { test, expect } = require("@playwright/test");

test("Controls Playwright Test", async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator("#username");
   const signIn = page.locator("#signInBtn");
   const password = page.locator("[type='password']");
   const cardTitles = page.locator(".card-body a");
   const dropdown = page.locator("select.form-control");
   const documentLink = page.locator("a[href*='documents-request']");

   // Navigate to the login page
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());

   // Clear username field and enter correct credentials
   await userName.fill("rahulshettyacademy");
   await page.locator("[type='password']").fill("Learning@830$3mK2");
   await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click();
   expect(await page.locator(".radiotextsty").last()).toBeChecked();
   // await page.pause();
   // Submit login form with valid credentials

   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(await page.locator("#terms")).not.toBeChecked();
   await expect(documentLink).toHaveAttribute("class", "blinkingText");
   //  expect (await page.locator("#terms")).toBeFalsy();
   // Submit login form with valid credentials
   await signIn.click();

   // Log product names from the dashboard after successful login
   // console.log(await cardTitles.first().textContent());
   // console.log(await cardTitles.nth(1).textContent());
   // sssawait page.waitForLoadState('networkidle');
   await cardTitles.first().waitFor();
   const allTitles = await cardTitles.allTextContents();

   console.log(allTitles);
   //  expect(await page.locator

   //  await expect(page).toHaveTitle(/Login/);

   //  await context.close();
});

test("New Page Playwright Test", async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();

   const userName = page.locator("#username");
   // const signIn = page.locator("#signInBtn");
   // const password = page.locator("[type='password']")
   // const cardTitles = page.locator(".card-body a");
   // const dropdown = page.locator("select.form-control");
   const documentLink = page.locator("a[href*='documents-request']");

   // Navigate to the login page
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());

   const [newPage] = await Promise.all([context.waitForEvent("page"), documentLink.click()]);

   const text = await newPage.locator(".red").textContent();
   console.log(text);

   const email = await newPage.locator("a[href$='mailto:mentor@rahulshettyacademy.com']").textContent();
   console.log(email);

   await userName.type(email);
   await page.pause();
   console.log(await userName.textContent());
});
