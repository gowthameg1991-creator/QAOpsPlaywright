Feature: Ecommerce Error Validation
 @Validation 
  Scenario Outline: Login Error Validation
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed 

Examples: 
| username            | password |
| melinegg1@gmail.com | Playwright@2026 |
| melinegg2@gmail.com | Playwright@2026 |
