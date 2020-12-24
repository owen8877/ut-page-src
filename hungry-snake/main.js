var kbstat = new Int32Array(256);
var mouseButton = 0;
var screenSize = 400;
var screenWidth = 400;
var screenHeight = 400;
var frameCount = 1;
var snakeDirNext = 0;
var contin = true;
var left_k, right_k, up_k, down_k;
var last_key = 0;
var hard, high_score;
var nice;
var gameon = false;

// Initialization
function init(){
    //console.log("--------Geometry test 0.0.0--------\n");
    //init cookie
    if (document.cookie.toString() === [""].toString()) {
        document.cookie = "hard=false";
        document.cookie = "high_score=0";
        document.cookie = "left=37";
        document.cookie = "up=38";
        document.cookie = "right=39";
        document.cookie = "down=40";
        document.cookie = "nice=false";
    }
    left_k = getCookie("left");
    right_k = getCookie("right");
    up_k = getCookie("up");
    down_k = getCookie("down");
    hard = (getCookie("hard")==="false")?false:true;
    //console.log(hard);
    document.getElementById("difficulty").checked = hard;
    nice = (getCookie("nice")==="false")?false:true;
    high_score = getCookie("high_score");
    //console.log(nice);
    document.getElementById("hscore").innerHTML = "High Score : " + high_score;
    initModel();
}

function setkey(number){
    var s;
    if (number === 0) {
        s = "left";
        left_k = last_key;
    }
    else if (number === 1) {
        s = "right";
        right_k = last_key;
    }
    else if (number === 2) {
        s = "up";
        up_k = last_key;
    }
    else if (number === 3) {
        s = "down";
        down_k = last_key;
    }
    document.cookie = s + "=" + last_key;
}

function debug() {
    //console.log(contin, gameon, document.getElementById("debug").checked);
    if (document.getElementById("debug").checked) {
        //Pause the game!
        console.log("Game is paused");
        document.onkeydown = function(evt){
            evt = (evt) ? evt : ((window.event) ? window.event : ""); 
            last_key = evt.keyCode ? evt.keyCode : evt.which;
            document.getElementById("showKey").innerHTML = "Last pressed key is : " + last_key;
        };
        contin = false;
        document.getElementById("debugdir").style.display = "block";
        document.getElementById("showKey").style.display = "block";
    }
    else {
        document.onkeydown = keyboardCallback;
        contin = true;
        setTimeout(timerCallback, 0);
        document.getElementById("debugdir").style.display = "none";
        document.getElementById("showKey").style.display = "none";
        document.getElementById("showKey").innerHTML = "";
    }
}

function t_hard() {
    hard = !hard;
    document.cookie = "hard=" + hard;
}

function t_nice() {
    nice = !nice;
    document.cookie = "nice=" + nice;
}

function getCookie(name) {
    var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if (arr=document.cookie.match(reg)) return unescape(arr[2]);
    else    return undefined;
}

function restart(){
    gameon = true;
    contin = true;
    init();
    document.getElementById("score").innerHTML = "Score : 0";
    setTimeout(timerCallback, 0);
    debug();
}

function preTimerCallback() {
    // "Press space to start"
    if (kbstat[32]) {
        gameon = true;
        document.getElementById("score").innerHTML = "Score: 0";
        setTimeout(timerCallback, 0);
    } else {
        setTimeout(preTimerCallback, 33);
    }
}

// Timer Callback
function timerCallback(){
    update();
    display();
    //console.log(nice);
    if (contin && gameon) setTimeout(timerCallback, nice?16:33);
}

// Keyboard Callback
function keyboardCallback(evt){
    evt = (evt) ? evt : ((window.event) ? window.event : ""); 
    var key = evt.keyCode ? evt.keyCode : evt.which;
    kbstat[key] = 1;
}

function keyboardUpCallback(evt){
    evt = (evt) ? evt : ((window.event) ? window.event : ""); 
    var key = evt.keyCode ? evt.keyCode : evt.which;
    kbstat[key] = 0;
}

/* main*/

can.setAttribute("width", screenWidth + "px");
can.setAttribute("height", screenHeight + "px");
document.onkeydown = keyboardCallback;
document.onkeyup = keyboardUpCallback;
init();

display();
setTimeout(preTimerCallback, 0);

//Main loop
//glutMainLoop();
