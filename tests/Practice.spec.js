const { test, expect } = require("@playwright/test");
const { EventHubApiUtils } = require("../utils/EventHubApiUtils");
const BASE_URL = "https://eventhub.rahulshettyacademy.com";
// ── Credentials ────────────────────────────────────────────────────────────────
const USER_EMAIL = "melinegg@gmail.com"; // update email and password with your account
const USER_PASSWORD = "Playwright@2026";

test("practice", async ({ page, context, request }) => {
   const loginPayLoad = { email: USER_EMAIL, password: USER_PASSWORD };
   const apiUtils = new EventHubApiUtils(request, loginPayLoad);
   await apiUtils.loginToBrowserContext(context);
   await page.goto(`${BASE_URL}/admin/events`);
   const rows = page.locator("tbody tr");
   await rows.first().waitFor();
   const count = await rows.count();
   console.log("Number of rows:", count);
   for (let i = 0; i < count; ++i) {
      const bool = await rows.nth(i).getByRole("button", { name: "Delete" }).isVisible();
      console.log(`Row ${i + 1}: Delete button visible?`, bool);
      if (bool === true) {
         await rows.nth(i).getByRole("button", { name: "Delete" }).click();
         await page.getByRole("button", { name: "Delete Event" }).click();
      }
   }
   await page.getByTestId("nav-events").click();
   await page.getByRole("button", { name: "Add New Event" }).click();
   await page.getByTestId("event-title-input").fill("Habba");
   await page.getByRole("textbox", { name: "Describe the event…" }).fill("varamahalakshmi");
   await page.getByLabel("Category*").selectOption("Festival");
   await page.getByRole("textbox", { name: "City*" }).fill("Bengaluru");
   await page.getByRole("textbox", { name: "Venue*" }).fill("Gangasutha");
   await page.getByRole("textbox", { name: "Event Date & Time*" }).fill("2026-08-27T22:00");
   await page.getByRole("spinbutton", { name: "Price ($)*" }).fill("100");
   const totalseats = 20;
   await page.getByRole("spinbutton", { name: "Total Seats*" }).fill(totalseats.toString());
   await page.getByTestId("add-event-btn").click();
   await page.getByTestId("nav-home").click();
   const eventTitle = await page.locator("#event-card h3").filter({ hasText: "Habba" }).textContent();
   expect(eventTitle === "Habba").toBeTruthy();
   page.locator("#event-card h3").filter({ hasText: "Habba" }).click();

   // const seatsremainingbb = await page.locator('#event-card h3').filter({ hasText: 'Habba' }).getbytext('seats available').textContent();
   // console.log('Seats Remaining bb:', seatsremainingbb);
   // expect(getByRole('Button', { name: '+' }).toBeVisible());
   for (let i = 0; i < 2; ++i) {
      await page.getByRole("button", { name: "+" }).click();
   }
   await page.getByRole("textbox", { name: "Full Name*" }).fill("Gowtham");
   await page.getByTestId("customer-email").fill("supra@gmail.com");
   await page.getByRole("textbox", { name: "Phone Number*" }).fill("8888800000");
   await page.getByRole("button", { name: "Confirm Booking" }).click();
   const bookingConfirmation = await page.locator(".text-xl").textContent();
   expect(bookingConfirmation.includes("Booking Confirmed!")).toBeTruthy();
   const bookkingRef = await page.locator(".booking-ref").textContent();
   console.log("Booking Reference:", bookkingRef);
   await page.getByRole("button", { name: "View My Bookings" }).click();
   // await page.getByRole('button', { name: 'View Details' }).waitFor();
   await page.getByRole("button", { name: "View Details" }).first().click();
   await page.getByTestId("nav-home").click();
   expect(eventTitle === "Habba").toBeTruthy();
   await page.locator("#event-card h3").filter({ hasText: "Habba" }).click();
   await page.getByRole("button", { name: "Confirm Booking" }).waitFor();
   await page.waitForLoadState("networkidle");
   const seatsremaining = await page.getByText("seats").first().innerText();
   console.log(`Seats Remaining: ${seatsremaining.trim()}`);
});
