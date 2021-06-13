let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 0 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let score = 0;
let highScore = localStorage.getItem("high_score");

let time = 200;

var img = new Image();
img.src = 'img/apple.png';

var bgImg = new Image();
bgImg.src = 'img/grass.jpg';

var headRight = new Image();
headRight.src = 'img/head_right.png';

var headLeft = new Image();
headLeft.src = 'img/head_left.png';

var headUp = new Image();
headUp.src = 'img/head_up.png';

var headDown = new Image();
headDown.src = 'img/head_down.png';


highScore !== null ? document.getElementById("high-score").innerHTML = highScore : document.getElementById("high-score").innerHTML = 0;

function createBG() {
    context.drawImage(bgImg, 0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        if (i === 0) {
            if (direction === "right") {
                context.drawImage(headRight, snake[i].x, snake[i].y, box, box)
            } else if (direction === "left") {
                context.drawImage(headLeft, snake[i].x, snake[i].y, box, box)
            } else if (direction === "up") {
                context.drawImage(headUp, snake[i].x, snake[i].y, box, box)
            } else {
                context.drawImage(headDown, snake[i].x, snake[i].y, box, box)
            }
        } else {
            context.fillStyle = "#CDDC39";
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }
}


function drawFood() {
    context.drawImage(img, food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";

    if (event.keyCode == 38 && direction != "down") direction = "up";

    if (event.keyCode == 39 && direction != "left") direction = "right";

    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function startGame() {
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            if (highScore !== null) {
                if (score > highScore) {
                    localStorage.setItem("high_score", score)
                }
            } else {
                localStorage.setItem("high_score", score)
            }
            alert(`Game Over ! :( \n Your score: ${score}`)
        }
    }

    if (snake[0].x > 15 * box && (direction == "right" || direction == "up" || direction == "down")) snake[0].x = 0;
    if (snake[0].x < 0 && (direction == "left" || direction == "up" || direction == "down")) snake[0].x = 15 * box;
    if (snake[0].y > 15 * box && (direction == "down" || direction == "left" || direction == "right")) snake[0].y = 0;
    if (snake[0].y < 0 && (direction == "up" || direction == "left" || direction == "right")) snake[0].y = 15 * box;

    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        score += 1;
        document.getElementById("score").innerHTML = score;
        food.x = Math.floor(Math.random() * 15 + 1) * box,
            food.y = Math.floor(Math.random() * 15 + 1) * box
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)
}

let jogo = setInterval(startGame, time);