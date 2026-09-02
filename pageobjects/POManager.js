const { LoginPage } = require("../pageobjects/LoginPage.js");
const { DashboardPage } = require("../pageobjects/DashboardPage.js");
const { PlaceOrder } = require("../pageobjects/PlaceOrder.js");
const { SearchMyOrder } = require("../pageobjects/SearchMyOrder.js");
class POManager {
   constructor(page) {
      this.page = page;
      this.LoginPage = new LoginPage(this.page);
      this.DashboardPage = new DashboardPage(this.page);
      this.PlaceOrder = new PlaceOrder(this.page);
      this.SearchMyOrder = new SearchMyOrder(this.page);
   }
   getLoginPage() {
      return this.LoginPage;
   }
   getDashboardPage() {
      return this.DashboardPage;
   }
   getPlaceOrder() {
      return this.PlaceOrder;
   }
   getSearchMyOrder() {
      return this.SearchMyOrder;
   }
}
module.exports = { POManager };
