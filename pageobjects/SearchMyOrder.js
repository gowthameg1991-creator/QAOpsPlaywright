const { expect } = require("@playwright/test");

class SearchMyOrder {
   constructor(page) {
      this.page = page;
      this.myOrders = page.locator("button[routerlink*='myorders']");
      this.orderRows = page.locator("tbody tr");
   }

   async NavigateToMyOrder() {
      await this.myOrders.click();
      await expect(this.orderRows.first()).toBeVisible();
   }

   async LocateMyOrder(orderDetails) {
      const rowCount = await this.orderRows.count();
      let orderFound = false;

      for (let i = 0; i < rowCount; i++) {
         const rowOrderId = await this.orderRows.nth(i).locator("th").textContent();
         if (rowOrderId && orderDetails.includes(rowOrderId)) {
            await expect(this.orderRows.nth(i).locator("th")).toHaveText(rowOrderId);
            await this.orderRows.nth(i).locator("button").first().click();
            orderFound = true;
            break;
         }
      }

      await expect(orderFound).toBeTruthy();

      const orderDetailsText = await this.page.locator(".col-text").textContent();
      await expect(orderDetails).toContain(orderDetailsText);
   }
}

module.exports = { SearchMyOrder };
