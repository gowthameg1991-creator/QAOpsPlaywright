import { test as base, PlaywrightTestArgs, PlaywrightTestOptions, TestType } from "@playwright/test";

export type TestDataForOrder = {
   username: string;
   password: string;
   productToSearch: string;
   country: string;
};

export const customtest = base.extend<{ testDataForOrder: TestDataForOrder }>({
   testDataForOrder: [
      async ({}, use) => {
         await use({
            username: "melinegg@gmail.com",
            password: "Playwright@2026",
            productToSearch: "ZARA COAT 3",
            country: "India",
         });
      },
      { scope: "test" },
   ],
});

export type CustomTest = TestType<PlaywrightTestArgs & { testDataForOrder: TestDataForOrder }, PlaywrightTestOptions>;
