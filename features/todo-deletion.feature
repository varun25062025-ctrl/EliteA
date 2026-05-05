Feature: Todo Deletion Functionality
  As a user
  I want to delete todo items
  So that I can remove tasks I no longer need

  Background:
    Given I navigate to the TodoMVC application
    And I clear all existing todos
    And I have the following todos:
      | Buy groceries    |
      | Complete project |
      | Call dentist     |
      | Read book        |

  Scenario: Delete a single todo
    When I delete the todo "Buy groceries"
    Then I should not see the todo "Buy groceries"
    And I should see 3 todos in the list
    And the todo count should show "3 items left"

  Scenario: Delete multiple todos individually
    When I delete the todo "Buy groceries"
    And I delete the todo "Complete project"
    Then I should see 2 todos in the list

  Scenario: Clear all completed todos
    Given I mark the todo "Buy groceries" as complete
    And I mark the todo "Complete project" as complete
    When I click the clear completed button
    Then I should see 2 todos in the list
    And I should see 0 completed todos

  Scenario: Clear completed button visibility
    Then the clear completed button should be disabled
    When I mark the todo "Buy groceries" as complete
    Then the clear completed button should be enabled

  Scenario: Delete the last todo in the list
    When I delete all todos one by one
    Then I should see 0 todos in the list
    And the footer should not be visible
