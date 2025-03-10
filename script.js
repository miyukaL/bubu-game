const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 480;
canvas.height = 320;

// Load the background image
const background = new Image();
background.src = "background.svg"; // Ensure the file path is correct

// Load the ball image
const ballImg = new Image();
ballImg.src = "donuts.svg";

//load plate image
const plateImg = new Image();
plateImg.src = "plate.svg";

// Ball properties
const ballRadius = 30;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// Paddle properties
const paddleHeight = 20;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let interval = 0;

// Adjusted circle positions (inside canvas)
let circleX1 = 195;
let circleY1 = 173;
let circleX2 = 291;
let circleY2 = 173;
let dcircleX = 0.03;
let dcircleY = -0.03;
const circleRadius = 5;

// Dudu 

const duduImg = new Image();
duduImg.src = "dudu_happy-ezgif.com-gif-maker.svg"; // Ensure the file path is correct
const duduWidth = 240;  // Adjust based on your sprite width
const duduHeight = 240; // Adjust based on your sprite height
const duduX = 290;
const duduY = 120;
duduImg.onload = function () {
    drawDudu(); // Draw Dudu once the image loads
};



let frameIndex = 0;
const totalFrames = 6; // Adjust based on your sprite sheet
let isAnimating = false;
let animationTimer = 0;

function drawDudu() {
    let frame = isAnimating ? frameIndex : 0;
    
    ctx.drawImage(
        duduImg, 
        frame * duduWidth, 0, duduWidth, duduHeight, 
        duduX,//canvas.width - duduWidth - padding,  // Adjust X position
        duduY,//canvas.height - duduHeight - padding, // Adjust Y position
        duduWidth, duduHeight
    );
}
let i = 0;


let score = 0;

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#e7ddd2";
  ctx.fillText(`Score: ${score}`, 8, 20);
}
// Function to draw circles
function drawCircle1() {
    ctx.beginPath();
    ctx.arc(circleX1, circleY1, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#2c1f11";  // Red color
    ctx.fill();
    ctx.closePath();
}
function drawCircle2() {
    ctx.beginPath();
    ctx.arc(circleX2, circleY2, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#2c1f11";  // Red color
    ctx.fill();
    ctx.closePath();
}

// Ensure the background fully fits the canvas
background.onload = function () {
    drawBackground();  // Draw the background immediately
    drawCircle1();  // Draw circles immediately
    drawCircle2();
};

// Draw background
function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

// Say Hello function
function sayHello() {
    alert("Go Bubu, you can do this!");
}

// Start game function
function draw_start() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    interval = setInterval(draw, 10); // Keep redrawing every 10ms
}

// Draw ball
function drawBall() {
    ctx.drawImage(ballImg, x - ballRadius, y - ballRadius, ballRadius * 2, ballRadius * 2);
}

// Draw paddle
function drawPaddle() {
    ctx.drawImage(plateImg, paddleX,canvas.height - paddleHeight, paddleWidth, paddleHeight);
    // ctx.beginPath();
    // ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    // ctx.closePath();
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawCircle1();
    drawCircle2();
    drawDudu();
    drawBall();
    drawPaddle();
    drawScore();
  


    // Ball movement logic
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        dcircleX = -dcircleX;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
        dcircleY = -dcircleY
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            dcircleY = -dcircleY;
            score ++;
            // Start animation
        isAnimating = true;
        frameIndex = 0;
        animationTimer = 0;
            
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    x += dx;
    circleX1 += dcircleX;
    circleX2 += dcircleX;
    y += dy;
    circleY1 += dcircleY;
    circleY2 += dcircleY;

    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }

    //dudu
    if (isAnimating) {
      
        animationTimer++;
        if (animationTimer % 5 === 0) {  // Adjust speed of animation
            frameIndex = (frameIndex + 1) % totalFrames;
            if (frameIndex === 0) {
                i ++; 
                if (i==3){
                    isAnimating = false; // Stop animation after one cycle
                    i =0;
                }
            }
        }
    }
    
}

// Handle key press
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
        e.preventDefault();  // Prevents scrolling
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
        e.preventDefault();  // Prevents scrolling
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
        e.preventDefault();  // Prevents scrolling
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
        e.preventDefault();  // Prevents scrolling
    }
}

document.addEventListener("click", printMousePos);
