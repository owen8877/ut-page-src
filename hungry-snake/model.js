/* global screenSize */
/* global screenWidth */
/* global screenHeight */
/* global complex */
/* global point */
/* global line */


var dx = complex(0.03, 0);
var dy = complex(0, 0.03);
var rr = 0.05;

var snake = new Queue();
var food = point();
var snakeStep = 0.2;
var boundRadius = 3;
var northDir = ideal(1.0, 0.0);
var snakeDir = 0;
var snakeInc;
var score = 0;

var dirs = [ideal(0.0, 1.0), ideal(-1.0, 0.0), ideal(0.0, -1.0), ideal(1.0, 0.0)];
var steps = new Array(4);//points

function initModel(){
    for (var i = 0; i < 4; ++i) steps[i] = getPointByDistance(point(0.0), dirs[i], snakeStep);
    snake.MakeEmpty();
    snake.EnQueue(point(0.0, 0.0));
    t = transform(0.0);
    northDir = ideal(1.0, 0.0);
    snakeDir = 0;
    snakeInc = 10;
    score = 0;
    food = randPoint();
    while(PoincareDistance(complex(0.0), food) >= boundRadius) {
        food = randPoint();
    };
}

function checkCollision(){
    //console.log("check!");
    if (PoincareDistance(complex(0.0), snake.GetEnd()) >= boundRadius){
        console.log("You reached the boundary.\n");
        return true;
    }
    //for (deque<point>::iterator it = ++snake.begin(); it != snake.end(); ++it){
    for (var i = 0; i < snake.GetSize()-1; ++i) {
        //if (PoincareDistance(*snake.begin(), *it) >= snakeStep*.99) continue;
        if (PoincareDistance(snake.GetEnd(), snake.GetElement(i)) >= snakeStep * 0.99) continue;
        console.log("You ate yourself.\n");
        return true;
    }
    return false;
}

function checkFood(){
    return (PoincareDistance(food, snake.GetEnd()) <= snakeStep);
}


function update(){
    //console.log("update");
    var stepInterval = 5;
    if (kbstat[up_k]) snakeDirNext = 0; 
    if (kbstat[left_k]) snakeDirNext = 1; 
    if (kbstat[down_k]) snakeDirNext = 2; 
    if (kbstat[right_k]) snakeDirNext = 3; 
    if (stepInterval === frameCount){
        if ((snakeDirNext + snakeDir)%2 != 0) snakeDir = snakeDirNext;
        snake.EnQueue(t.inversion().tr(steps[snakeDir]));
        //console.log("new snake!");
        //snake.print();
        t = transform(steps[snakeDir]).production(t);
        //t.print();

        if (snakeInc > 0) snakeInc--;
        else snake.DeQueue();

        if (checkCollision()){
            //console.log("You lose! Score:", score);
            document.getElementById("score").innerHTML = "Game ends! Score:" + score;
            if (score > getCookie("high_score")) document.cookie = "high_score=" + score;
            gameon = false;
            initModel();
            frameCount = 0;
            snakeDirNext = 0;
        }
        
        if (checkFood()){
            snakeInc += 2;
            score++;
            document.getElementById("score").innerHTML = "Score:" + score;
            if (score > getCookie("high_score")) {
                document.getElementById("hscore").innerHTML = "High Score : " + score;
                document.cookie = "high_score=" + score;
            }
            food = randPoint();
            while(PoincareDistance(complex(0.0), food) >= boundRadius) {
                food = randPoint();
            }
        }
        frameCount = 0;
    }
    frameCount++;
    document.getElementById("fps").innerHTML = "FPS : " + getfps();
}
