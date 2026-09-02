class DashboardPage {
   constructor(page) {
      this.page = page;
      this.products = page.locator(".card-body");
      this.productTitles = page.locator(".card-body b");
      this.addToCartButton = (productName) => this.products.filter({ hasText: productName }).getByRole("button", { name: "Add To Cart" });
      this.cartButton = page.getByRole("listitem").filter({ hasText: "Cart" }).getByRole("button", { name: "Cart" });
   }

   async searchProduct(productName) {
      await this.productTitles.first().waitFor({ state: "visible", timeout: 30000 });

      const productTitles = await this.productTitles.allTextContents();
      console.log("Available products:", productTitles);

      const productExists = productTitles.some((title) => title.trim().includes(productName.trim()));

      if (!productExists) {
         throw new Error(`Product "${productName}" not found on the dashboard. Available: ${productTitles.join(", ")}`);
      }

      await this.addToCartButton(productName).waitFor({ state: "visible", timeout: 30000 });
      await this.addToCartButton(productName).click();
   }

   async navigateToCart() {
      await this.cartButton.waitFor({ state: "visible", timeout: 30000 });
      await this.cartButton.click();
      await this.page.getByRole("button", { name: "Checkout" }).waitFor({ state: "visible", timeout: 30000 });
   }
}

module.exports = { DashboardPage };
