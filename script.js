// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};
// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if you bump into wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
    {
    return true;
}
}

function gameEngine(){
    //update snake and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        var clickedok = confirm("Game Over, click Ok to play again!");
        document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "300px";
        if(clickedok){   
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
            snakeArr=[{x:13,y:15}];
            musicSound.play();
            score = 0;
        }
    }
    //increment score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High-Score: " + hiscoreval; 
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x,y : snakeArr[0].y + inputDir.y})
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())};
    }
    //moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x; 
    snakeArr[0].y += inputDir.y; 

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

//main logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High-Score: " + hiscore; 
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Up Arrow")
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        
        case "ArrowDown":
            console.log("Down Arrow")
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        
        case "ArrowLeft":
            console.log("Left Arrow")
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        
        case "ArrowRight":
            console.log("Right Arrow")
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        
        default:
            break;
    }
});

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
            console.log("Left Arrow")
            inputDir.x= -1;
            inputDir.y= 0;
            
        } else {
            /* left swipe */
            console.log("Right Arrow")
            inputDir.x= 1;
            inputDir.y= 0;
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
            console.log("Up Arrow")
            inputDir.x= 0;
            inputDir.y= -1;
            
        } else { 
            /* up swipe */
            console.log("Down Arrow")
            inputDir.x= 0;
            inputDir.y= 1;
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};