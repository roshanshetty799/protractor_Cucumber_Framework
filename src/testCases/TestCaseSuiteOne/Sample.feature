
Feature: Super Calculator Demo

  Scenario: I should be able to add on Super Calculator Page
    Given I am on Super Calculator page
    When  I multiply "5" and "5"
    Then  I should see "25" as result
