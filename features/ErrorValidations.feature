Feature: Ecommerce validations
@Validation
@foo
  Scenario Outline:  Placingthe order

  Given a login to Ecommerce2 application with "<username>" and "<password>"

    Then Verify Error message is displayed

    Examples:
        | username           | password    |  
        | anshika@gmail.com  | Iamking@000 |
        | hello123.com       | Iamhello@12 |