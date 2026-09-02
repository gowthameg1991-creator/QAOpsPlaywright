Feature: Ecommerce Validation
    @Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "melinegg@gmail.com" and "Playwright@2026"
    When Add "ZARA COAT 3" to Cart
    Then Verifty "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order for "India" location
    Then Verify order in present in the OrderHistory 

    @Validation 
  Scenario Outline: Login Error Validation
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed 

Examples: 
| username            | password |
| melinegg1@gmail.com | Playwright@2026 |
| melinegg2@gmail.com | Playwright@2026 |