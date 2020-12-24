var MAX = 100;
var TINY = 0.01;
var fpscount = 0;
var fps = 0;
var t1 = Date.now();

function glColor3f(r, g, b) {
    r = Math.floor(r*255);
    g = Math.floor(g*255);
    b = Math.floor(b*255);
    context.fillStyle = `rgb(${r}, ${g}, ${b})`;
    // console.log(context.fillStyle);
    context.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    // console.log(context.strokeStyle);
}

function glColor4f(r, g, b, a) {
    r = Math.floor(r*255);
    g = Math.floor(g*255);
    b = Math.floor(b*255);
    context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    // console.log(context.fillStyle);
    context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    // console.log(context.strokeStyle);
}

function glVertex2d(x, y) {
    context.lineTo(x, y);
}

var snakeWidth = snakeStep / 2.0;

function getfps(){
    var t = Date.now();
    //console.log(t);
    if (t - t1 > 1000) {
        fps = Math.floor(1000*fpscount/(t-t1));
        t1 = t;
        fpscount = 0;
    }else fpscount++;
    return fps;
}

var screenSize = 400;
//Window Initialization
var can = document.getElementById("mainCanvas");
var context = can.getContext("2d");

context.Parc = function(cx, cy, ra, sa, ea) {
    context.arc((cx+1)*screenSize/2, (-cy+1)*screenSize/2, ra * screenSize / 2.0, sa, ea);
};
context.PmoveTo = function(x, y){
    context.moveTo((x+1)*screenSize/2, (-y+1)*screenSize/2);
};
context.PlineTo = function(x, y){
    context.lineTo((x+1)*screenSize/2, (-y+1)*screenSize/2);
};
context.Prect = function(x, y, w, h){
    context.rect((x+1)*screenSize/2, (-y+1)*screenSize/2, w*screenSize/2, h*screenSize/2);
}

function drawCircle(center, radius) { // center:point, radius:double
    context.beginPath();
    context.Parc(center.x, center.y, radius, 0, 2*Math.PI);
    context.stroke();
}

function drawPoincareCircle(center, radius) { // center:point, radius:double
    //glBegin(GL_LINE_LOOP);
    var D = (Math.exp(radius) - 1) / (Math.exp(radius) + 1);
    var centerToBeDrawn = point(center.production(complex(((D*D-1)/(center.abs2()*D*D-1)))));
    var radiusToBeDrawn = D * (center.abs2() - 1) / (center.abs2()*D*D - 1);
    /*
    double theta;
    for (int i = 0;i < MAX;i++){
        theta = 2 * M_PI * i / MAX;
        glVertex2d(radiusToBeDrawn*cos(theta)+centerToBeDrawn.getX(), radiusToBeDrawn*sin(theta)+centerToBeDrawn.getY());
    }
    glEnd();
    */
    context.beginPath();
    context.Parc(centerToBeDrawn.x, centerToBeDrawn.y, radiusToBeDrawn, 0, 2*Math.PI);
    context.stroke();
    context.closePath();
}

//The third argument indicates whether the circle is solid or not.
function drawPoincareCircleMore(center, radius, flagSolid) {// center:point, radius:double, flagSolid:bool
    if (!flagSolid){
        drawPoincareCircle(center, radius);
        return;
    }
    // glBegin(GL_POLYGON);
    var D = (Math.exp(radius) - 1) / (Math.exp(radius) + 1);
    var centerToBeDrawn = point(center.production(complex(((D*D-1)/(center.abs2()*D*D-1)))));
    var radiusToBeDrawn = D * (center.abs2() - 1) / (center.abs2()*D*D - 1);
    // double theta;
    // for (int i = 0;i < MAX;i++){
        // theta = 2 * M_PI * i / MAX;
        // glVertex2d(radiusToBeDrawn*cos(theta)+centerToBeDrawn.getX(), radiusToBeDrawn*sin(theta)+centerToBeDrawn.getY());
    // }
    context.beginPath();
    context.Parc(centerToBeDrawn.x, centerToBeDrawn.y, radiusToBeDrawn, 0, 2*Math.PI);
    context.closePath();
    context.fill();
    // glEnd();
    
}

function drawArc(center, radius, startarc, endarc) {// center:point, radius:double, startarc:double, endarc:double
    /*
    glBegin(GL_LINE_STRIP);
    double step = (endarc-startarc) / MAX, theta = startarc;
    for (int i = 0; i <= MAX; ++i){
        glVertex2d(radius*cos(theta) + center.getX(), radius*sin(theta) + center.getY());
        theta += step;
    }
    glEnd();
    */
    context.beginPath();
    context.Parc(center.x, center.y, radius, startarc, endarc);
    context.stroke();
    //context.closePath();
}

function drawLine(l) {// l:line
    if (l.isDiameter()){
        /*
        glBegin(GL_LINE_STRIP);
        glVertex2d(l.getLeft().getX(), l.getLeft().getY());
        glVertex2d(l.getRight().getX(), l.getRight().getY());
        glEnd();
        */
        context.beginPath();
        context.PmoveTo(l.getLeft().getX(), l.getLeft().getY());
        context.PlineTo(l.getRight().getX(), l.getRight().getY());
        context.stroke();
        return;
    }
    var middle = Math.atan2(l.getCenter().getY(), l.getCenter().getX()) + Math.PI;
    var deflection = Math.atan(1/l.getRadius());
    var start = middle - deflection;
    var end = middle + deflection;
    drawArc(l.getCenter(), l.getRadius(), start, end);
}

function drawPointSize(p, size) {// p:point, size:double
    context.beginPath();
    context.Prect(p.getX()-size, p.getY()-size, size*2, size*2);
    context.fill();
}

function drawPoint(p) {// p:point
    var size = 0.02*(1 - p.abs2()) + 0.003;
    drawPointSize(p, size);
}

function drawPointColor(p, r, g, b) {// p:point, r,g,b:int
    glColor3f(r, g, b);
    drawPoint(p);
}

/*
void reshape(int width, int height){
    screenWidth = width;
    screenHeight = height;
    screenSize = (width < height ? width : height);
    glViewport (0, 0, width, height);
    glLoadIdentity ();
    glOrtho (-(GLfloat)width / screenSize, (GLfloat)width / screenSize,
            -(GLfloat)height / screenSize, (GLfloat)height / screenSize,
            -2.0f, 2.0f);
}
*/
function display(){
    context.clearRect(0, 0, screenSize, screenSize);
    var tbackup = t;
    if (hard) t = transform(0.0);
    context.fillStyle = "#FF0000";
    drawPoincareCircle(t.tr(point(0.0)), boundRadius);

    var circles = 10;
    for (var i = 1; i < circles; ++i){
        glColor4f(1.0, 0.0, 0.0, (1-i/circles) * 0.3);
        drawPoincareCircle(t.tr(point(0.0)), boundRadius*i/circles);
    }

    glColor3f(0.2, 0.7, 0.2);
    drawPoincareCircleMore(t.tr(snake.GetEnd()), snakeWidth * 1.5, true);
    glColor3f(0.0, 0.4, 0.0);
    for (var index = 0; index < snake.GetSize()-1; ++index) drawPoincareCircleMore(t.tr(snake.GetElement(index)), snakeWidth, true);

    glColor3f(1.0, 0.5, 1.0);
    drawPoint(t.tr(food));
    
    t = tbackup;
}
