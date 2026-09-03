// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// const dotenv = require('dotenv');
// const path = require('path');
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = {
   testDir: "./tests",
   /* Run tests in files in parallel */
   fullyParallel: true,
   /* Fail the build on CI if you accidentally left test.only in the source code. */
   forbidOnly: !!process.env.CI,
   /* Retry on CI only */
   retries: process.env.CI ? 2 : 0,
   /* Opt out of parallel tests on CI. */
   workers: process.env.CI ? 1 : undefined,
   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
   reporter: [["line"], ["allure-playwright", { resultsDir: "allure-results" }]],
   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

   timeout: 30 * 1000,
   expect: {
      timeout: 10 * 1000,
   },
   projects: [
      {
         name: "chrome",
         use: {
            browserName: "chromium",
            headless: false,
            actionTimeout: 10 * 1000,
            navigationTimeout: 30 * 1000,
            screenshot: "on",
            trace: "on",
            video: "retain-on-failure",
         },
      },
      {
         name: "firefox",
         use: {
            browserName: "firefox",
            headless: true,
            actionTimeout: 10 * 1000,
            navigationTimeout: 30 * 1000,
            screenshot: "only-on-failure",
            trace: "on",
            video: "off", //on-first-retry
            //...devices['']
         },
      },
   ],
};

//commit1
//commit2

module.exports = config;
