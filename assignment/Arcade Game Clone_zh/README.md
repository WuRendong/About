# Cross the road
"Cross the road" is a simple game base on project of Udacity Front End advance course.

# Quick start
	- Open index.html with browser, that will start the game.
	- There are several roles can be selected from role panel before the game.
	- Pick up the rewards on the rock block, but don't get collision by bugs that walk through the blocks.
	- Three lifes will be given initially, once there no more life, the game is over.
	- Time is limited for the game, once time is out, the game is also over, but if the reward picked up is more than 10, you win the game, otherwise, you lose the game.

# Directory Structure
    - index.html
    - css
    - js
      - resources.js  // help function for resource load
      - config.js     // Global virable and configuration should be put here
      - utils.js      // The utility function for the game
      - app.js        // All the game objects should be defined here 
      - engine.js     // Main logic of the game
    - images          // Image resource
    - sounds          // Sound resource

# Bugs
	1. It doesn't look good for the collision between roles and enemies.
	2. Rewards does not appear with the sound rise up. 


# Licence
"Cross the road" is a public domain work. the lastest version is released by flyingost.