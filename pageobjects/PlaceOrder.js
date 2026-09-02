const { expect } = require("@playwright/test");

class PlaceOrder {
   constructor(page) {
      this.page = page;
      this.checkoutButton = page.getByRole("button", { name: "Checkout" });
      this.countryInput = page.getByPlaceholder("Select Country");
      // Use filter to get only the exact "India" option, not "British Indian Ocean"
      this.indiaOption = page.getByRole("button").filter({ hasText: /^\s*India\s*$/ });
      this.placeOrderButton = page.getByText("PLACE ORDER");
   }

   async checkout() {
      await this.checkoutButton.waitFor({ state: "visible", timeout: 30000 });
      await this.checkoutButton.click();
      await this.countryInput.waitFor({ state: "visible", timeout: 30000 });
   }

   async selectCountry(country) {
      await this.countryInput.waitFor({ state: "visible", timeout: 30000 });
      await this.countryInput.pressSequentially(country);
      await this.indiaOption.first().waitFor({ state: "visible", timeout: 30000 });
      await this.indiaOption.click();
      await this.placeOrderButton.waitFor({ state: "visible", timeout: 30000 });
   }

   async placeOrder(userEmail) {
      await expect(this.page.getByText(userEmail)).toBeVisible({ timeout: 30000 });
      await this.placeOrderButton.waitFor({ state: "visible", timeout: 30000 });
      await this.placeOrderButton.click();
      await expect(this.page.locator(".hero-primary")).toBeVisible({ timeout: 30000 });
   }

   async verifyOrderConfirmation() {
      await expect(this.page.locator(".hero-primary")).toBeVisible();
      await expect(this.page.getByText(/Thankyou for the order\./i)).toBeVisible();

      const orderDetails = this.page.locator(".em-spacer-1 .ng-star-inserted").first();
      await expect(orderDetails).toBeVisible();
      const orderId = (await orderDetails.textContent())?.trim();

      expect(orderId).toBeTruthy();
      return orderId;
   }
}

module.exports = { PlaceOrder };
