Feature: Todo Creation and Management
  As a user
  I want to create and manage todo items
  So that I can keep track of my tasks

  Background:
    Given I navigate to the TodoMVC application
    And I clear all existing todos

  Scenario: Create a single todo item
    When I create a todo with text "Buy groceries"
    Then I should see the todo "Buy groceries" in the list
    And the todo count should show "1 item left"
    And the input field should be empty

  Scenario: Create multiple todo items
    When I create a todo with text "Buy groceries"
    And I create a todo with text "Complete project"
    And I create a todo with text "Call dentist"
    Then I should see 3 todos in the list
    And the todo count should show "3 items left"

  Scenario: Cannot create empty todo
    When I press Enter on an empty todo input
    Then I should see 0 todos in the list

  Scenario: Create todo with special characters
    When I create a todo with text "Test @#$% special & characters!"
    Then I should see a todo containing "Test @#$% special"
    And I should see a todo containing "characters!"

  Scenario: Create todo with very long text
    When I create a todo with 200 characters
    Then I should see 1 todo in the list
    And the todo should contain the long text
