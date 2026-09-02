const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");
const { POManager } = require("../../pageobjects/POManager");
const playwright = require("@playwright/test");

Before(async function () {
   this.browser = await playwright.chromium.launch({ headless: false });
   const context = await this.browser.newContext();
   this.page = await context.newPage();
   this.POM = new POManager(this.page);
});

// BeforeStep() {

// }
AfterStep(async function ({ result }) {
   if (result.status === Status.FAILED) {
      await this.page.screenshot({ path: "screenshotCC.png" });
   }
});

After(async function () {
   await this.browser.close();
   console.log("I am the last to execute");
});
