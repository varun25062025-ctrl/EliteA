Feature: Todo Completion Management
  As a user
  I want to mark todos as complete or incomplete
  So that I can track my progress

  Background:
    Given I navigate to the TodoMVC application
    And I clear all existing todos
    And I have the following todos:
      | Buy groceries    |
      | Complete project |
      | Call dentist     |

  Scenario: Mark a single todo as complete
    When I mark the todo "Buy groceries" as complete
    Then the todo "Buy groceries" should be marked as completed
    And the todo count should show "2 items left"

  Scenario: Mark multiple todos as complete
    When I mark the todo "Buy groceries" as complete
    And I mark the todo "Complete project" as complete
    Then I should see 2 completed todos
    And the todo count should show "1 item left"

  Scenario: Toggle todo completion status
    When I mark the todo "Buy groceries" as complete
    Then the todo "Buy groceries" should be marked as completed
    When I mark the todo "Buy groceries" as incomplete
    Then the todo "Buy groceries" should not be marked as completed
    And the todo count should show "3 items left"

  Scenario: Mark all todos as complete using toggle all
    When I click the toggle all button
    Then I should see 3 completed todos
    And the todo count should show "0 items left"

  Scenario: Toggle all todos back to active
    When I click the toggle all button
    Then I should see 3 completed todos
    When I click the toggle all button
    Then I should see 0 completed todos
    And the todo count should show "3 items left"
