Feature: Ecommerce validations
@Regression
  Scenario: Placingthe order

  Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"

    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart

    When Enter valid details and Place the order
    Then Verify order is present in the  OrderHistory


    @Validation
  Scenario Outline:  Placingthe order

  Given a login to Ecommerce2 application with "<username>" and "<password>"

    Then Verify Error message is displayed

    Examples:
        | username           | password    |  
        | anshika@gmail.com  | Iamking@000 |
        | hello123.com       | Iamhello@12 |