# Escape-B.H.-The Quest for Freedom

## Code represents several distinct states, including:

* current room
  * room descriptions (immutable)
  * room connections (immutable)
  * room inventory (mutable)
* current player
  * player inventory (mutable)
  * player status (mutable)

The State Machine represents room transitions.

## Stories 

## One Room

When the user launches the program

Then the console displays introductory text

And waits for input

And if the user types an unknown command

Then the game outputs "I don't know how to ____"

## Interact With an Item

Given the player has been given introductory text

When the player enters a valid command, and target

Then the game outputs accordingly

And puts the player in the starting room

And returns to the prompt

## Immovable Objects

Given the player is in the starting room

When the player attempts to take something that is not takeable

Then the game denies the player

## Locked Out

Given the player is in the starting room

When the player attempts to enter a new room

Then the game denies the player

## Speak friend and enter

Given the player is in the starting room

When the player solves a puzzle

Then the game allows the player to enter the next room

And the player moves into the next room

## Unauthorized Access

Given the player is in the starting room

When the player fails the puzzle (e.g. enters the incorrect password)

Then the game denies the player entry

And the player remains in the starting room

## Inventory

Given the player is in the next room

And the player has not yet picked up the item

When the player enters a command to pick it up

Then the game allows the player to do so

And the item is added to the player's inventory

## Display Inventory

Given an item is in the player's 'inventory'

When the player types i or inventory or take inventory

Then the game displays the player's inventory

## Drop Inventory

Given an item is in the player's inventory

When the player types drop ITEM

Then that item is removed from the player's inventory

And that item is added to the current room's inventory

## Keep Doors Open

Given you have unlocked a door

When you try and open the door again

Then the door is still unlocked, and allows you to pass to the next room
