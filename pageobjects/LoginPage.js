class LoginPage {
   constructor(page) {
      this.page = page;
      this.emailInput = page.getByPlaceholder("email@example.com");
      this.passwordInput = page.getByPlaceholder("enter your passsword");
      this.loginButton = page.getByRole("button", { name: "Login" });
   }

   async goTo() {
      await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
      await this.page.waitForLoadState("domcontentloaded");
      await this.emailInput.waitFor({ state: "visible", timeout: 30000 });
   }

   async validLogin(username, password) {
      await this.emailInput.waitFor({ state: "visible", timeout: 30000 });
      await this.emailInput.fill(username);
      await this.passwordInput.waitFor({ state: "visible", timeout: 30000 });
      await this.passwordInput.fill(password);
      await this.loginButton.waitFor({ state: "visible", timeout: 30000 });
      await this.loginButton.click();
      await this.page.locator(".card-body").first().waitFor({ state: "visible", timeout: 30000 });
   }

   async invalidLogin(username, password) {
      await this.emailInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
      await this.page.getByText("Incorrect email or password").waitFor({ state: "visible", timeout: 30000 });
   }

   async verifyLoginSuccess() {
      // Verify navigation to dashboard or home page
      await this.page.waitForURL("**/dashboard**", { waitUntil: "networkidle" });
   }
}

module.exports = { LoginPage };
