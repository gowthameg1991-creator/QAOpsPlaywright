import { expect, Locator, Page } from "@playwright/test";

export class SearchMyOrder {
   readonly page: Page;
   readonly myOrders: Locator;
   readonly orderRows: Locator;

   constructor(page: Page) {
      this.page = page;
      this.myOrders = page.locator("button[routerlink*='myorders']");
      this.orderRows = page.locator("tbody tr");
   }

   async NavigateToMyOrder(): Promise<void> {
      await this.myOrders.click();
      await expect(this.orderRows.first()).toBeVisible();
   }

   async LocateMyOrder(orderDetails: string): Promise<void> {
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
      await expect(orderDetails).toContain(orderDetailsText ?? "");
   }
}
