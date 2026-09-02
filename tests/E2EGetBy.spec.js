const { test, expect } = require('@playwright/test');

test('Second Playwright Test', async ({page}) =>{
    const userEmail = page.getByPlaceholder("email@example.com");  
    const login = page.getByRole("button", { name: "Login" });
    const userPassword = page.getByPlaceholder("enter your passsword");
    const products = page.locator(".card-body");
// Navigate to the login page
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    console.log(await page.title());
    
    // Attempt login with invalid credentials
    await userEmail.fill('melinegg@gmail.com');
    await userPassword.fill('Playwright@2026');
      
    // Submit login form with valid credentials
    await login.click();
    await page.waitForLoadState('networkidle');
    await products.filter({hasText: "ZARA COAT 3"}).getByRole("button", { name: "Add To Cart" }).click();
    getByRole('button', { name: 'Continue Shopping❯' })
    await page.getByRole("listitem").filter({hasText: "Cart"}).getByRole("button", { name: "Cart"}).click();

    await page.locator("div li").first().waitFor();
    const bool = await page.getByText("ZARA COAT 3").isVisible();
    expect(bool).toBeTruthy();
    await page.getByRole("button", { name: "Checkout" }).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("Button", { name: " India" }).nth(1).click();

    expect(page.getByText("melinegg@gmail.com")).toBeVisible();
    await page.getByText("PLACE ORDER").click();

    await page.locator(".hero-primary").waitFor();
    expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    const orderDetails = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderDetails);
    await page.locator("button[routerlink*='myorders']").click();

    const rows = page.locator("tbody tr");
    await rows.first().waitFor();
    const count2 = await rows.count();
    for(let i=0; i<count2; ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderDetails.includes(rowOrderId)){
            expect(rows.nth(i).locator("th")).toHaveText(rowOrderId);
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderDetailsText = await page.locator(".col-text").textContent();
    expect(orderDetails.includes(orderDetailsText)).toBeTruthy();

    await page.pause();
    // await products.first().waitFor();
    // console.log(await products.nth(1).textContent());



});

