let canvas = document.getElementById("canvas");
console.log(canvas);
let width = 500;
let height = 500;
let size = 10;
let ctx = canvas.getContext('2d');
let snake = [];
let food;
let dx = size;
let dy = 0;

addToSnake(10,0);
addToSnake(20,0);
addToSnake(30,0);

setInterval(update,100);
window.addEventListener("keydown",keys);
addFood();

function addToSnake(xVal,yVal){
    snake.push({
        x: xVal,
        y: yVal
    })
    drawRect(xVal,yVal);
}

function update(){
    ctx.clearRect(0,0,width, height);
    snake.shift();
    addSnakeHead();
    drawSnake();
    drawRect(food.x, food.y);
    foodCollide();
    if (foodCollide()){
        addFood();
        addSnakeHead();
    }
    if(selfCollide()){
        alert("YOU LOST !");
    }
}

function addSnakeHead(){
    let x = snake[snake.length-1].x + dx;
    let y = snake[snake.length-1].y + dy;
    // checkEnd and exit other side
    if(dx == size && snake[snake.length-1].x == width){
        x = 0;
    }else if(dx == -size && snake[snake.length-1].x == 0){
        x = width;
    }else if(dy == -size && snake[snake.length-1].y == 0){
        y = height;
    }else if(dy == size && snake[snake.length-1].y == height){
        y = 0;
    }
    addToSnake(x, y);
}

function drawRect(x, y) {
    ctx.fillRect(x, y, size, size);
}

function keys(e){
    console.log(e);
    if(e.keyCode == 40){ 
        dx = 0;
        dy = size;
    }else if(e.keyCode == 39){
        dx = size;
        dy = 0;
    }else if(e.keyCode == 38){
        dx = 0;
        dy = -size;
    }else if(e.keyCode == 37){
        dx = -size;
        dy = 0;
    }

}

function drawSnake(){
    for(let i = 0; i < snake.length; i++){
        drawRect(snake[i].x,snake[i].y);
    }
}

function foodCollide(){
    let ret = false;
    let headX = snake[snake.length-1].x;
    let headY = snake[snake.length-1].y;

    if(headX == food.x && headY == food.y){
        ret = true;
    }

    return ret;
}

function addFood() {
    let xVal = Math.floor(Math.random()* width/size)*size;
    let yVal = Math.floor(Math.random()* height/size)*size;

    food = {
        x: xVal,
        y: yVal
    }
}

function selfCollide(){
    let ret = false;
    for(let i = 0; i < snake.length - 1; i++){
        if (snake[i].x==snake[snake.length-1].x &&
            snake[i].y == snake[snake.length-1].y){
           return ret = true;
        }
    }
}