# B R E A K O U T 🕹️
A simple and fun Breakout game built with JavaScript and HTML Canvas.

## 🎯 Game Objective
The main goal is to destroy all the blocks on the screen using the paddle and the ball. You must clear a total of **3 consecutive levels** to win the game:
* **Level 1:** 3 rows of blocks.
* **Level 2:** 4 rows of blocks.
* **Level 3:** 5 rows of blocks.

## 🎮 Controls
* **Move Paddle Left:** Press the `Left Arrow (←)` key or `A`.
* **Move Paddle Right:** Press the `Right Arrow (→)` key or `D`.

## 📜 Game Rules
1. **Lives:** You start the game with **3 lives**.
2. **Losing a Life:** If the ball goes past the bottom edge of the screen (missing your paddle), you lose a life.
3. **Game Over:** If your life counter reaches 0, the game ends immediately, displaying a **GAME OVER** screen.
4. **Bouncing Physics:** The ball bounces naturally off the left, right, and top edges of the canvas, as well as upon colliding with the paddle.
5. **Score Tracking:** The screen displays the real-time count of destroyed blocks.

## 🔥 Special Mechanic (Extra Feature)
* **Fireball Mode:** Upon activating, the ball ignites into a fireball (changes sprite). In this state, it pierces through and destroys blocks instantly without bouncing off them.
