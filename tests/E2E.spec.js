const { test, expect } = require('@playwright/test');

test('Second Playwright Test', async ({browser}) =>{
    const email = process.env.E2E_USER_EMAIL;
    const password = process.env.E2E_USER_PASSWORD;
    if (!email || !password) {
        throw new Error('Set E2E_USER_EMAIL and E2E_USER_PASSWORD before running this test.');
    }

    const context = await browser.newContext();
    const page = await context.newPage();
    const userEmail = page.locator("#userEmail");  
    const login = page.locator("#login");
    const userPassword = page.locator("#userPassword");
    const products = page.locator(".card-body");
// Navigate to the login page
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    console.log(await page.title());
    
    // Log in with credentials supplied by the environment.
    await userEmail.fill(email);
    await userPassword.fill(password);
      
    // Submit login form.
    await login.click();
    await page.waitForLoadState('networkidle');
    await products.locator("b").first().waitFor();
    const titles = await products.locator("b").allTextContents();
    console.log(titles);
    const count = await products.count();
    console.log(count);
    for(let i=0; i<count; ++i){
        if(await products.nth(i).locator("b").textContent() === "ZARA COAT 3"){
            await products.nth(i).locator("text=Add to Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    //await page.locator("[class*='subtotal']").locator("button").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const count1 = await dropdown.locator("button").count();
    for(let i=0; i<count1; ++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await page.locator(".hero-primary").waitFor();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderDetails = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderDetails);
    await page.locator("button[routerlink*='myorders']").click();

    const rows = page.locator("tbody tr");
    await rows.first().waitFor();
    const count2 = await rows.count();
    for(let i=0; i<count2; ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderDetails.includes(rowOrderId)){
            await expect(rows.nth(i).locator("th")).toHaveText(rowOrderId);
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderDetailsText = await page.locator(".col-text").textContent();
    expect(orderDetails.includes(orderDetailsText)).toBeTruthy();

    // await products.first().waitFor();
    // console.log(await products.nth(1).textContent());



});

