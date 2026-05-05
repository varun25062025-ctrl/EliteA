Feature: Todo Filtering Functionality
  As a user
  I want to filter todos by their status
  So that I can focus on specific tasks

  Background:
    Given I navigate to the TodoMVC application
    And I clear all existing todos
    And I have the following todos:
      | Buy groceries    |
      | Complete project |
      | Call dentist     |
      | Read book        |
      | Exercise         |
    And I mark the todo "Buy groceries" as complete
    And I mark the todo "Complete project" as complete

  Scenario: View all todos
    When I click on the "All" filter
    Then I should see 5 todos in the list

  Scenario: View only active todos
    When I click on the "Active" filter
    Then I should see 3 visible todos
    And the todo count should show "3 items left"

  Scenario: View only completed todos
    When I click on the "Completed" filter
    Then I should see 2 visible todos

  Scenario: Filter selection persists
    When I click on the "Active" filter
    And I click on the "All" filter
    Then I should see 5 todos in the list

  Scenario: Active filter shows newly created todo
    When I click on the "Active" filter
    And I create a todo with text "New task"
    Then the todo count should show "4 items left"
