import { Page, Locator } from "@playwright/test";

const message1: string = "Hello, World!";
console.log(message1);

const age: number = 12;
const isActive: boolean = false;
const array: number[] = [1, 2, 3];
const data: any = "this could be anything";
console.log(message1 && data);

function add(a: number, b: number): number {
   return a + b;
}

const sum: number = add(3, 4);
console.log(sum);

const user: { name: string; age: number } = { name: "Bob", age: 34 };
user.age = 35;

class MyOrdersPage {
   readonly page: Page;
   readonly myOrders: Locator;
   readonly orderRows: Locator;

   constructor(page: Page) {
      this.page = page;
      this.myOrders = page.locator("button[routerlink*='myorders']");
      this.orderRows = page.locator("tbody tr");
   }
}

const examplePage = new MyOrdersPage({} as Page);
