const { test, expect } = require("@playwright/test");
const { link } = require("node:fs");

const BASE_URL = "https://rahulshettyacademy.com/AutomationPractice/";

// Change these to match a registered account in your local sandbox
// const GMAIL_USER = { email: 'melinegg@gmail.com', password: 'Playwright@2026' };

async function loginAndGoToBooking(page) {
   await page.goto(`${BASE_URL}`);

   // await page.getByLabel('Email').fill(GMAIL_USER.email);
   // await page.getByPlaceholder('••••••').fill(GMAIL_USER.password);
   // await page.locator('#login-btn').click();
   // await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

// ── Test 1: 1 ticket → eligible ───────────────────────────────────────────────
test("Popup validations", async ({ page }) => {
   await loginAndGoToBooking(page);
   // await page.goto("https://google.com");
   // await page.goBack();
   // await page.goForward();
   // await page.goBack();
   await expect(page.locator("#displayed-text")).toBeVisible();
   page.locator("#hide-textbox").click();
   await expect(page.locator("#displayed-text")).toBeHidden();

   page.on("dialog", async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept();
      // await dialog.dismiss();
   });
   await page.locator("#confirmbtn").click();
   //await page.locator("#mousehover").hover();
   const framesPage = page.frameLocator("#courses-iframe");
   // await framesPage.getByRole('link', {name: 'lifetime-access'}).click();
   await framesPage.locator("a[href*='lifetime-access']:visible").click();
   const numberOfSub = await framesPage.locator(".text h2").textContent();
   console.log(numberOfSub.split(" ")[1]);
   await page.pause();
});

test("Screenshot & Visual comparision", async ({ page }) => {
   await page.goto(`${BASE_URL}`);
   await expect(page.locator("#displayed-text")).toBeVisible();
   await page.locator("#displayed-text").screenshot({ path: "Partial_screenshot.png" });
   await page.locator("#hide-textbox").click();
   await page.screenshot({ path: "screenshot.png" });

   await expect(page.locator("#displayed-text")).toBeHidden();
});

test("visual", async ({ page }) => {
   await page.goto("https://www.google.com/");
   expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
