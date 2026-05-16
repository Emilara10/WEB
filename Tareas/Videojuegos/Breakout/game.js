/*
 * B R E A K O U T implementation game
 *
 * José Emilio Lara Posada
 * 2026-05-15
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime = 0;

// Global variables for the settings of the game
let initialSpeed = 0.5;
let ballSpeed = 0.5;
let paddleSpeed = 0.5;

// Class for the ball in the game
class Ball extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "ball", sheetCols);
        this.velocity = new Vector(0, 0);
        this.isFireball = false;
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(ballSpeed).times(deltaTime));
        this.updateCollider();
    }

    // Move the ball to the center, and stop its motion
    reset() {
        this.position.x = canvasWidth / 2;
        this.position.y = canvasHeight - 120;
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    // Start the ball motion
    serve() {
        // Get a random angle between -PI/2 and PI/2
        let angle = Math.random() * Math.PI / 6 + Math.PI / 3;
        // Conver the angle into a vector, and scale it by the speed
        this.velocity = new Vector(Math.cos(angle), -Math.sin(angle));
        ballSpeed = initialSpeed;

        // Select a random direction
        if (Math.random() > 0.5) {
            this.velocity.x *= -1;
        }
    }
}

// Class for the main character in the game
class Paddle extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "paddle", sheetCols);
        this.velocity = new Vector(0, 0);

        // Structure with the directions the object can move
        this.motion = {
            left: {
                axis: "x",
                sign: -1,
            },
            right: {
                axis: "x",
                sign: 1,
            },
        }

        // Keys pressed to move the player
        this.keys = [];
    }

    update(deltaTime) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }
        // Normalize the velocity to avoid greater speed on diagonals
        this.velocity = this.velocity.normalize().times(paddleSpeed);

        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clampWithinCanvas();

        this.updateCollider();
    }

    clampWithinCanvas() {
        // Top border
        if (this.position.x - this.halfSize.x < 0) {
            this.position.x = this.halfSize.x;
        }
        // Bottom border
        if (this.position.x + this.halfSize.x > canvasWidth) {
            this.position.x = canvasWidth - this.halfSize.x;
        }
    }
}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();        

        // initialize sound element
        this.ping = document.createElement("audio");
        this.ping.src = "../VideogamesJS/assets/audio/4387__noisecollector__pongblipe4.wav";
        
        // Variables for the points of each player
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.win = false;
        this.gameOver = false;
        // Boolean to detect if the game is already in play
        this.inPlay = false;

        // TextLabels to display scores in the game
        this.liveLabel = new TextLabel(20, 30,
                "20px Arial", "black");
        this.scoreLabel = new TextLabel(150, 30,
                "20px Arial", "black");
        this.levelLabel = new TextLabel(canvasWidth - 100, 30,
                "20px Arial", "black");
        this.finalLabel = new TextLabel(2* canvasWidth / 8 - 30, canvasHeight / 2,
                "80px Arial", "black")
        this.gOverLabel = new TextLabel(2* canvasWidth / 8 - 150, canvasHeight / 2,
                "80px Arial", "black")
        
       this.initObjects();
    }

    // Create the objects in the game
    initObjects() {
        // The player controlled paddles
        this.paddleDown = new Paddle(new Vector(canvasWidth/2, canvasHeight - 25), 150, 10, "black");
        // The ball
        this.ball = new Ball(new Vector(canvasWidth / 2, canvasHeight - 120), 24, 24, "white");
        // The walls at the top and bottom
        this.wallTop = new Paddle(new Vector(canvasWidth / 2, -8), canvasWidth, 20, "black");
        this.wallBottom = new Paddle(new Vector(canvasWidth / 2, canvasHeight + 8), canvasWidth, 20, "black");

        // The goals on either side
        this.goalLeft = new Paddle(new Vector(-8, canvasHeight / 2), 20, canvasHeight, "black");
        this.goalRight = new Paddle(new Vector(canvasWidth + 8, canvasHeight / 2), 20, canvasHeight, "black");

        this.actors = [
            this.goalLeft,
            this.goalRight,
            this.wallTop,
            this.wallBottom,
            this.paddleDown,
            this.ball
        ];

        this.ball.setSprite('../VideogamesJS/assets/sprites/capShield.png')
        this.initLevel();
    }

    initLevel(){
        this.boxes = [];

        let rows = 2 + this.level;

        for (let row = 1; row <= rows; row++){
            for (let col = 1; col <= 6; col++){
                let color = "red";
                if (row === 2) 
                    color = "orange";
                if (row === 3) 
                    color = "yellow";
                if (row === 4) 
                    color = "green";
                if (row === 5) 
                    color = "blue";

                this.boxes.push(new Paddle(new Vector(col * canvasWidth / 7, row * canvasHeight / 8), canvasWidth / 8 - 10, 30, color))
            }
        }
    }

    draw(ctx) {
        this.liveLabel.draw(ctx, `Lives:  ${this.lives}`);
        this.scoreLabel.draw(ctx, `Score: ${this.score}`);
        this.levelLabel.draw(ctx, `Level: ${this.level}`);


        for (let actor of this.actors) {
            actor.draw(ctx);
        }

        for (let box of this.boxes) {
            box.draw(ctx);
        }

        if (this.win === true){
            this.finalLabel.draw(ctx, "Y O U  W I N!!");
        }

        if (this.gameOver === true){
            this.gOverLabel.draw(ctx, "G A M E  O V E R !!")
        }
    }

    update(deltaTime) {
        if (this.lives === 0){
            this.gameOver = true;
            return
        }

        // Move the paddles
        this.paddleDown.update(deltaTime);
        // Move the ball
        this.ball.update(deltaTime);

        // Detect collisions with the paddles
        if (boxOverlap(this.paddleDown, this.ball)) {
            this.ball.velocity.y *= -1;
            this.ping.play();
        }
        // Detect collisions with the walls
        if (boxOverlap(this.wallTop, this.ball)) {
            this.ball.velocity.y *= -1;
        }
        // Detect collisions with the goals
        if (boxOverlap(this.goalLeft, this.ball) || boxOverlap(this.goalRight, this.ball)) {
            this.ball.velocity.x *= -1;
        } 

        if (boxOverlap(this.wallBottom, this.ball)){
            this.ball.reset();
            this.inPlay = false;    
            this.lives -= 1;
        }

        for (let i = this.boxes.length - 1; i >= 0; i--) {
            if (boxOverlap(this.boxes[i], this.ball)) {
                if (!this.ball.isFireball){
                    this.ball.velocity.y *= -1;
                }
                this.score += 1;
                this.boxes.splice(i, 1); 
                if (!this.ball.isFireball){
                    if (Math.random() < 0.05){
                        this.activateFireball();
                    }
                }
                break;
            }
        }

        if (this.boxes.length === 0) {
            if (this.level >= 3) {
                this.inPlay = false;
                this.ball.reset();
                this.win = true;
                this.ball.velocity = new Vector(0, 0);
                return; 
            }
            this.level += 1;
            this.inPlay = false;
            this.ball.reset();
            this.initLevel();
        }
    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (this.gameOver || this.win){
                 return;
            } if (event.key == 'a' || event.key == 'ArrowLeft') {
                this.addKey('left', this.paddleDown);
            } if (event.key == 'd' || event.key == 'ArrowRight') {
                this.addKey('right', this.paddleDown);
            }

            // Get the ball in play
            if (event.key == ' ') {
                // Only if it is not alreay moving
                if (!this.inPlay) {
                    this.ball.serve();
                    this.inPlay = true;
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'a' || event.key == 'ArrowLeft') {
                this.delKey('left', this.paddleDown);
            } if (event.key == 'd' || event.key == 'ArrowRight') {
                this.delKey('right', this.paddleDown);
            }
        });
    }

    // Add the key pressed to the 'keys' array of the object sent
    addKey(direction, object) {
        if (!object.keys.includes(direction)) {
            object.keys.push(direction);
        }
    }

    // Remove the key pressed from the 'keys' array of the object sent
    delKey(direction, object) {
        if (object.keys.includes(direction)) {
            object.keys.splice(object.keys.indexOf(direction), 1);
        }
    }

    activateFireball(){
        this.ball.isFireball = true;
        this.ball.setSprite('../VideogamesJS/assets/sprites/hydraShield.png');

        this.fireballTimer = setTimeout(() =>{
            this.ball.isFireball = false;
            this.ball.setSprite('../VideogamesJS/assets/sprites/capShield.png');
        }, 5000);
    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {
    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}