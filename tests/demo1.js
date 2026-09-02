"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message1 = "Hello, World!";
console.log(message1);
var age = 12;
var isActive = false;
var array = [1, 2, 3];
var data = "this could be anything";
console.log(message1 && data);
function add(a, b) {
    return a + b;
}
var sum = add(3, 4);
console.log(sum);
var user = { name: "Bob", age: 34 };
user.age = 35;
var MyOrdersPage = /** @class */ (function () {
    function MyOrdersPage(page) {
        this.page = page;
        this.myOrders = page.locator("button[routerlink*='myorders']");
        this.orderRows = page.locator("tbody tr");
    }
    return MyOrdersPage;
}());
var examplePage = new MyOrdersPage({});
