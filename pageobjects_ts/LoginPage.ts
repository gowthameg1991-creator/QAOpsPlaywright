import { Locator, Page } from "@playwright/test";

export class LoginPage {
   readonly page: Page;
   readonly emailInput: Locator;
   readonly passwordInput: Locator;
   readonly loginButton: Locator;

   constructor(page: Page) {
      this.page = page;
      this.emailInput = page.getByPlaceholder("email@example.com");
      this.passwordInput = page.getByPlaceholder("enter your passsword");
      this.loginButton = page.getByRole("button", { name: "Login" });
   }

   async goTo(): Promise<void> {
      await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
      await this.page.waitForLoadState("domcontentloaded");
      await this.emailInput.waitFor({ state: "visible", timeout: 30000 });
   }

   async validLogin(username: string, password: string): Promise<void> {
      await this.emailInput.waitFor({ state: "visible", timeout: 30000 });
      await this.emailInput.fill(username);
      await this.passwordInput.waitFor({ state: "visible", timeout: 30000 });
      await this.passwordInput.fill(password);
      await this.loginButton.waitFor({ state: "visible", timeout: 30000 });
      await this.loginButton.click();
      await this.page.locator(".card-body").first().waitFor({ state: "visible", timeout: 30000 });
   }

   async verifyLoginSuccess(): Promise<void> {
      await this.page.waitForURL("**/dashboard**", { waitUntil: "networkidle" });
   }
}
