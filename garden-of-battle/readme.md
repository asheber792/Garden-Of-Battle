### Asheber Arlain
# Garden of Battle

## Site Info
Website: https://pages.git.generalassemb.ly/asheber792/project-1/garden-of-battle/

## Description: 
Garden of Battle is an RPG style fighter, players can roam around a map and encounter enemies. In order to defeat them and make it through these encounters, you must attack! You will be notified on-screen as to what to press to attack. Can you survive the Garden of Battle?

### Technologies Used:
HTML, CSS, & Javascript

### Unsolved Problems: 
- After defeating the first enemy, the blinking dissapearance is no longer active for the other enemies. 
- After defeating an enemy and moving to the left, the character shoots over about four blocks of my grid for the initial left movement
- Upon the user character's death by wrong key press, the blue slash attack does not appear before he is felled.

# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|Dec 17th| Project Description | Complete
|Dec 17th| Wireframes / Priority Matrix / Functional Components | Complete
|Dec 18th| Core Application Structure (HTML, CSS, etc.) | Complete
|Dec 19th| Pseudocode / actual code | Complete
|Dec 19th| Initial Clickable Model  | Complete
|Dec 20th| MVP | Complete
|Dec 21st| Present | Incomplete


## Project Description

Project will be a grid based figher game where the player can move his character around the grid where enemies will be placed and can be defeated through quick time event -esque (https://en.wikipedia.org/wiki/Quick_time_event) key press actions.  

## Wireframes

Upload images of wireframe to cloudinary and add the link here with a description of the specific wireframe.

https://res.cloudinary.com/dj10zwlqs/image/upload/v1545151370/p1_wireframe_1.jpg
https://res.cloudinary.com/dj10zwlqs/image/upload/v1545151370/p1_wireframe_2.jpg
https://res.cloudinary.com/dj10zwlqs/image/upload/v1545151370/p1_wireframe_3.jpg
https://res.cloudinary.com/dj10zwlqs/image/upload/v1545151370/p1_wireframe_4.jpg

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matix.

https://res.cloudinary.com/dj10zwlqs/image/upload/v1545143807/p1_priority_matrix.jpg
https://res.cloudinary.com/dj10zwlqs/image/upload/v1545143807/p1_priority_matrix_2.jpg

### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP 
- render game board, player character, and enemies
- enable player movement
- enable collision detection between player, enemies, and outside the game board 
- enable quick time key press action on collision 
- enable enemy dissapearence on correct key press 
- enable game over on failed key press 
- win game when no enemies left 
- ask to play again


#### PostMVP
- landing page
- add health to player character and backmovement to previous grid square upon health loss (failed key press)
- enable enemy AI 
- add boss 
- cutscenes/image frames on quick time event 
- more levels  


## Functional Components

Based on the initial logic defined in the previous sections try and breakdown the logic further into functional components, and by that we mean functions.  Try and capture what logic would need to be defined if the game was broken down into the following categories.

### Landing Page
Displays title, has 'start game' button, and displays controls for the game 

### Game Initialization
The player's character and enemies are rendered on the game board and. Player movement with the arrow keys is enabled.

### Playing The Game 
Player moves around the board and when coming into contact with enemies a battle mode is enable where a key is requested to be pressed, upon correct press, the enemy dissapear and is defeated. if incorrect game over. 

### Winning The Game
All enemies have been defeated and an you alerted to your win. 

### Resetting The Game
You are prompted to play again after winning or getting a game over. 

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe.

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Board Visuals | H | 2hrs| 2hrs | 2hrs |
| Rendering Characters | H | 2hrs| 4hrs | 2hrs |
| Player Character Movement | H | 5hrs| 6hrs | 4hrs |
| Battle Mode Layout | M | 3hrs| 8.5hrs | 3.5hrs |
| Battle Functionality (key presses, timer) | H | 5hrs| 14hrs | 5.5hrs |
| Normal state return after enemy defeat | H | 4hrs| 15hrs | 1hrs |
| Win/Lose Logic | H | 3hrs| 17hrs | 2hrs |
| Landing Page | M | 3hrs| 21.5hrs | 4.5hrs |
| Media Queries | M | 2hrs| 22.5hrs | 1hrs |
| Post MVP | L | 20hrs| 22.5hrs | 0hrs |
| Total | H | 47hrs| 22.5hrs | 22.5hrs |

## Helper Functions
Helper functions should be generic enought that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

| Function | Description | 
| --- | :---: |  
| moveUp | This will move a character/element within a grid up towards the top of the window | 
| moveDown | This will move a character/element within a grid up towards the bottom of the window | 
| moveLeft | This will move a character/element within a grid up towards the left of the window | 
| moveRight | This will move a character/element within a grid up towards the right of the window | 
| movementKeys | This allows movement of a character with the arrow keys and W,A,S,D; preventing their default functioning | 

## Additional Libraries
 Use this section to list all supporting libraries and thier role in the project. 

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

This function is called when a user has killed an enemy. Removing the enemy from the DOM, the enemies array, as well as checking for the win. 

```
const enemyDeath = () => {
	setTimeout(() => {
		for(const enemy of enemies){
			attack.remove(); 
			document.body.removeEventListener('keydown', quickTimeKeyBattle);

			if(enemy.posX == attackEnemyPos.posX && enemy.posY == attackEnemyPos.posY){
				setInterval(() => {
					enemy.$el.classList.toggle('blink-death'); 
				}, 500); 
				setTimeout(() => {
					enemy.$el.style.display = 'none';
					enemies.splice(enemies.indexOf(enemy), 1);
					returntoRoamMode(); 
					$mode_title.textContent = 'Roam Mode';
					keyInfoBox.removeChild(keyRequest);
					$gameBoard.removeChild(keyInfoBox); 
					document.body.addEventListener('keydown', movementKeys);
					setTimeout(() => {
						checkForWin(); 
					}, 300);
				}, 2000)
			}
		}
	}, 800);
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

**ERROR**: app.js:34 Failed to execute 'removeChild' on 'Node'                              
**RESOLUTION**: Found that in some instances using the .remove method on the element rather than removeChild on it's parent can return better results
