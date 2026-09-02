const { test, expect } = require("@playwright/test");

test("@Web First Playwright Test", async ({ page }) => {
   const userName = page.getByLabel(/username/i);
   const password = page.getByLabel(/password/i);
   const signIn = page.getByRole("button", { name: /sign in/i });
   const cardTitles = page.locator(".card-body a");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await expect(page).toHaveTitle(/Login/);
   await expect(userName).toBeVisible();

   await userName.fill("rahulshettyacademy");
   await password.fill("Learning@830$3mK2");
   await signIn.click();

   await expect(cardTitles.first()).toBeVisible();
   const allTitles = await cardTitles.allTextContents();

   console.log(allTitles);
});

test("Second Playwright Test", async ({ page }) => {
   const userEmail = page.getByPlaceholder("email@example.com");
   const userPassword = page.getByPlaceholder("enter your passsword");
   const login = page.getByRole("button", { name: /login/i });
   const cardTitles = page.locator(".card-body b");

   await page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await expect(page).toHaveTitle(/Let's Shop/i);
   await expect(userEmail).toBeVisible();

   await userEmail.fill("melinegg@gmail.com");
   await userPassword.fill("Playwright@2026");
   await login.click();

   await expect(cardTitles.first()).toBeVisible();
   const allTitles = await cardTitles.allTextContents();

   console.log(allTitles);
});
