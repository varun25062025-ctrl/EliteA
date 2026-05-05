Feature: Todo Drag and Drop Re-ordering UI Elements
  As a user
  I want to see drag handles on todo items
  So that I know I can reorder my tasks

  Background:
    Given I navigate to the TodoMVC application
    And I clear all existing todos
    And I have the following todos in order:
      | First task  |
      | Second task |
      | Third task  |
      | Fourth task |
      | Fifth task  |

  Scenario: Verify drag handles are visible on all todos
    Then each todo should have a visible drag handle
    And the drag handle should have the correct accessibility attributes

  Scenario: Verify drag handle appearance
    Then the drag handle should display the hamburger icon
    And the drag handle should have grab cursor styling

  Scenario: Verify todos maintain order when created
    Then the todo at position 1 should be "First task"
    And the todo at position 2 should be "Second task"
    And the todo at position 3 should be "Third task"
    And the todo at position 4 should be "Fourth task"
    And the todo at position 5 should be "Fifth task"

  Scenario: Verify all todos have consistent drag handle placement
    Then all todos should have drag handles in the same position
    And drag handles should be left-aligned in each todo item

  Scenario: Verify drag handle cursor styling
    Then the drag handle should have grab cursor styling
    And the drag handle should remain visible

  Scenario: Verify completed todos have drag handles
    Given I mark the todo "Second task" as complete
    Then the completed todo should still have a visible drag handle
    And the drag handle functionality should remain available

  Scenario: Verify todo count persists with drag handles present
    Then I should see 5 todos in the list
    And the todo count should show "5 items left"
    And each todo should have its drag handle

  Scenario: Verify drag handles do not interfere with other todo actions
    When I hover over a todo
    Then I should see both the drag handle and delete button
    And I should be able to click the checkbox
    And I should be able to click the delete button
