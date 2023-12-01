const gameBox = document.querySelector("#gameBox");
const ctx = gameBox.getContext("2d");
const score = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");
const gameW = gameBox.width;
const gameH = gameBox.height;
const boardBG = "lightgreen";
const snakeC = "green";
const snakeB = "black";
const foodC = "red";
const unitS = 25;
let running = false;
let xV = unitS;
let yV = 0;
let foodX;
let foodY;
let Score = 0;
let snake = [
    {x:unitS * 4, y:0},
    {x:unitS * 3, y:0},
    {x:unitS * 2, y:0},
    {x:unitS, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    score.textContent = Score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoeard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100);
    }
    else{
        displayGameOver();
    }
};
function clearBoeard(){
    ctx.fillStyle = boardBG;
    ctx.fillRect(0, 0, gameW, gameH);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.floor((Math.random() * (max - min) + min) / unitS) * unitS;
        return randNum;
    }
    foodX = randomFood(0, gameW - unitS);
    foodY = randomFood(0, gameW - unitS);
};
function drawFood(){
    ctx.fillStyle = foodC;
    ctx.fillRect(foodX, foodY, unitS, unitS);
};
function moveSnake() {
    const head = { x: snake[0].x + xV, y: snake[0].y + yV };
    snake.unshift(head);
    // Scoring by eaten food
    if (snake[0].x === foodX && snake[0].y === foodY) {
        Score = Score + 1;
        score.textContent = Score;
        createFood();
    } else {
        // Remove the last element if no food is eaten
        snake.pop();
    }
};
function drawSnake() {
    ctx.fillStyle = snakeC;
    ctx.strokeStyle = snakeB;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitS, unitS);
        ctx.strokeRect(snakePart.x, snakePart.y, unitS, unitS);
    });
};
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yV == -unitS);
    const goingDown = (yV == unitS);
    const goingRight = (xV == unitS); 
    const goingLeft = (xV == -unitS);

    switch (true) {
        case ((keyPressed == LEFT) && (!goingRight)):
            xV = -unitS;
            yV = 0;
            break;
        case ((keyPressed == UP) && (!goingDown)):
            xV = 0;
            yV = -unitS;
            break;
        case ((keyPressed == RIGHT) && (!goingLeft)):
            xV = unitS;
            yV = 0;
            break;
        case ((keyPressed == DOWN) && (!goingUp)):
            xV = 0;
            yV = unitS;
            break;
    }
};
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameW):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameH):
            running = false;
            break;    
    }
    for(let i = 1 ; i < snake.length ; i += 1){
        if((snake[i].x == snake[0].x)&&(snake[i].y == snake[0].y)){
            running = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px Franklin Gothic Medium"
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", gameW / 2 , gameH / 2);
    running = false;
};
function resetGame(){
    Score = 0;
    xV = unitS;
    yV = 0;
    snake = [
        {x:unitS * 4, y:0},
        {x:unitS * 3, y:0},
        {x:unitS * 2, y:0},
        {x:unitS, y:0},
        {x:0, y:0}
    ];
    gameStart();
};