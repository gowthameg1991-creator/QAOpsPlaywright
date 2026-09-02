import { Page } from "@playwright/test";
import { LoginPage } from "../pageobjects/LoginPage.js";
import { DashboardPage } from "../pageobjects/DashboardPage.js";
import { PlaceOrder } from "../pageobjects/PlaceOrder.js";
import { SearchMyOrder } from "../pageobjects/SearchMyOrder.js";

export class POManager {
   readonly LoginPage: LoginPage;
   readonly DashboardPage: DashboardPage;
   readonly PlaceOrder: PlaceOrder;
   readonly SearchMyOrder: SearchMyOrder;
   readonly page: Page;

   constructor(page: Page) {
      this.page = page;
      this.LoginPage = new LoginPage(this.page);
      this.DashboardPage = new DashboardPage(this.page);
      this.PlaceOrder = new PlaceOrder(this.page);
      this.SearchMyOrder = new SearchMyOrder(this.page);
   }

   getLoginPage(): LoginPage {
      return this.LoginPage;
   }

   getDashboardPage(): DashboardPage {
      return this.DashboardPage;
   }

   getPlaceOrder(): PlaceOrder {
      return this.PlaceOrder;
   }

   getSearchMyOrder(): SearchMyOrder {
      return this.SearchMyOrder;
   }
}
