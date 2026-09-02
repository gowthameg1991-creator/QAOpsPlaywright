const base = require("@playwright/test");

exports.customtest = base.test.extend({
   testDataForOrder: {
      username: "melinegg@gmail.com",
      password: "Playwright@2026",
      productToSearch: "ZARA COAT 3",
      country: "India",
   },
});
